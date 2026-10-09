import os
from pathlib import Path
from pydantic import BaseModel
from dotenv import load_dotenv

# Load .env file from backend root or workspace root
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

class Settings(BaseModel):
    PROJECT_NAME: str = "CareerPilot AI"
    VERSION: str = "1.0.0"
    API_V1_PREFIX: str = "/api"
    HOST: str = os.getenv("HOST", "127.0.0.1")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # Database
    DATABASE_PATH: str = os.getenv(
        "DATABASE_PATH",
        str(Path(__file__).resolve().parent.parent / "careerpilot.db")
    )
    
    # CORS Settings
    ALLOWED_ORIGINS: str = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000"
    )
    
    # LLM Settings (Optional with full deterministic fallback)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "deterministic") # "gemini", "openai", or "deterministic"
    LLM_MODEL: str = os.getenv("LLM_MODEL", "gemini-1.5-flash")

settings = Settings()
