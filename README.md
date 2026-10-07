# Video Quality Enhancer (MVP - Phase 1 Foundation)

A minimalist, production-quality video quality enhancer pipeline.

## Target Architecture

```
React (Vite + TypeScript)
       ↓
    FastAPI
       ↓
FFprobe / FFmpeg
```

> **Strict Simplicity Discipline:**
> - No Express, no `server.ts`, no proxy servers
> - No database, no ORM, no Redis, no Celery / job queues
> - No Cloudinary, no AI super-resolution, no subtitles / Whisper
> - 100% focused on core pipeline: Upload → Analyze → Transcode to 720p → Validate → Download

---

## Project Structure

```text
video-quality-enhancer/
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles/
│   │       └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── ffmpeg.py
│   │   ├── video.py
│   │   └── schemas.py
│   │
│   ├── temp/
│   │   ├── uploads/
│   │   └── outputs/
│   │
│   ├── requirements.txt
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## Prerequisites

1. **Python**: Python 3.10+ (e.g., Python 3.10.11 AMD64)
2. **Node.js**: Node.js v22+ (e.g., Node.js v22.17.1, npm 11.6.0)
3. **FFmpeg & FFprobe**: Installed and available in your system `PATH`
   - Test via: `ffmpeg -version` and `ffprobe -version`

---

## 1. Backend Setup & Startup

### Step 1: Open Terminal & Navigate to Backend
```bash
cd backend
```

### Step 2: Create & Activate Virtual Environment
On Windows (Command Prompt / PowerShell):
```cmd
python -m venv .venv
.venv\Scripts\activate
```
On Linux / macOS / Git Bash:
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
# Windows
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

Contents of `.env`:
```env
FFMPEG_PATH=ffmpeg
FFPROBE_PATH=ffprobe
MAX_FILE_SIZE_MB=500
MAX_DURATION_SECONDS=2700
CORS_ORIGIN=http://localhost:5173
```

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 5: Start FastAPI Server
```bash
uvicorn app.main:app --reload --port 8000
```

The backend starts at `http://127.0.0.1:8000`.

---

## 2. Frontend Setup & Startup

### Step 1: Open a Second Terminal & Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Start Vite Dev Server
```bash
npm run dev
```

The frontend will be accessible at `http://localhost:5173`.

---

## 3. Health Check Verification

### Exact Health Check URL:
```
http://localhost:8000/api/health
```

### Test via cURL or Browser:
```bash
curl http://localhost:8000/api/health
```

### Expected Response:
```json
{
  "status": "ok"
}
```

In the React frontend, the verification panel allows live testing of this endpoint.

---

## MVP Phase Status

- **Phase 1 (Completed)**:
  - Repository structure created
  - Backend configuration, schemas, and `GET /api/health` with CORS
  - FFmpeg / FFprobe validation stubs ready
  - Frontend MVP placeholder UI and live React ↔ FastAPI connection verifier

- **Phase 2 (Upcoming)**:
  - Video upload endpoint (`POST /api/upload`)
  - Video analysis via FFprobe (`POST /api/analyze`)
  - 720p transcode execution via FFmpeg (`POST /api/process/720p`)
  - Output validation via FFprobe
  - Processed video download endpoint (`GET /api/download/{id}`)
