from pydantic import BaseModel, EmailStr


from pydantic import BaseModel, EmailStr, Field

class CreateUserRequest(BaseModel):
    first_name: str = Field(alias="firstName")
    last_name: str = Field(alias="lastName")
    email: EmailStr
    phone_number: str = Field(alias="phoneNumber")
    username: str