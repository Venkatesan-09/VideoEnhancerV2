"""Pydantic schemas for request and response models."""

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Health check response model."""

    status: str = Field(default="ok", description="Status indicator of the API service")
