from pydantic import BaseModel, EmailStr
from fastapi import APIRouter


router = APIRouter()

class CreateUserRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    username: str


@router.post("/users")
async def create_user(user: CreateUserRequest):
    return {
        "message": "User created successfully",
        "user": user
    }