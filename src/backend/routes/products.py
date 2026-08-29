from fastapi import Depends, APIRouter

router = APIRouter()


@router.post("/products")
async def create_listing():
    return {"message" : "Successfully created product"}