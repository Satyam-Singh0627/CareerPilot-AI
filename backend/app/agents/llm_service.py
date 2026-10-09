import os
import json
import httpx
from typing import Optional, Dict, Any, List
from ..config import settings

class LLMService:
    """
    Unified LLM service supporting Google Gemini API, OpenAI-compatible APIs,
    and a robust deterministic fallback when no API key is provided.
    """
    def __init__(self):
        self.gemini_key = settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")
        self.openai_key = settings.OPENAI_API_KEY or os.getenv("OPENAI_API_KEY", "")
        self.provider = settings.LLM_PROVIDER.lower()

    def has_api_key(self) -> bool:
        if self.gemini_key or self.openai_key:
            return True
        return False

    async def generate_response(
        self,
        prompt: str,
        system_instruction: str = "You are CareerPilot AI, an expert agentic career advisor.",
        fallback_response: str = ""
    ) -> str:
        # If Gemini key configured
        if self.gemini_key and (self.provider == "gemini" or not self.openai_key):
            try:
                async with httpx.AsyncClient(timeout=15.0) as client:
                    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
                    headers = {"x-goog-api-key": self.gemini_key}
                    payload = {
                        "contents": [
                            {"role": "user", "parts": [{"text": f"{system_instruction}\n\nUser Question:\n{prompt}"}]}
                        ]
                    }
                    res = await client.post(url, headers=headers, json=payload)
                    if res.status_code == 200:
                        data = res.json()
                        candidates = data.get("candidates", [])
                        if candidates:
                            text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                            if text:
                                return text
            except Exception as e:
                # Fall back gracefully to deterministic logic on network or quota issues
                pass

        # If OpenAI key configured
        if self.openai_key and (self.provider == "openai" or not self.gemini_key):
            try:
                async with httpx.AsyncClient(timeout=15.0) as client:
                    url = "https://api.openai.com/v1/chat/completions"
                    headers = {"Authorization": f"Bearer {self.openai_key}"}
                    payload = {
                        "model": "gpt-4o-mini",
                        "messages": [
                            {"role": "system", "content": system_instruction},
                            {"role": "user", "content": prompt}
                        ],
                        "temperature": 0.7
                    }
                    res = await client.post(url, headers=headers, json=payload)
                    if res.status_code == 200:
                        data = res.json()
                        content = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                        if content:
                            return content
            except Exception:
                pass

        # Robust deterministic fallback
        return fallback_response

llm_service = LLMService()
