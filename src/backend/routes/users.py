from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from auth.jwt import ClerkTokenPayload
from models.user import User

from database.database import get_db

router = APIRouter()


@router.post("/users")
async def create_user(
    current_user: ClerkTokenPayload = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_user = User(
        clerk_user_id=current_user.user_id,
        email=current_user.email,
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        phone_number=current_user.phone_number,
        username=current_user.username,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "message": "User created successfully",
        "user_id": new_user.user_id,
    }