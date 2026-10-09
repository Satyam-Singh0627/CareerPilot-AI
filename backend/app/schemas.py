from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field

class StudentProfileCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Student's full name")
    email: Optional[str] = Field(None, max_length=255, description="Email address")
    education_level: str = Field("Undergraduate", max_length=100, description="Degree level (e.g. Undergraduate, Masters, High School, Self-taught)")
    field_of_study: str = Field("Computer Science", max_length=100, description="Major or primary discipline")
    graduation_year: int = Field(2027, ge=2000, le=2100, description="Target graduation year")
    current_skills: List[str] = Field(default_factory=list, max_length=100, description="Skills student currently possesses")
    target_roles: List[str] = Field(default_factory=list, max_length=50, description="Roles student is curious about")
    interests: List[str] = Field(default_factory=list, max_length=50, description="Topics and industry interests")
    experience_level: str = Field("beginner", max_length=50, description="beginner, intermediate, or advanced")
    bio: Optional[str] = Field("", max_length=2000, description="Short background summary")
    preferred_work_style: str = Field("hybrid", max_length=50, description="remote, hybrid, or onsite")
    weekly_hours_available: int = Field(15, ge=1, le=168, description="Weekly hours dedicated to upskilling")

class StudentProfile(StudentProfileCreate):
    id: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class SkillGapDetail(BaseModel):
    skill: str
    category: str # "core", "supplementary", "soft"
    priority: str # "high", "medium", "low"
    learning_effort_weeks: int
    recommended_resources: List[str]

class SkillGapReport(BaseModel):
    career_id: str
    career_title: str
    matched_skills: List[str]
    missing_core_skills: List[str]
    missing_supplementary_skills: List[str]
    skill_match_percentage: float
    gap_summary: str
    prioritized_gaps: List[SkillGapDetail]

class ScoreBreakdown(BaseModel):
    core_skill_match_pct: float
    supplementary_skill_match_pct: float
    interest_alignment_pct: float
    semantic_similarity_pct: float
    rationale: str

class CareerRecommendation(BaseModel):
    career_id: str
    title: str
    domain: str
    fit_score: float # 0 - 100
    industry_demand: str
    avg_salary_usd: str
    sdg_impact: str
    breakdown: ScoreBreakdown
    matched_skills: List[str]
    missing_skills: List[str]
    readiness_level: str # "Ready to Apply", "On Track with Minor Gaps", "Foundational Upskilling Needed"

class RoadmapMilestone(BaseModel):
    week: int
    title: str
    focus_skills: List[str]
    learning_objectives: List[str]
    recommended_activities: List[str]
    estimated_hours: int
    completed: bool = False

class LearningRoadmap(BaseModel):
    id: str
    profile_id: str
    career_id: str
    career_title: str
    total_weeks: int
    milestones: List[RoadmapMilestone]
    summary: str

class ProjectRecommendation(BaseModel):
    title: str
    level: str # "Beginner", "Intermediate", "Advanced"
    description: str
    tech_stack: List[str]
    skills_developed: List[str]
    portfolio_value: str
    deliverable: str

class ReadinessReport(BaseModel):
    overall_readiness_score: float # 0 - 100
    technical_skills_readiness: float
    portfolio_readiness: float
    learning_pace_readiness: float
    status: str
    strengths: List[str]
    priority_action_items: List[str]
    sdg_empowerment_note: str

class MultiAgentAnalysisResponse(BaseModel):
    profile: StudentProfile
    top_recommendations: List[CareerRecommendation]
    selected_career_gap: SkillGapReport
    suggested_projects: List[ProjectRecommendation]
    readiness: ReadinessReport
    orchestrator_summary: str

class ChatMessageRequest(BaseModel):
    profile_id: str
    message: str
    career_id: Optional[str] = None

class ChatMessageResponse(BaseModel):
    reply: str
    agent_name: str
    suggestions: List[str]
    timestamp: str

class ProgressUpdateRequest(BaseModel):
    profile_id: str
    career_id: str
    completed_skills: Optional[List[str]] = None
    completed_milestones: Optional[List[int]] = None
    completed_projects: Optional[List[str]] = None
    notes: Optional[List[str]] = None
