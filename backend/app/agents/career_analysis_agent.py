from typing import Dict, Any, List
from .base_agent import BaseAgent
from ..ml.matcher import CareerMatcher
from .llm_service import llm_service

class CareerAnalysisAgent(BaseAgent):
    """
    Agent responsible for matching student skills, background, and interests
    against current tech industry careers with explainable fit scores.
    """
    def __init__(self, matcher: CareerMatcher):
        super().__init__(
            name="Career Analysis Agent",
            role="Evaluates profile suitability across 22+ tech pathways using TF-IDF and weighted multi-factor matching."
        )
        self.matcher = matcher

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        profile = context.get("profile", {})
        recommendations = self.matcher.match_student(profile)
        
        # Take top matches (up to 8)
        top_matches = recommendations[:8]

        # Generate summary synthesis
        top_career = top_matches[0] if top_matches else None
        top_title = top_career["title"] if top_career else "General Technology"
        top_score = top_career["fit_score"] if top_career else 50.0

        default_summary = (
            f"Based on your skillset and academic focus in {profile.get('field_of_study', 'Technology')}, "
            f"your highest alignment is with **{top_title}** ({top_score}% fit). "
            f"You demonstrate notable transferable strengths in {', '.join(top_career.get('matched_skills', [])[:3]) if top_career else 'foundational computing'}."
        )

        analysis_summary = default_summary

        if llm_service.has_api_key():
            prompt = (
                f"Student Name: {profile.get('name')}\n"
                f"Education: {profile.get('education_level')} in {profile.get('field_of_study')}\n"
                f"Current Skills: {', '.join(profile.get('current_skills', []))}\n"
                f"Target Roles: {', '.join(profile.get('target_roles', []))}\n"
                f"Top Career Match: {top_title} with fit score {top_score}%\n"
                f"Write a crisp, motivating 2-sentence career analysis insight for this student."
            )
            llm_text = await llm_service.generate_response(
                prompt=prompt,
                system_instruction="You are a senior tech career analyst. Be supportive, concise, and realistic.",
                fallback_response=default_summary
            )
            if llm_text:
                analysis_summary = llm_text.strip()

        return {
            "top_recommendations": top_matches,
            "primary_career": top_career,
            "agent_summary": analysis_summary
        }
