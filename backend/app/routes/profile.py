import uuid
import json
from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from ..schemas import StudentProfileCreate, StudentProfile
from ..database import get_db

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.post("", response_model=StudentProfile)
def create_or_update_profile(profile_in: StudentProfileCreate, profile_id: str = None):
    if not profile_in.name or not profile_in.name.strip():
        raise HTTPException(status_code=400, detail="Name cannot be blank")
    p_id = profile_id or str(uuid.uuid4())[:8]
    
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO profiles (
                id, name, email, education_level, field_of_study, graduation_year,
                current_skills, target_roles, interests, experience_level, bio,
                preferred_work_style, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(id) DO UPDATE SET
                name=excluded.name,
                email=excluded.email,
                education_level=excluded.education_level,
                field_of_study=excluded.field_of_study,
                graduation_year=excluded.graduation_year,
                current_skills=excluded.current_skills,
                target_roles=excluded.target_roles,
                interests=excluded.interests,
                experience_level=excluded.experience_level,
                bio=excluded.bio,
                preferred_work_style=excluded.preferred_work_style,
                updated_at=CURRENT_TIMESTAMP
        """, (
            p_id,
            profile_in.name,
            profile_in.email,
            profile_in.education_level,
            profile_in.field_of_study,
            profile_in.graduation_year,
            json.dumps(profile_in.current_skills),
            json.dumps(profile_in.target_roles),
            json.dumps(profile_in.interests),
            profile_in.experience_level,
            profile_in.bio,
            profile_in.preferred_work_style
        ))
        
        cursor.execute("SELECT * FROM profiles WHERE id = ?", (p_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=500, detail="Failed to persist profile")

    return StudentProfile(
        id=row["id"],
        name=row["name"],
        email=row["email"],
        education_level=row["education_level"],
        field_of_study=row["field_of_study"],
        graduation_year=row["graduation_year"],
        current_skills=json.loads(row["current_skills"] or "[]"),
        target_roles=json.loads(row["target_roles"] or "[]"),
        interests=json.loads(row["interests"] or "[]"),
        experience_level=row["experience_level"],
        bio=row["bio"],
        preferred_work_style=row["preferred_work_style"],
        weekly_hours_available=profile_in.weekly_hours_available,
        created_at=row.get("created_at"),
        updated_at=row.get("updated_at")
    )

@router.get("/{profile_id}", response_model=StudentProfile)
def get_profile(profile_id: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM profiles WHERE id = ?", (profile_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail=f"Profile '{profile_id}' not found")

    return StudentProfile(
        id=row["id"],
        name=row["name"],
        email=row["email"],
        education_level=row["education_level"],
        field_of_study=row["field_of_study"],
        graduation_year=row["graduation_year"],
        current_skills=json.loads(row["current_skills"] or "[]"),
        target_roles=json.loads(row["target_roles"] or "[]"),
        interests=json.loads(row["interests"] or "[]"),
        experience_level=row["experience_level"],
        bio=row["bio"],
        preferred_work_style=row["preferred_work_style"],
        weekly_hours_available=15,
        created_at=row.get("created_at"),
        updated_at=row.get("updated_at")
    )

@router.get("/demo/sample", response_model=StudentProfile)
def get_sample_demo_profile():
    demo_data = StudentProfileCreate(
        name="Alex Rivera",
        email="alex.rivera@university.edu",
        education_level="Undergraduate (Junior)",
        field_of_study="Computer Science & Data",
        graduation_year=2026,
        current_skills=["Python", "SQL", "Pandas", "Git", "JavaScript", "HTML5 & CSS3"],
        target_roles=["Data Scientist", "AI & Machine Learning Engineer", "Full Stack Web Developer"],
        interests=["Artificial Intelligence", "Predictive Analytics", "Cloud Technology", "Sustainable Tech"],
        experience_level="intermediate",
        bio="Junior CS undergraduate passionate about data science and building intelligent web applications. Looking for summer 2026 internships.",
        preferred_work_style="hybrid",
        weekly_hours_available=15
    )
    # Save or retrieve sample profile with fixed id 'demo-student'
    return create_or_update_profile(demo_data, profile_id="demo-student")

@router.post("/login", response_model=StudentProfile)
def login_or_lookup(payload: Dict[str, Any]):
    email = str(payload.get("email", "")).strip().lower()
    name = str(payload.get("name", "")).strip()
    if not email:
        raise HTTPException(status_code=400, detail="Email is required")
    if len(email) > 255:
        raise HTTPException(status_code=400, detail="Email address is too long")
    if "@" not in email or "." not in email:
        raise HTTPException(status_code=400, detail="Invalid email address format")
    
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM profiles WHERE LOWER(email) = ?", (email,))
        row = cursor.fetchone()
        if row:
            return StudentProfile(
                id=row["id"],
                name=row["name"],
                email=row["email"],
                education_level=row["education_level"],
                field_of_study=row["field_of_study"],
                graduation_year=row["graduation_year"],
                current_skills=json.loads(row["current_skills"] or "[]"),
                target_roles=json.loads(row["target_roles"] or "[]"),
                interests=json.loads(row["interests"] or "[]"),
                experience_level=row["experience_level"],
                bio=row["bio"] or "",
                preferred_work_style=row["preferred_work_style"],
                weekly_hours_available=15,
                created_at=row.get("created_at"),
                updated_at=row.get("updated_at")
            )
        
        # New user: generate profile
        new_id = str(uuid.uuid4())[:8]
        display_name = name if name else email.split("@")[0].replace(".", " ").title()
        cursor.execute("""
            INSERT INTO profiles (
                id, name, email, education_level, field_of_study, graduation_year,
                current_skills, target_roles, interests, experience_level, bio,
                preferred_work_style, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        """, (
            new_id, display_name, email, "Undergraduate", "Computer Science", 2027,
            "[]", "[]", "[]", "beginner", "", "hybrid"
        ))
        
        cursor.execute("SELECT * FROM profiles WHERE id = ?", (new_id,))
        new_row = cursor.fetchone()
        
    return StudentProfile(
        id=new_row["id"],
        name=new_row["name"],
        email=new_row["email"],
        education_level=new_row["education_level"],
        field_of_study=new_row["field_of_study"],
        graduation_year=new_row["graduation_year"],
        current_skills=[],
        target_roles=[],
        interests=[],
        experience_level="beginner",
        bio="",
        preferred_work_style="hybrid",
        weekly_hours_available=15,
        created_at=new_row.get("created_at"),
        updated_at=new_row.get("updated_at")
    )
