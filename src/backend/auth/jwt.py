from pydantic import BaseModel, EmailStr

class ClerkTokenPayload(BaseModel):
    user_id: str
    email: EmailStr
    first_name: str
    last_name: str
    phone_number: str
    username: str