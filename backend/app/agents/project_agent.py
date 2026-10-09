from typing import Dict, Any, List
from .base_agent import BaseAgent
from .llm_service import llm_service

class ProjectRecommendationAgent(BaseAgent):
    """
    Agent responsible for recommending strategic portfolio projects
    that prove competencies to recruiters and bridge resume gaps.
    """
    def __init__(self):
        super().__init__(
            name="Project Recommendation Agent",
            role="Selects and structures high-impact portfolio projects tailored to demonstrate target skills."
        )

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        career = context.get("career", {})
        skill_gap = context.get("skill_gap", {})
        profile = context.get("profile", {})

        raw_projects = career.get("project_ideas", [])
        missing_skills = skill_gap.get("missing_core_skills", []) + skill_gap.get("missing_supplementary_skills", [])
        
        curated_projects = []
        for p in raw_projects:
            # Map skills developed
            skills_targeted = [s for s in p.get("tech_stack", [])]
            curated_projects.append({
                "title": p.get("title"),
                "level": p.get("level", "Intermediate"),
                "description": p.get("description"),
                "tech_stack": p.get("tech_stack", []),
                "skills_developed": skills_targeted,
                "portfolio_value": (
                    f"Directly showcases hands-on proficiency in {', '.join(skills_targeted[:2])} "
                    f"and demonstrates end-to-end delivery for {career.get('title')} roles."
                ),
                "deliverable": p.get("deliverable", "Deployed application and open-source GitHub repository.")
            })

        # If career has fewer than 2 projects, provide an adaptive capstone project
        if len(curated_projects) < 2:
            curated_projects.append({
                "title": f"Full-Cycle {career.get('title')} Production Solution",
                "level": "Intermediate",
                "description": f"Build a practical system addressing a real-world workflow in {career.get('domain')}.",
                "tech_stack": career.get("core_skills", [])[:4],
                "skills_developed": career.get("core_skills", [])[:3],
                "portfolio_value": "Shows recruiters ability to take a feature from problem statement to monitored production.",
                "deliverable": "GitHub repo with CI/CD pipeline, documentation, and live demo link."
            })

        return {
            "suggested_projects": curated_projects,
            "portfolio_strategy_tip": (
                "For college students applying for internships, quality beats quantity: "
                "2 well-documented, deployed projects with clear architectural READMEs, automated tests, "
                "and live demos stand out over 10 trivial boilerplate clones."
            )
        }
