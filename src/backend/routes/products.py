from fastapi import Depends, APIRouter, status
from sqlalchemy.orm import Session

from pathlib import Path
import sys

current_dir = Path(__file__).resolve().parent.parent
sys.path.append(str(current_dir))

from schemas.product import CreateProductSchema
from database.database import get_db
from models.product import Product
from models.product_files import ProductFiles
from models.user import User
from auth.dependencies import get_current_user

from storage.files import generate_upload_url


router = APIRouter()


@router.post("/products", status_code=status.HTTP_201_CREATED)
async def create_listing(
    data: CreateProductSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    product = Product(
        name=data.name,
        price=data.price,
        description=data.description,
        condition=data.condition,
        category=data.category,
        attributes=data.attributes,
        delivery_options=data.delivery_options,
        user_id=current_user.user_id,
    )

    db.add(product)
    db.flush()

    upload_urls = []

    for file in data.product_files:
        upload_data = generate_upload_url(
            product_id=product.product_id,
            filename=file.filename,
            content_type=file.content_type,
        )

        product_file = ProductFiles(
            product_id=product.product_id,
            object_key=upload_data["object_key"],
            content_type=file.content_type,
        )

        db.add(product_file)

        upload_urls.append(upload_data)

    db.commit()

    return {
        "product_id": product.product_id,
        "upload_urls": upload_urls,
    }