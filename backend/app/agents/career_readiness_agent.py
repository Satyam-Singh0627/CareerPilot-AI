from typing import Dict, Any, List
from .base_agent import BaseAgent

class CareerReadinessAgent(BaseAgent):
    """
    Agent responsible for evaluating student career preparedness,
    scoring readiness pillars, and synthesizing actionable advice aligned with SDG 8.
    """
    def __init__(self):
        super().__init__(
            name="Career Readiness Agent",
            role="Evaluates holistic employability readiness across technical skills, portfolio depth, and learning trajectory."
        )

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        profile = context.get("profile", {})
        career = context.get("career", {})
        skill_gap = context.get("skill_gap", {})
        progress = context.get("progress", {})

        matched_skills = skill_gap.get("matched_skills", [])
        missing_core = skill_gap.get("missing_core_skills", [])
        total_skills = len(matched_skills) + len(missing_core)
        
        # 1. Technical skills readiness (0 - 100)
        tech_readiness = (len(matched_skills) / max(total_skills, 1)) * 100.0
        
        # 2. Portfolio readiness: estimated by experience level and completed projects
        exp = profile.get("experience_level", "beginner").lower()
        base_portfolio = 35.0 if exp == "beginner" else (60.0 if exp == "intermediate" else 80.0)
        completed_projects = progress.get("completed_projects", [])
        portfolio_readiness = min(100.0, base_portfolio + (len(completed_projects) * 15.0))

        # 3. Learning pace readiness: based on weekly hours committed
        hours = profile.get("weekly_hours_available", 15)
        pace_readiness = min(100.0, (hours / 20.0) * 100.0)

        # Composite overall readiness
        overall_score = round(
            (tech_readiness * 0.50) +
            (portfolio_readiness * 0.30) +
            (pace_readiness * 0.20),
            1
        )

        if overall_score >= 75.0:
            status = "Strong Competitive Standing"
        elif overall_score >= 50.0:
            status = "Progressing Well — Focus on Targeted Gaps"
        else:
            status = "Early Developmental Stage"

        strengths = []
        if matched_skills:
            strengths.append(f"Demonstrated foundational proficiency in {', '.join(matched_skills[:3])}")
        if hours >= 15:
            strengths.append(f"Healthy dedicated learning availability ({hours} hrs/week) to accelerate growth")
        if profile.get("field_of_study"):
            strengths.append(f"Relevant academic foundation in {profile.get('field_of_study')}")

        action_items = []
        if missing_core:
            action_items.append(f"Prioritize closing the gap in high-impact skill: {missing_core[0]}")
        action_items.append("Complete and publish at least 1 production-style portfolio repository with live deployment")
        action_items.append("Track weekly progress consistently in the learning roadmap to build measurable momentum")

        sdg_note = (
            "Aligned with UN Sustainable Development Goal 8 (SDG 8: Decent Work & Economic Growth), "
            "this roadmap equips you with high-value technical competencies and verified portfolio deliverables, "
            "fostering sustainable career entry and economic mobility."
        )

        return {
            "readiness": {
                "overall_readiness_score": overall_score,
                "technical_skills_readiness": round(tech_readiness, 1),
                "portfolio_readiness": round(portfolio_readiness, 1),
                "learning_pace_readiness": round(pace_readiness, 1),
                "status": status,
                "strengths": strengths,
                "priority_action_items": action_items,
                "sdg_empowerment_note": sdg_note
            }
        }
