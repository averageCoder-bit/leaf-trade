from pydantic import BaseModel

class ClerkTokenPayload(BaseModel):
    user_id: str