from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from .config import settings
from .database import init_db
from .routes import careers, profile, recommendations, roadmap, chat, progress
from .agents.llm_service import llm_service
from .ml.matcher import CareerMatcher

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Agentic AI Career Advisor for College Students (SDG 8: Decent Work and Economic Growth)"
)

import time
from collections import defaultdict
from fastapi.responses import JSONResponse

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        return response

class RateLimitingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests_per_minute: int = 120):
        super().__init__(app)
        self.max_requests = max_requests_per_minute
        self.request_records = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "127.0.0.1"
        now = time.time()
        
        # Clean timestamps older than 60 seconds
        self.request_records[client_ip] = [
            t for t in self.request_records[client_ip] if now - t < 60
        ]
        
        if len(self.request_records[client_ip]) >= self.max_requests:
            return JSONResponse(
                status_code=429,
                content={"detail": "Too many requests. Please wait a moment before trying again."},
                headers={"Retry-After": "60"}
            )
            
        self.request_records[client_ip].append(now)
        return await call_next(request)

app.add_middleware(RateLimitingMiddleware)
app.add_middleware(SecurityHeadersMiddleware)

# CORS middleware for development and production frontend
allowed_origins_list = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins_list,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Mount routes
app.include_router(careers.router, prefix=settings.API_V1_PREFIX)
app.include_router(profile.router, prefix=settings.API_V1_PREFIX)
app.include_router(recommendations.router, prefix=settings.API_V1_PREFIX)
app.include_router(roadmap.router, prefix=settings.API_V1_PREFIX)
app.include_router(chat.router, prefix=settings.API_V1_PREFIX)
app.include_router(progress.router, prefix=settings.API_V1_PREFIX)

matcher = CareerMatcher()

@app.get("/")
def root():
    return {
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "sdg_target": "SDG 8: Decent Work and Economic Growth",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "sqlite_connected",
        "career_catalog_size": len(matcher.get_all_careers()),
        "llm_status": "enabled" if llm_service.has_api_key() else "deterministic_fallback",
        "agents": [
            "Career Analysis Agent",
            "Skill Gap Analysis Agent",
            "Learning Planner Agent",
            "Project Recommendation Agent",
            "Career Readiness Agent",
            "Orchestrator Agent"
        ]
    }
