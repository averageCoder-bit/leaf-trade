import uuid
from database.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Uuid, DateTime
from datetime import datetime
from common.get_utc import get_utc_now
from sqlalchemy import Boolean

class User(Base):
    __tablename__ = "users"
    user_id:Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=uuid.uuid4)
    clerk_user_id: Mapped[str] = mapped_column(
        String, nullable=False, unique=True
    )
    email:Mapped[str] = mapped_column(
        String, nullable=False, unique=True
    )
    first_name:Mapped[str] = mapped_column(
        String(30), nullable=False
    )
    last_name:Mapped[str] = mapped_column(
        String(30), nullable=False
    )
    phone_number:Mapped[str] = mapped_column(
        String(15), nullable=False, unique=True
    )
    username:Mapped[str] = mapped_column(String(30), nullable=False, unique=True)
    address:Mapped[str | None] = mapped_column(String(100), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=get_utc_now
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=get_utc_now,
        onupdate=get_utc_now
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )
