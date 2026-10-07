"""Video Quality Enhancer - FastAPI Backend Application.

Phase 1 Foundation:
- CORS configuration
- Temporary directory initialization
- Health check endpoint: GET /api/health
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.schemas import HealthResponse

app = FastAPI(
    title="Video Quality Enhancer API",
    description="Minimal FastAPI backend for video analysis and 720p enhancement.",
    version="1.0.0",
)

# Configure CORS origins including configured frontend origin and common local ports
allowed_origins = [
    settings.cors_origin,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event() -> None:
    """Ensure temporary upload and output directories exist."""
    os.makedirs(settings.upload_dir, exist_ok=True)
    os.makedirs(settings.output_dir, exist_ok=True)


@app.get("/api/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    """Health check endpoint to verify backend connectivity.

    Returns:
        JSON response with status "ok"
    """
    return HealthResponse(status="ok")
