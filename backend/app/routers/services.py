from fastapi import APIRouter, HTTPException, status, Query
from typing import List
from datetime import datetime
from beanie import PydanticObjectId
from app.models import Service, ServiceCreate, ServiceUpdate

router = APIRouter()


@router.get("/", response_model=List[Service])
async def get_active_services():
    """Get all active services sorted by order_index."""
    services = await Service.find(
        Service.is_active == True
    ).sort(+Service.order_index).to_list()
    return services


@router.get("/{service_id}", response_model=Service)
async def get_service(service_id: PydanticObjectId):
    """Get a specific service by ID."""
    service = await Service.get(service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service
