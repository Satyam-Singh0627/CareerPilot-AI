import json
import uuid
from fastapi import APIRouter, HTTPException, Query
from typing import Dict, Any, List, Optional
from ..database import get_db
from ..ml.matcher import CareerMatcher
from ..agents.orchestrator import OrchestratorAgent
from ..schemas import StudentProfileCreate

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])
matcher = CareerMatcher()
orchestrator = OrchestratorAgent(matcher)

@router.post("/analyze")
async def analyze_student_profile(
    profile_data: Dict[str, Any],
    target_career_id: Optional[str] = Query(None)
):
    """
    Run full multi-agent workflow:
    - Career Analysis Agent
    - Skill Gap Agent
    - Learning Planner Agent
    - Project Recommendation Agent
    - Career Readiness Agent
    """
    profile_id = profile_data.get("id") or "guest"
    
    # Run Orchestrator Pipeline
    result = await orchestrator.run_full_pipeline(profile_data, target_career_id)

    # Persist top recommendations to SQLite if profile has an ID
    if profile_id != "guest":
        with get_db() as conn:
            cursor = conn.cursor()
            for rec in result.get("top_recommendations", []):
                rec_id = str(uuid.uuid4())[:8]
                cursor.execute("""
                    INSERT INTO career_recommendations (
                        id, profile_id, career_id, title, domain, fit_score, breakdown, skill_gap
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    rec_id,
                    profile_id,
                    rec["career_id"],
                    rec["title"],
                    rec["domain"],
                    rec["fit_score"],
                    json.dumps(rec.get("breakdown", {})),
                    json.dumps({
                        "matched": rec.get("matched_skills", []),
                        "missing": rec.get("missing_skills", [])
                    })
                ))

    return result

@router.get("/profile/{profile_id}")
async def get_recommendations_for_profile(
    profile_id: str,
    target_career_id: Optional[str] = None
):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM profiles WHERE id = ?", (profile_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail=f"Profile '{profile_id}' not found")

    profile_dict = {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "education_level": row["education_level"],
        "field_of_study": row["field_of_study"],
        "graduation_year": row["graduation_year"],
        "current_skills": json.loads(row["current_skills"] or "[]"),
        "target_roles": json.loads(row["target_roles"] or "[]"),
        "interests": json.loads(row["interests"] or "[]"),
        "experience_level": row["experience_level"],
        "bio": row["bio"],
        "preferred_work_style": row["preferred_work_style"],
        "weekly_hours_available": 15
    }

    return await orchestrator.run_full_pipeline(profile_dict, target_career_id)
