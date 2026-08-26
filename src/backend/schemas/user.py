from pydantic import BaseModel, EmailStr, Field
from typing import Annotated


class CreateUserSchema(BaseModel):
    firstName: Annotated[str, Field(min_length=1, max_length=30)]
    lastName: Annotated[str, Field(min_length=1, max_length=30)]
    email: Annotated[EmailStr, Field(max_length=254)]
    username: Annotated[str, Field(
        min_length=3, max_length=30
    )]

class UserSchema(BaseModel):
    pass

