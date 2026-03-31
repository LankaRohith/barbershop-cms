from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
from datetime import datetime

from app.config import get_settings
from app.database import init_database
from app.routers import services, employees, gallery, admin, auth

settings = get_settings()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events."""
    # Startup
    logger.info("Starting up...")
    await init_database()
    logger.info("Database initialized")
    yield
    # Shutdown
    logger.info("Shutting down...")


app = FastAPI(
    title="Barber Shop CMS API",
    description="Full-stack CMS for barber shop with admin panel",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all requests and responses."""
    start_time = datetime.utcnow()
    response = await call_next(request)
    duration = (datetime.utcnow() - start_time).total_seconds()
    logger.info(
        f"{request.method} {request.url.path} - {response.status_code} - {duration:.3f}s"
    )
    return response


# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(services.router, prefix="/services", tags=["Services"])
app.include_router(employees.router, prefix="/employees", tags=["Employees"])
app.include_router(gallery.router, prefix="/gallery", tags=["Gallery"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])


@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for cron job monitoring.
    
    CRON JOB INSTRUCTIONS FOR USER:
    1. Go to https://cron-job.org (free)
    2. Create account, click "Create cronjob"
    3. URL: https://your-backend.onrender.com/health
    4. Schedule: Every 10 minutes
    5. This keeps the Render free tier awake 24/7
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "barbershop-cms"
    }


@app.get("/")
async def root():
    return {
        "message": "Barber Shop CMS API",
        "docs": "/docs",
        "health": "/health"
    }
