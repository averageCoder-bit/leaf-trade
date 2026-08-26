from src.backend.database.base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, UUID, String
import uuid
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from backend.models.product import Product

class ProductImage(Base):
    __tablename__ = "product_image"

    image_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    product_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("product.product_id", ondelete="CASCADE"),
        nullable=False
    )

    object_key: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    product: Mapped["Product"] = relationship(
        "Product",
        back_populates="images"
    )