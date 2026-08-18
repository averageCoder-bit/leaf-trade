from fastapi import APIRouter, Depends

from schemas.user import CreateUserRequest
from auth.dependencies import get_current_user
from auth.jwt import ClerkTokenPayload

router = APIRouter()


@router.post("/users")
async def create_user(
    user: CreateUserRequest,
    current_user: ClerkTokenPayload = Depends(get_current_user),
):
    return {
        "message": "User created successfully",
        "user": user,
        "clerk_user_id": current_user.user_id,
    }