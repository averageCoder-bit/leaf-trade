from pydantic import BaseModel, Field
from typing import Annotated
from decimal import Decimal
class Product(BaseModel):
    name: Annotated[str, Field(max_length=50)]
    price: Annotated[Decimal, Field(min=0.01, max=10000000)]
    description: Annotated[str, Field(max_length=2000)]
    condition: Annotated[str, Field(max_length=30)]
    category: Annotated[str, Field(max_length=30)]
    delivery_option: Annotated[str, Field(max_length=30)]