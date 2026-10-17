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

from storage.files import (
    generate_upload_url,
    generate_upload_url_for_key,
    verify_uploaded_file,
)

import uuid

from sqlalchemy.orm import selectinload
from botocore.exceptions import ClientError, BotoCoreError

import os
from urllib.parse import quote

from fastapi import Query

from collections import Counter
from decimal import Decimal
from sqlalchemy.exc import IntegrityError
from fastapi import Response


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
        "seller_name": product.seller.username if product.seller else None,
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


def get_existing_product(
    db: Session,
    user_id: uuid.UUID,
    request_id: uuid.UUID,
):
    return (
        db.query(Product)
        .options(selectinload(Product.files))
        .filter(
            Product.user_id == user_id,
            Product.client_request_id == request_id,
        )
        .first()
    )


def product_matches_request(
    product: Product,
    data: CreateProductSchema,
) -> bool:
    requested_attributes = data.attributes or {}

    if hasattr(requested_attributes, "model_dump"):
        requested_attributes = requested_attributes.model_dump(
            exclude_none=True
        )

    requested_files = Counter(
        (
            file.filename,
            file.content_type,
            file.size_bytes,
        )
        for file in data.product_files
    )

    existing_files = Counter(
        (
            file.object_key.rsplit("/", 1)[-1],
            file.content_type,
            file.expected_size_bytes,
        )
        for file in product.files
    )

    return (
        product.name == data.name
        and product.price == Decimal(str(data.price))
        and product.description == data.description
        and product.condition == data.condition
        and product.category == data.category
        and product.delivery_options == data.delivery_options
        and (product.attributes or {}) == requested_attributes
        and existing_files == requested_files
    )


def replay_product_creation(
    product: Product,
    data: CreateProductSchema,
):
    if not product_matches_request(product, data):
        raise HTTPException(
            status_code=409,
            detail="Request ID was already used for different product data",
        )

    if product.listing_status == "active":
        return {
            "product_id": product.product_id,
            "listing_status": "active",
            "upload_urls": [],
        }

    if product.listing_status != "pending_upload":
        raise HTTPException(
            status_code=409,
            detail="Product cannot resume uploading",
        )

    # Preserve the original request's file order.
    stored_files = {
        (file.object_key.rsplit("/", 1)[-1], file.content_type): file
        for file in product.files
    }

    upload_urls = []

    for requested in data.product_files:
        stored = stored_files[
            (requested.filename, requested.content_type)
        ]

        upload_urls.append({
            "filename": requested.filename,
            "object_key": stored.object_key,
            "upload_url": generate_upload_url_for_key(
                stored.object_key,
                stored.content_type,
            ),
        })

    return {
        "product_id": product.product_id,
        "listing_status": "pending_upload",
        "upload_urls": upload_urls,
    }



@router.post(
    "/products",
    status_code=status.HTTP_201_CREATED,
)
def create_listing(
    data: CreateProductSchema,
    response: Response,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.clerk_user_id == current_user.user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    # Check whether this request was already committed.
    existing = get_existing_product(
        db,
        user.user_id,
        data.client_request_id,
    )

    if existing:
        response.status_code = 200
        return replay_product_creation(existing, data)

    filenames = [file.filename for file in data.product_files]

    if (
        len(filenames) != len(set(name.casefold() for name in filenames))
        or any(
            not name
            or name in (".", "..")
            or "/" in name
            or "\\" in name
            for name in filenames
        )
    ):
        raise HTTPException(
            status_code=422,
            detail="Invalid or duplicate media filenames",
        )

    try:
        product = Product(
            name=data.name,
            price=data.price,
            description=data.description,
            condition=data.condition,
            category=data.category,
            attributes=data.attributes,
            delivery_options=data.delivery_options,
            user_id=user.user_id,
            client_request_id=data.client_request_id,
            listing_status="pending_upload",
        )

        
        db.add(product)
        db.flush()

        upload_urls = []

        for file in data.product_files:
            # Generate presigned R2 upload URL
            upload_data = generate_upload_url(
                product_id=product.product_id,
                filename=file.filename,
                content_type=file.content_type,
            )

            # Store expected file metadata in PostgreSQL
            product_file = ProductFiles(
                product_id=product.product_id,
                object_key=upload_data["object_key"],
                content_type=file.content_type,
                expected_size_bytes=file.size_bytes,
            )

            db.add(product_file)
            upload_urls.append(upload_data)

        db.commit()

        return {
            "product_id": product.product_id,
            "listing_status": "pending_upload",
            "upload_urls": upload_urls,
        }


    except IntegrityError as exc:
        db.rollback()

        # Another concurrent request may have created
        # this product using the same request ID.
        existing = get_existing_product(
            db,
            user.user_id,
            data.client_request_id,
        )

        if existing:
            response.status_code = 200
            return replay_product_creation(existing, data)

        raise HTTPException(
            status_code=409,
            detail="Product creation conflicted with an existing record",
        ) from exc

    except Exception:
        db.rollback()
        raise



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
                expected_size_bytes=file.expected_size_bytes,
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



@router.post(
    "/products/{product_id}/upload-urls",
    status_code=status.HTTP_200_OK,
)
def refresh_product_upload_urls(
    product_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # 1. Resolve authenticated seller
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

    # 2. Find this seller's existing product
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

    # 3. Only pending listings need fresh upload URLs
    if product.listing_status != "pending_upload":
        raise HTTPException(
            status_code=409,
            detail="Product is not pending upload",
        )

    if not product.files:
        raise HTTPException(
            status_code=409,
            detail="Product has no associated media",
        )

    # 4. Sign the existing object keys
    upload_urls = []

    try:
        for file in product.files:
            upload_url = generate_upload_url_for_key(
                object_key=file.object_key,
                content_type=file.content_type,
            )

            upload_urls.append({
                "filename": file.object_key.rsplit("/", 1)[-1],
                "object_key": file.object_key,
                "upload_url": upload_url,
            })

    except BotoCoreError as exc:
        raise HTTPException(
            status_code=502,
            detail="Failed to generate upload URLs",
        ) from exc

    # 5. Return refreshed URLs
    return {
        "product_id": product.product_id,
        "upload_urls": upload_urls,
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
        .options(
            selectinload(Product.files),
            selectinload(Product.seller),
        )
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
    "/users/me/products",
    status_code=status.HTTP_200_OK,
)
def get_user_products(
    current_user=Depends(get_current_user),
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
        .options(
            selectinload(Product.files),
            selectinload(Product.seller),
        )
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
