from fastapi import APIRouter, HTTPException, status
from typing import List
from beanie import PydanticObjectId
from app.models import GalleryImage

router = APIRouter()


@router.get("/", response_model=List[GalleryImage])
async def get_gallery_images():
    """Get all gallery images sorted by upload date."""
    images = await GalleryImage.find().sort(-GalleryImage.uploaded_at).to_list()
    return images


@router.get("/{image_id}", response_model=GalleryImage)
async def get_gallery_image(image_id: PydanticObjectId):
    """Get a specific gallery image by ID."""
    image = await GalleryImage.get(image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return image
