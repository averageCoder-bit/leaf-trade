from fastapi import Depends, APIRouter, status, HTTPException
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

import uuid

from sqlalchemy.orm import selectinload
from botocore.exceptions import ClientError, BotoCoreError

from storage.files import verify_uploaded_file

import os
from urllib.parse import quote

from fastapi import Query
from sqlalchemy.orm import selectinload

router = APIRouter()


def serialize_product(product: Product) -> dict:
    public_url = os.getenv("R2_PUBLIC_URL", "").rstrip("/")

    media = []

    for file in product.files:
        file_url = None

        if public_url:
            object_key = quote(file.object_key, safe="/")
            file_url = f"{public_url}/{object_key}"

        media.append({
            "file_id": str(file.file_id),
            "url": file_url,
            "content_type": file.content_type,
        })

    preview_image = next(
        (
            file["url"]
            for file in media
            if file["content_type"].startswith("image/")
        ),
        None,
    )

    return {
        "product_id": str(product.product_id),
        "user_id": str(product.user_id),
        "name": product.name,
        "price": float(product.price),
        "description": product.description,
        "condition": product.condition,
        "category": product.category,
        "attributes": product.attributes,
        "delivery_options": product.delivery_options,
        "listing_status": product.listing_status,
        "listed_at": (
            product.listed_at.isoformat()
            if product.listed_at else None
        ),
        "sold_at": (
            product.sold_at.isoformat()
            if product.sold_at else None
        ),
        "preview_image": preview_image,
        "media": media,
    }



@router.post("/products", status_code=status.HTTP_201_CREATED)
async def create_listing(
    data: CreateProductSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.clerk_user_id == current_user.user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    product = Product(
        name=data.name,
        price=data.price,
        description=data.description,
        condition=data.condition,
        category=data.category,
        attributes=data.attributes,
        delivery_options=data.delivery_options,
        user_id = user.user_id
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


@router.post(
    "/products/{product_id}/complete",
    status_code=status.HTTP_200_OK,
)
def complete_listing(
    product_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(
            User.clerk_user_id == current_user.user_id
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    product = (
        db.query(Product)
        .options(selectinload(Product.files))
        .filter(
            Product.product_id == product_id,
            Product.user_id == user.user_id,
        )
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    if product.listing_status == "active":
        return {
            "product_id": product.product_id,
            "listing_status": "active",
        }

    if product.listing_status != "pending_upload":
        raise HTTPException(
            status_code=409,
            detail="Product is not pending upload",
        )

    if not product.files:
        raise HTTPException(
            status_code=409,
            detail="Product has no media files",
        )

    for file in product.files:
        try:
            is_uploaded = verify_uploaded_file(
                object_key=file.object_key,
                content_type=file.content_type,
            )

        except (ClientError, BotoCoreError) as exc:
            raise HTTPException(
                status_code=502,
                detail="Failed to verify Cloudflare R2",
            ) from exc

        if not is_uploaded:
            raise HTTPException(
                status_code=409,
                detail="Some media files are missing or invalid",
            )

    product.listing_status = "active"
    db.commit()

    return {
        "product_id": product.product_id,
        "listing_status": product.listing_status,
    }



@router.get(
    "/marketplace",
    status_code=status.HTTP_200_OK,
)
def get_products(
    db: Session = Depends(get_db),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    products = (
        db.query(Product)
        .options(selectinload(Product.files))
        .filter(
            Product.listing_status == "active",
            Product.sold_at.is_(None),
        )
        .order_by(
            Product.listed_at.desc(),
            Product.product_id.desc(),
        )
        .offset(offset)
        .limit(limit)
        .all()
    )

    return [
        serialize_product(product)
        for product in products
    ]



@router.get(
    "/users/me",
    status_code=status.HTTP_200_OK,
)
def get_user_products(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(
            User.clerk_user_id == current_user.user_id
        )
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    products = (
        db.query(Product)
        .options(selectinload(Product.files))
        .filter(
            Product.user_id == user.user_id
        )
        .order_by(
            Product.listed_at.desc(),
            Product.product_id.desc(),
        )
        .all()
    )

    return [
        serialize_product(product)
        for product in products
    ]
