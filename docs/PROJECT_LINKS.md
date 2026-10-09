# CareerPilot AI — Project Links & Environment Information
**Project:** CareerPilot AI — Agentic AI Career Advisor  

---

## 1. Local Application Endpoints

| Service | Local URL | Description |
| :--- | :--- | :--- |
| **Frontend Web App** | `http://127.0.0.1:5173` | React 19 + TypeScript + Vite Light Glassmorphism UI |
| **Backend REST API** | `http://127.0.0.1:8000` | FastAPI Backend Server running on Uvicorn |
| **Interactive API Docs** | `http://127.0.0.1:8000/docs` | Swagger UI documentation with live API tester |
| **Alternative API Docs** | `http://127.0.0.1:8000/redoc` | ReDoc API specifications |
| **Backend Health Check** | `http://127.0.0.1:8000/api/health` | Multi-agent status, SQLite status & catalog diagnostics |

---

## 2. API Endpoints Reference

### Public & Health
* `GET /`: Root application status and metadata.
* `GET /api/health`: System health, catalog size (22 tracks), active agents, and LLM status.

### Career Catalog
* `GET /api/v1/careers`: Catalog query with optional `domain` and `search` query parameters.
* `GET /api/v1/careers/domains`: Distinct registered technology domains.
* `GET /api/v1/careers/{id}`: Full career pathway specifications.

### Profile & Authentication
* `POST /api/v1/profile`: Create or update a student profile in SQLite.
* `POST /api/v1/profile/login`: Student sign-in or account registration with email.
* `GET /api/v1/profile/{id}`: Retrieve profile by ID.
* `GET /api/v1/profile/demo/sample`: Pre-load demo student **Alex Rivera**.

### Multi-Agent Pipeline
* `POST /api/v1/recommendations/analyze`: Full multi-agent evaluation pipeline (Career, Gaps, Roadmap, Projects, Readiness).
* `POST /api/v1/roadmap/generate`: Adaptive 12-week roadmap generation.
* `POST /api/v1/chat/message`: Conversational consultation with intent-based agent routing.

### Progress & Tracking
* `GET /api/v1/progress/{profile_id}/{career_id}`: Persistent progress and employability readiness.
* `POST /api/v1/progress`: Update completed skills, milestones, and projects.

---

## 3. Environment & Deployment Configuration

### Frontend
* Built with Vite (`npm run build` outputs optimized production bundle to `frontend/dist/`).
* Proxies `/api` requests to `http://127.0.0.1:8000` via `vite.config.ts`.

### Backend
* Runs on Python FastAPI with ASGI server (Uvicorn).
* Configurable via `.env` file in `backend/.env`:
  ```env
  PROJECT_NAME=CareerPilot AI
  API_V1_PREFIX=/api/v1
  DEBUG=True
  SQLITE_DB_PATH=careerpilot.db
  # Optional LLM Key (Deterministic local engine is used when absent)
  GEMINI_API_KEY=your_key_here
  LLM_PROVIDER=gemini
  LLM_MODEL=gemini-1.5-flash
  ```
