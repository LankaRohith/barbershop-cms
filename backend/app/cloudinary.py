import cloudinary
import cloudinary.uploader
from app.config import get_settings

settings = get_settings()


def init_cloudinary():
    """Initialize Cloudinary with settings."""
    cloudinary.config(
        cloud_name=settings.cloudinary_cloud_name,
        api_key=settings.cloudinary_api_key,
        api_secret=settings.cloudinary_api_secret,
        secure=True
    )


async def upload_image(file, folder: str = "barbershop"):
    """Upload image to Cloudinary and return URL."""
    init_cloudinary()
    try:
        result = cloudinary.uploader.upload(
            file,
            folder=folder,
            resource_type="image",
            transformation=[
                {"quality": "auto", "fetch_format": "auto"}
            ]
        )
        return result["secure_url"], result["public_id"]
    except Exception as e:
        raise Exception(f"Failed to upload image: {str(e)}")


async def delete_image(public_id: str):
    """Delete image from Cloudinary."""
    init_cloudinary()
    try:
        result = cloudinary.uploader.destroy(public_id)
        return result
    except Exception as e:
        raise Exception(f"Failed to delete image: {str(e)}")
