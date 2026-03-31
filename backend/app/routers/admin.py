from fastapi import APIRouter, HTTPException, status, Depends, File, UploadFile, Form, Request
from typing import List, Optional
from datetime import datetime
from beanie import PydanticObjectId
from app.models import (
    Service, ServiceCreate, ServiceUpdate,
    Employee, EmployeeCreate, EmployeeUpdate,
    GalleryImage, GalleryImageCreate
)
from app.auth import decode_token
from app.cloudinary import upload_image, delete_image

router = APIRouter()


def get_current_user(request: Request):
    """Validate JWT token and return user info."""
    auth_header = request.headers.get("authorization", "")
    token = auth_header.replace("Bearer ", "") if auth_header.startswith("Bearer ") else ""
    if not token:
        raise HTTPException(status_code=401, detail="Authentication required")
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload.get("sub")


# Admin Services Endpoints
@router.get("/services", response_model=List[Service])
async def get_all_services_admin(user: str = Depends(get_current_user)):
    """Get all services including inactive (admin only)."""
    services = await Service.find().sort(+Service.order_index).to_list()
    return services


@router.post("/services", response_model=Service)
async def create_service(
    service_data: ServiceCreate,
    user: str = Depends(get_current_user)
):
    """Create a new service (admin only)."""
    service = Service(**service_data.dict())
    await service.insert()
    return service


@router.patch("/services/{service_id}", response_model=Service)
async def update_service(
    service_id: PydanticObjectId,
    service_data: ServiceUpdate,
    user: str = Depends(get_current_user)
):
    """Update a service (admin only)."""
    service = await Service.get(service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = service_data.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    for field, value in update_data.items():
        setattr(service, field, value)
    
    await service.save()
    return service


@router.delete("/services/{service_id}")
async def delete_service(
    service_id: PydanticObjectId,
    user: str = Depends(get_current_user)
):
    """Soft delete a service (admin only)."""
    service = await Service.get(service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    service.is_active = False
    service.updated_at = datetime.utcnow()
    await service.save()
    return {"message": "Service deactivated successfully"}


# Admin Employees Endpoints
@router.get("/employees", response_model=List[Employee])
async def get_all_employees_admin(user: str = Depends(get_current_user)):
    """Get all employees including inactive (admin only)."""
    employees = await Employee.find().to_list()
    return employees


@router.post("/employees", response_model=Employee)
async def create_employee(
    employee_data: EmployeeCreate,
    user: str = Depends(get_current_user)
):
    """Create a new employee (admin only)."""
    employee = Employee(**employee_data.dict())
    await employee.insert()
    return employee


@router.patch("/employees/{employee_id}", response_model=Employee)
async def update_employee(
    employee_id: PydanticObjectId,
    employee_data: EmployeeUpdate,
    user: str = Depends(get_current_user)
):
    """Update an employee (admin only)."""
    employee = await Employee.get(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    update_data = employee_data.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    for field, value in update_data.items():
        setattr(employee, field, value)
    
    await employee.save()
    return employee


@router.delete("/employees/{employee_id}")
async def delete_employee(
    employee_id: PydanticObjectId,
    user: str = Depends(get_current_user)
):
    """Soft delete an employee (admin only)."""
    employee = await Employee.get(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    employee.is_active = False
    employee.updated_at = datetime.utcnow()
    await employee.save()
    return {"message": "Employee deactivated successfully"}


# Admin Gallery Endpoints
@router.get("/gallery", response_model=List[GalleryImage])
async def get_all_gallery_admin(user: str = Depends(get_current_user)):
    """Get all gallery images (admin only)."""
    images = await GalleryImage.find().sort(-GalleryImage.uploaded_at).to_list()
    return images


@router.post("/gallery/upload")
async def upload_gallery_image(
    file: UploadFile = File(...),
    caption: Optional[str] = Form(None),
    category: str = Form("general"),
    user: str = Depends(get_current_user)
):
    """Upload image to Cloudinary and save to gallery (admin only)."""
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only JPG, PNG, and WebP images allowed")
    
    # Validate file size (5MB max)
    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be under 5MB")
    
    # Upload to Cloudinary
    try:
        url, public_id = await upload_image(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # Save to database
    gallery_image = GalleryImage(
        url=url,
        public_id=public_id,
        caption=caption,
        category=category
    )
    await gallery_image.insert()
    
    return gallery_image


@router.delete("/gallery/{image_id}")
async def delete_gallery_image(
    image_id: PydanticObjectId,
    user: str = Depends(get_current_user)
):
    """Delete gallery image from Cloudinary and database (admin only)."""
    image = await GalleryImage.get(image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Delete from Cloudinary
    try:
        await delete_image(image.public_id)
    except Exception as e:
        # Log but continue to delete from DB
        print(f"Failed to delete from Cloudinary: {e}")
    
    # Delete from database
    await image.delete()
    return {"message": "Image deleted successfully"}
