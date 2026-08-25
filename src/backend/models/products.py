from database.base import Base
import uuid
from sqlalchemy import Uuid, String, Numeric, DateTime, ForeignKey
from datetime import datetime
from backend.common.get_utc import get_utc_now
from sqlalchemy.orm import Mapped, mapped_column

class Products(Base):
    __tablename__ = "Products"
    product_id:Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, nullable=False)
    name:Mapped[str] = mapped_column(String(50))
    price: Mapped[Numeric] = mapped_column(Numeric(7, 2), nullable=False)
    description: Mapped[str] = mapped_column(String(100))
    category: Mapped[str] = mapped_column(String(30))
    listed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=get_utc_now())
    sold_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=get_utc_now())






