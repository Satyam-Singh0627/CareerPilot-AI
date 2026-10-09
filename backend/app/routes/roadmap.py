import json
import uuid
from fastapi import APIRouter, HTTPException, Query
from typing import Dict, Any, Optional
from ..database import get_db
from ..ml.matcher import CareerMatcher
from ..agents.learning_planner_agent import LearningPlannerAgent
from ..agents.skill_gap_agent import SkillGapAgent

router = APIRouter(prefix="/roadmap", tags=["Roadmap"])
matcher = CareerMatcher()
planner_agent = LearningPlannerAgent()
gap_agent = SkillGapAgent()

@router.post("/generate")
async def generate_roadmap(payload: Dict[str, Any]):
    profile = payload.get("profile", {})
    career_id = payload.get("career_id")
    
    career = matcher.get_career_by_id(career_id) if career_id else None
    if not career:
        careers = matcher.get_all_careers()
        career = careers[0]

    gap_res = await gap_agent.process({"profile": profile, "career": career})
    plan_res = await planner_agent.process({
        "profile": profile,
        "career": career,
        "skill_gap": gap_res
    })

    profile_id = profile.get("id")
    roadmap_id = f"road-{career['id']}-{str(uuid.uuid4())[:6]}"

    if profile_id and profile_id != "guest":
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO roadmaps (
                    id, profile_id, career_id, title, total_weeks, milestones, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(id) DO UPDATE SET
                    milestones=excluded.milestones,
                    updated_at=CURRENT_TIMESTAMP
            """, (
                roadmap_id,
                profile_id,
                career["id"],
                career["title"],
                12,
                json.dumps(plan_res.get("milestones", []))
            ))

    plan_res["id"] = roadmap_id
    plan_res["profile_id"] = profile_id or "guest"
    return plan_res

@router.get("/{profile_id}/{career_id}")
async def get_roadmap(profile_id: str, career_id: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM roadmaps 
            WHERE profile_id = ? AND career_id = ?
            ORDER BY updated_at DESC LIMIT 1
        """, (profile_id, career_id))
        row = cursor.fetchone()

    if row:
        return {
            "id": row["id"],
            "profile_id": row["profile_id"],
            "career_id": row["career_id"],
            "career_title": row["title"],
            "total_weeks": row["total_weeks"],
            "milestones": json.loads(row["milestones"] or "[]"),
            "summary": f"Personalized 12-week roadmap for {row['title']}"
        }

    # If not yet persisted, generate on the fly
    career = matcher.get_career_by_id(career_id)
    if not career:
        raise HTTPException(status_code=404, detail="Career not found")

    # Fetch profile
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM profiles WHERE id = ?", (profile_id,))
        p_row = cursor.fetchone()

    profile_dict = {}
    if p_row:
        profile_dict = {
            "id": p_row["id"],
            "name": p_row["name"],
            "current_skills": json.loads(p_row["current_skills"] or "[]"),
            "weekly_hours_available": 15
        }

    gap_res = await gap_agent.process({"profile": profile_dict, "career": career})
    return await planner_agent.process({
        "profile": profile_dict,
        "career": career,
        "skill_gap": gap_res
    })
