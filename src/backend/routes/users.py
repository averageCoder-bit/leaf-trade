from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from pathlib import Path
import sys

current_dir = Path(__file__).resolve().parent.parent
sys.path.append(str(current_dir))

from auth.dependencies import get_current_user
from auth.jwt import ClerkTokenPayload
from models.user import User
from schemas.user import CreateUserSchema
from database.database import get_db
from uuid import UUID

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
        first_name=data.firstName,
        last_name=data.lastName,
        # phone_number=data.phone_number,
        username=data.username,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "message": "User created successfully",
        "user_id": new_user.user_id,
    }

@router.get("/users/me", status_code=status.HTTP_200_OK)
async def get_current_user_info(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.clerk_user_id == current_user.clerk_user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {
        "user": user
    }