import json
import uuid
from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List, Optional
from ..database import get_db
from ..ml.matcher import CareerMatcher
from ..agents.career_readiness_agent import CareerReadinessAgent
from ..agents.skill_gap_agent import SkillGapAgent

router = APIRouter(prefix="/progress", tags=["Progress & Employability"])
matcher = CareerMatcher()
readiness_agent = CareerReadinessAgent()
gap_agent = SkillGapAgent()

@router.get("/{profile_id}/{career_id}")
async def get_progress(profile_id: str, career_id: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM progress 
            WHERE profile_id = ? AND career_id = ?
        """, (profile_id, career_id))
        row = cursor.fetchone()

        cursor.execute("SELECT * FROM profiles WHERE id = ?", (profile_id,))
        p_row = cursor.fetchone()

    career = matcher.get_career_by_id(career_id)
    if not career:
        career = matcher.get_all_careers()[0]

    profile_dict = {}
    if p_row:
        profile_dict = {
            "id": p_row["id"],
            "name": p_row["name"],
            "education_level": p_row["education_level"],
            "field_of_study": p_row["field_of_study"],
            "current_skills": json.loads(p_row["current_skills"] or "[]"),
            "experience_level": p_row["experience_level"],
            "weekly_hours_available": 15
        }

    completed_skills = json.loads(row["completed_skills"]) if (row and row.get("completed_skills")) else []
    completed_milestones = json.loads(row["completed_milestones"]) if (row and row.get("completed_milestones")) else []
    completed_projects = json.loads(row["completed_projects"]) if (row and row.get("completed_projects")) else []
    notes = json.loads(row["notes"]) if (row and row.get("notes")) else []

    # Re-evaluate readiness
    combined_skills = list(set(profile_dict.get("current_skills", []) + completed_skills))
    eval_profile = {**profile_dict, "current_skills": combined_skills}
    gap_res = await gap_agent.process({"profile": eval_profile, "career": career})
    
    readiness_res = await readiness_agent.process({
        "profile": eval_profile,
        "career": career,
        "skill_gap": gap_res,
        "progress": {"completed_projects": completed_projects}
    })

    return {
        "profile_id": profile_id,
        "career_id": career_id,
        "career_title": career.get("title"),
        "completed_skills": completed_skills,
        "completed_milestones": completed_milestones,
        "completed_projects": completed_projects,
        "notes": notes,
        "readiness": readiness_res["readiness"]
    }

@router.post("/update")
async def update_progress(payload: Dict[str, Any]):
    profile_id = payload.get("profile_id", "guest")
    career_id = payload.get("career_id", "ai-ml-engineer")
    completed_skills = payload.get("completed_skills", [])
    completed_milestones = payload.get("completed_milestones", [])
    completed_projects = payload.get("completed_projects", [])
    notes = payload.get("notes", [])

    prog_id = f"prog-{profile_id}-{career_id}"

    if profile_id != "guest":
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO progress (
                    id, profile_id, career_id, completed_skills,
                    completed_milestones, completed_projects, notes, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(id) DO UPDATE SET
                    completed_skills=excluded.completed_skills,
                    completed_milestones=excluded.completed_milestones,
                    completed_projects=excluded.completed_projects,
                    notes=excluded.notes,
                    updated_at=CURRENT_TIMESTAMP
            """, (
                prog_id,
                profile_id,
                career_id,
                json.dumps(completed_skills),
                json.dumps(completed_milestones),
                json.dumps(completed_projects),
                json.dumps(notes)
            ))

    return await get_progress(profile_id, career_id)
