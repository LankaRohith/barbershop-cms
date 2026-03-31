from fastapi import APIRouter, HTTPException, status
from datetime import datetime
from app.models import LoginRequest, TokenResponse, AdminUser
from app.auth import verify_password, create_access_token, get_password_hash
from app.config import get_settings

settings = get_settings()
router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def login(credentials: LoginRequest):
    """Authenticate admin and return JWT token."""
    user = await AdminUser.find_one(AdminUser.username == credentials.username)
    
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


async def seed_admin_user():
    """Seed initial admin user if none exists."""
    existing = await AdminUser.find_one(AdminUser.username == settings.admin_username)
    if not existing:
        admin = AdminUser(
            username=settings.admin_username,
            hashed_password=get_password_hash(settings.admin_password)
        )
        await admin.insert()
        print(f"Admin user created: {settings.admin_username}")
