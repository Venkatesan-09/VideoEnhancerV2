"""Video domain helpers and validations.

Foundation validation rules for upcoming video processing pipeline.
Video processing pipelines are intentionally reserved for Phase 2.
"""

from pathlib import Path

# Allowed video container extensions for upload validation
ALLOWED_EXTENSIONS: set[str] = {".mp4", ".mov", ".mkv", ".avi", ".webm"}


def is_supported_video_format(filename: str) -> bool:
    """Verify if the uploaded file has a supported video extension."""
    extension = Path(filename).suffix.lower()
    return extension in ALLOWED_EXTENSIONS
