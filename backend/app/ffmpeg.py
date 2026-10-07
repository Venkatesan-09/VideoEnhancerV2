"""FFmpeg and FFprobe binary management.

Provides verified binary paths and foundation helpers for upcoming video operations.
Video processing pipelines are intentionally reserved for Phase 2.
"""

from app.config import settings


def get_ffmpeg_binary() -> str:
    """Return the configured path or command name for the FFmpeg binary."""
    return settings.ffmpeg_path


def get_ffprobe_binary() -> str:
    """Return the configured path or command name for the FFprobe binary."""
    return settings.ffprobe_path
