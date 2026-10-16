
import uuid
from decimal import Decimal
from typing import Annotated, Literal

from pydantic import BaseModel, Field, model_validator


MAX_IMAGE_SIZE = 5 * 1024 * 1024
MAX_VIDEO_SIZE = 25 * 1024 * 1024
MAX_FILES = 6
MAX_VIDEOS = 2

ALLOWED_EXTENSIONS = {
    "image/jpeg": {".jpg", ".jpeg"},
    "image/png": {".png"},
    "image/webp": {".webp"},
    "video/mp4": {".mp4"},
}


class ProductFileSchema(BaseModel):
    filename: Annotated[
        str,
        Field(min_length=1, max_length=255),
    ]

    content_type: Literal[
        "image/jpeg",
        "image/png",
        "image/webp",
        "video/mp4",
    ]

    size_bytes: Annotated[
        int,
        Field(gt=0),
    ]

    @model_validator(mode="after")
    def validate_file(self):
        filename = self.filename

        # Reject directory traversal and unsafe filenames.
        if (
            filename != filename.strip()
            or filename in {".", ".."}
            or "/" in filename
            or "\\" in filename
            or any(ord(char) < 32 or ord(char) == 127 for char in filename)
        ):
            raise ValueError("Invalid filename")

        extension = "." + filename.rsplit(".", 1)[-1].lower()

        if extension not in ALLOWED_EXTENSIONS[self.content_type]:
            raise ValueError(
                "File extension does not match content type"
            )

        max_size = (
            MAX_VIDEO_SIZE
            if self.content_type == "video/mp4"
            else MAX_IMAGE_SIZE
        )

        if self.size_bytes > max_size:
            raise ValueError("File exceeds maximum allowed size")

        return self


class CreateProductSchema(BaseModel):
    client_request_id: uuid.UUID

    name: Annotated[
        str,
        Field(min_length=1, max_length=50),
    ]

    price: Annotated[
        Decimal,
        Field(
            ge=Decimal("0.01"),
            le=Decimal("10000000"),
            max_digits=10,
            decimal_places=2,
        ),
    ]

    description: Annotated[
        str,
        Field(max_length=2000),
    ]

    condition: Annotated[
        str,
        Field(min_length=1, max_length=30),
    ]

    category: Annotated[
        str,
        Field(min_length=1, max_length=30),
    ]

    attributes: dict = Field(default_factory=dict)

    product_files: Annotated[
        list[ProductFileSchema],
        Field(min_length=1, max_length=MAX_FILES),
    ]

    delivery_options: Annotated[
        str,
        Field(min_length=1, max_length=30),
    ]

    @model_validator(mode="after")
    def validate_product_files(self):
        filenames = [
            file.filename.casefold()
            for file in self.product_files
        ]

        # Prevent files from sharing the same R2 object key.
        if len(filenames) != len(set(filenames)):
            raise ValueError(
                "Duplicate media filenames are not allowed"
            )

        video_count = sum(
            1
            for file in self.product_files
            if file.content_type == "video/mp4"
        )

        if video_count > MAX_VIDEOS:
            raise ValueError(
                f"Maximum of {MAX_VIDEOS} videos allowed"
            )

        return self
