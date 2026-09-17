from pathlib import Path
import sys

current_dir = Path(__file__).resolve().parent.parent
sys.path.append(str(current_dir))

from database.base import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, UUID, String
import uuid
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from backend.models.product import Product

class ProductFiles(Base):
    __tablename__ = "product_file"

    file_id: Mapped[uuid.UUID] = mapped_column(
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
        back_populates="files"
    )

    content_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )