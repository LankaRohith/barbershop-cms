from fastapi import APIRouter, HTTPException, status
from typing import List
from beanie import PydanticObjectId
from app.models import Employee

router = APIRouter()


@router.get("/", response_model=List[Employee])
async def get_active_employees():
    """Get all active employees."""
    employees = await Employee.find(
        Employee.is_active == True
    ).to_list()
    return employees


@router.get("/{employee_id}", response_model=Employee)
async def get_employee(employee_id: PydanticObjectId):
    """Get a specific employee by ID."""
    employee = await Employee.get(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
