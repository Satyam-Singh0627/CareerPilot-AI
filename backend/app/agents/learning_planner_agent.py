from typing import Dict, Any, List
from .base_agent import BaseAgent
from .llm_service import llm_service

class LearningPlannerAgent(BaseAgent):
    """
    Agent responsible for generating a tailored, structured weekly learning roadmap
    adapted to student schedule, gaps, and targets.
    """
    def __init__(self):
        super().__init__(
            name="Learning Planner Agent",
            role="Constructs personalized 12-week progressive milestone roadmaps."
        )

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        profile = context.get("profile", {})
        career = context.get("career", {})
        skill_gap = context.get("skill_gap", {})

        weekly_hours = profile.get("weekly_hours_available", 15)
        career_topics = career.get("learning_topics", [])
        missing_core = skill_gap.get("missing_core_skills", [])
        matched_skills = skill_gap.get("matched_skills", [])

        milestones = []
        for w in range(1, 13):
            # Find template topic for this week if available
            topic_obj = next((t for t in career_topics if t.get("week") == w), None)
            topic_title = topic_obj.get("topic") if topic_obj else f"Advanced Modules in {career.get('title')}"
            
            # Select focus skills relevant to this phase
            if w <= 4:
                phase = "Foundations & Core Prerequisites"
                focus = missing_core[:2] if missing_core else ["Foundations Review", "Development Environment"]
                activities = [
                    f"Dedicate {weekly_hours // 2} hours to theory & interactive documentation tutorials.",
                    "Build 2 small command-line or interface proof-of-concept scripts.",
                    "Establish GitHub version control repository with daily commits."
                ]
            elif w <= 8:
                phase = "Application & Intermediate Frameworks"
                focus = missing_core[2:4] if len(missing_core) > 2 else ["Architecture Patterns", "Integration Testing"]
                activities = [
                    "Complete a functional module integrating database and API endpoints.",
                    "Review open-source codebases for idiomatic patterns.",
                    "Implement automated testing for key logic."
                ]
            else:
                phase = "Production Readiness, Portfolio Capstone & Polish"
                focus = ["System Optimization", "Documentation", "Deployment"]
                activities = [
                    "Package capstone project with Docker and deploy to live cloud URL.",
                    "Author comprehensive README with architectural diagrams and video demo.",
                    "Conduct peer review or mock technical interview walkthrough."
                ]

            milestones.append({
                "week": w,
                "title": f"Week {w}: {topic_title}",
                "focus_skills": focus,
                "learning_objectives": [
                    f"Master key theoretical concepts of {topic_title.split(':')[0]}",
                    f"Apply practical implementations adhering to industry standards",
                    f"Complete milestone coding exercise with clean documentation"
                ],
                "recommended_activities": activities,
                "estimated_hours": weekly_hours,
                "completed": False
            })

        summary = (
            f"12-Week Adaptive Curriculum for **{career.get('title')}**, designed for {weekly_hours} hours/week. "
            f"Phase 1 (Weeks 1-4) bridges foundational core gaps; Phase 2 (Weeks 5-8) develops intermediate production competence; "
            f"Phase 3 (Weeks 9-12) finalizes a standout portfolio capstone."
        )

        return {
            "career_id": career.get("id", "target"),
            "career_title": career.get("title", "Target Role"),
            "total_weeks": 12,
            "milestones": milestones,
            "summary": summary
        }
