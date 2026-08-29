import os
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth.jwt import ClerkTokenPayload

security_scheme = HTTPBearer()

CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL")
CLERK_ISSUER = os.getenv("CLERK_ISSUER")
ALLOWED_AZP = os.getenv("CLERK_AUTHORIZED_PARTIES", "").split(",")

jwks_client = jwt.PyJWKClient(
    CLERK_JWKS_URL,
    cache_jwk_set=True,    
    lifespan=300               
)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
) -> ClerkTokenPayload:
    token = credentials.credentials

    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            issuer=CLERK_ISSUER,
            options={"verify_aud": False},
            leeway=10,
        )

        azp = payload.get("azp")
        if ALLOWED_AZP and ALLOWED_AZP != [""] and azp not in ALLOWED_AZP:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Request client domain footprint failed verification checks."
            )

        return ClerkTokenPayload(
            user_id=payload["user_id"],
        )

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session has expired. Please authenticate again.",
        )

    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )
