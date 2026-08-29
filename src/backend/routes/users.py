from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from auth.jwt import ClerkTokenPayload
from models.user import User

from schemas.user import CreateUserSchema

from database.database import get_db

router = APIRouter()


@router.post("/users", status_code=status.HTTP_201_CREATED)
async def create_user(
    data: CreateUserSchema,
    current_user: ClerkTokenPayload = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_user = User(
        clerk_user_id=current_user.user_id,
        email=data.email,
        first_name=data.first_name,
        last_name=data.last_name,
        phone_number=data.phone_number,
        username=data.username,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "message": "User created successfully",
        "user_id": new_user.user_id,
    }