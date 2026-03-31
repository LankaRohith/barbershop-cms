from datetime import datetime
from typing import Optional
from beanie import Document, Indexed
from pydantic import BaseModel, Field


class Service(Document):
    name: Indexed(str)
    price: float
    description: str
    duration_minutes: int = 30
    image_url: Optional[str] = None
    order_index: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "services"


class Employee(Document):
    name: Indexed(str)
    role: str = "Barber"
    bio: Optional[str] = None
    image_url: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "employees"


class GalleryImage(Document):
    url: str
    public_id: str
    caption: Optional[str] = None
    category: str = "general"
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "gallery"


class AdminUser(Document):
    username: Indexed(str, unique=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "admin_users"


# Pydantic schemas for request/response
class ServiceCreate(BaseModel):
    name: str
    price: float
    description: str
    duration_minutes: int = 30
    image_url: Optional[str] = None
    order_index: int = 0


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    duration_minutes: Optional[int] = None
    image_url: Optional[str] = None
    order_index: Optional[int] = None
    is_active: Optional[bool] = None


class EmployeeCreate(BaseModel):
    name: str
    role: str = "Barber"
    bio: Optional[str] = None
    image_url: Optional[str] = None


class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None


class GalleryImageCreate(BaseModel):
    url: str
    public_id: str
    caption: Optional[str] = None
    category: str = "general"


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
