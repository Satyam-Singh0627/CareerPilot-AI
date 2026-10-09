import uuid
import json
from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from ..schemas import ChatMessageRequest, ChatMessageResponse
from ..database import get_db
from ..ml.matcher import CareerMatcher
from ..agents.orchestrator import OrchestratorAgent

router = APIRouter(prefix="/chat", tags=["AI Advisor Chat"])
matcher = CareerMatcher()
orchestrator = OrchestratorAgent(matcher)

@router.post("/message")
async def chat_message(payload: Dict[str, Any]):
    profile_id = payload.get("profile_id", "guest")
    message = payload.get("message", "").strip()
    career_id = payload.get("career_id")

    if not message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    profile_dict = {}
    if profile_id != "guest":
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM profiles WHERE id = ?", (profile_id,))
            p_row = cursor.fetchone()
            if p_row:
                profile_dict = {
                    "id": p_row["id"],
                    "name": p_row["name"],
                    "education_level": p_row["education_level"],
                    "field_of_study": p_row["field_of_study"],
                    "current_skills": json.loads(p_row["current_skills"] or "[]"),
                    "target_roles": json.loads(p_row["target_roles"] or "[]"),
                    "interests": json.loads(p_row["interests"] or "[]"),
                    "weekly_hours_available": 15
                }

    if not profile_dict and "profile" in payload:
        profile_dict = payload["profile"]

    # Process message with multi-agent orchestrator
    res = await orchestrator.handle_chat_message(profile_dict, message, career_id)

    # Save to SQLite if valid profile
    if profile_id != "guest":
        with get_db() as conn:
            cursor = conn.cursor()
            # User message
            cursor.execute("""
                INSERT INTO chat_messages (id, profile_id, sender, agent_name, content, metadata)
                VALUES (?, ?, 'user', NULL, ?, ?)
            """, (str(uuid.uuid4())[:8], profile_id, message, json.dumps({"career_id": career_id})))

            # Agent response
            cursor.execute("""
                INSERT INTO chat_messages (id, profile_id, sender, agent_name, content, metadata)
                VALUES (?, ?, 'agent', ?, ?, ?)
            """, (str(uuid.uuid4())[:8], profile_id, res["agent_name"], res["reply"], json.dumps({"routing_reason": res.get("routing_reason")})))

    return res

@router.get("/history/{profile_id}")
def get_chat_history(profile_id: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM chat_messages 
            WHERE profile_id = ? 
            ORDER BY timestamp ASC
        """, (profile_id,))
        rows = cursor.fetchall()

    return rows
