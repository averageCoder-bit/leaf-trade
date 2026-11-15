
import os
import jwt

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth.jwt import ClerkTokenPayload

security_scheme = HTTPBearer()

CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL")
CLERK_ISSUER = os.getenv("CLERK_ISSUER")

ALLOWED_AZP = [
    origin.strip()
    for origin in os.getenv(
        "CLERK_AUTHORIZED_PARTIES", ""
    ).split(",")
    if origin.strip()
]

jwks_client = jwt.PyJWKClient(
    CLERK_JWKS_URL,
    cache_jwk_set=True,
    lifespan=300,
)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(
        security_scheme
    ),
) -> ClerkTokenPayload:

    token = credentials.credentials

    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            issuer=CLERK_ISSUER,
            options={
                "verify_aud": False,
                "require": ["sub", "iss", "exp"],
            },
            leeway=10,
        )

        # Validate authorized parties
        azp = payload.get("azp")

        if ALLOWED_AZP and azp not in ALLOWED_AZP:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized client origin.",
            )

        # Clerk user ID is stored in the subject claim
        clerk_user_id = payload.get("sub")

        if not isinstance(clerk_user_id, str) or not clerk_user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing or invalid user identifier.",
            )

        return ClerkTokenPayload(
            user_id=clerk_user_id,
        )

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session has expired. Please authenticate again.",
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials.",
        )

    except jwt.PyJWKClientError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unable to validate authentication token.",
        ) from exc
