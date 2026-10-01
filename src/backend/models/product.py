import uuid
from pathlib import Path
import sys

from decimal import Decimal
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Uuid, String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSONB

current_dir = Path(__file__).resolve().parent.parent
sys.path.append(str(current_dir))

from database.base import Base
from common.get_utc import get_utc_now

if TYPE_CHECKING:
    from models.user import User
    from models.product_files import ProductFiles


class Product(Base):
    __tablename__ = "product"

    product_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )

    name: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        String(2000),
        nullable=False,
    )

    condition: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    category: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    attributes: Mapped[dict] = mapped_column(
        JSONB,
        nullable=True,
    )

    delivery_options: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    listed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=get_utc_now,
    )

    sold_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("user.user_id", ondelete="CASCADE"),
        nullable=False,
    )

    seller: Mapped["User"] = relationship(
        back_populates="products",
    )

    files: Mapped[list["ProductFiles"]] = relationship(
        "ProductFiles",
        back_populates="product",
        cascade="all, delete-orphan",
    )

    