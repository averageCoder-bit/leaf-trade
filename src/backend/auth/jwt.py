from pydantic import BaseModel, EmailStr

class ClerkTokenPayload(BaseModel):
    user_id: str