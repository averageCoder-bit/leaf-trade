import boto3
import os
from dotenv import load_dotenv
import uuid
import requests
load_dotenv()

s3 = boto3.client(
    service_name="s3",
    # Provide your Cloudflare account ID
    endpoint_url=os.getenv("S3_ENDPOINT_URL"),
    # Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
    aws_access_key_id=os.getenv("ACCESS_KEY_R2"),
    aws_secret_access_key=os.getenv("SECRET_KEY_R2"),
    region_name="auto", # Required by SDK but not used by R2
)

def generate_upload_url(
    product_id: uuid.UUID,
    filename: str,
    content_type: str,
):
    if content_type.startswith("image/"):
        prefix = "images/products"
    elif content_type.startswith("video/"):
        prefix = "videos/products"
    else:
        raise ValueError("Unsupported file type")

    key = f"{prefix}/{product_id}/{filename}"
    print(key)

    url = s3.generate_presigned_url(
        "put_object",
        Params={
            "Bucket": "leaftrade-media",
            "Key": key,
            "ContentType": content_type,
        },
        ExpiresIn=600,
    )

    return {
        "filename": filename,
        "object_key": key,
        "upload_url": url,
    }






