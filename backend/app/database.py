from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import get_settings
from app.models import Service, Employee, GalleryImage, AdminUser

settings = get_settings()


async def init_database():
    """Initialize MongoDB connection and Beanie ODM."""
    client = AsyncIOMotorClient(settings.mongodb_uri)
    database = client.get_default_database()
    
    await init_beanie(
        database=database,
        document_models=[Service, Employee, GalleryImage, AdminUser]
    )
    
    return client
