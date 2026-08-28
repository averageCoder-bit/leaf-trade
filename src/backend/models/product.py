from src.backend.database.base import Base
import uuid
from decimal import Decimal
from sqlalchemy import Uuid, String, Numeric, DateTime, ForeignKey, DECIMAL
from datetime import datetime
from src.backend.common.get_utc import get_utc_now
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSONB
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models.user import User

class Product(Base):
    __tablename__ = "product"
    product_id:Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    name:Mapped[str] = mapped_column(String(50), nullable=False)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    description: Mapped[str] = mapped_column(String(2000))
    condition: Mapped[str] = mapped_column(String(30), nullable=False)
    category: Mapped[str] = mapped_column(String(30), nullable=False)
    attributes: Mapped[dict] = mapped_column(JSONB, nullable=True)
    delivery_option: Mapped[str] = mapped_column(String(30), nullable=False)
    listed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=get_utc_now())
    sold_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=get_utc_now())

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.user_id", ondelete="CASCADE"))
    seller: Mapped["User"] = relationship(back_populates="products")
    





