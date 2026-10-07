"""Application configuration settings.

Reads environment variables with sensible defaults for local development.
No hardcoded machine-specific paths.
"""

import os
from pathlib import Path

# Base directories relative to backend root
BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "temp" / "uploads"
OUTPUT_DIR = BASE_DIR / "temp" / "outputs"


class Settings:
    """Application settings with environment variable support."""

    def __init__(self) -> None:
        self.ffmpeg_path: str = os.getenv("FFMPEG_PATH", "ffmpeg")
        self.ffprobe_path: str = os.getenv("FFPROBE_PATH", "ffprobe")
        self.max_file_size_mb: int = int(os.getenv("MAX_FILE_SIZE_MB", "500"))
        self.max_duration_seconds: int = int(os.getenv("MAX_DURATION_SECONDS", "2700"))
        self.cors_origin: str = os.getenv("CORS_ORIGIN", "http://localhost:5173")

        self.base_dir: Path = BASE_DIR
        self.upload_dir: Path = UPLOAD_DIR
        self.output_dir: Path = OUTPUT_DIR


settings = Settings()
