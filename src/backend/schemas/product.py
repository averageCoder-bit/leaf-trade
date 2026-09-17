from decimal import Decimal
from typing import Annotated

from pydantic import BaseModel, Field
class ProductFileSchema(BaseModel):
    filename: str
    content_type: str

class CreateProductSchema(BaseModel):
    name: Annotated[str, Field(min_length=1, max_length=50)]

    price: Annotated[
        Decimal,
        Field(gt=0, le=10_000_000),
    ]

    description: Annotated[
        str,
        Field(min_length=1, max_length=2000),
    ]

    condition: Annotated[str, Field(max_length=30)]

    category: Annotated[str, Field(max_length=30)]

    attributes: dict

    product_files: Annotated[
        list[ProductFileSchema],
        Field(min_length=1, max_length=6),
    ]

    delivery_options: Annotated[str, Field(max_length=30)]