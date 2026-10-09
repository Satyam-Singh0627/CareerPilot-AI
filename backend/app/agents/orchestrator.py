from typing import Dict, Any, List, Optional
from .base_agent import BaseAgent
from .career_analysis_agent import CareerAnalysisAgent
from .skill_gap_agent import SkillGapAgent
from .learning_planner_agent import LearningPlannerAgent
from .project_agent import ProjectRecommendationAgent
from .career_readiness_agent import CareerReadinessAgent
from ..ml.matcher import CareerMatcher
from .llm_service import llm_service

class OrchestratorAgent(BaseAgent):
    """
    Central coordinator orchestrating multi-agent workflow:
    - Coordinates Career Analysis, Skill Gap, Learning Planner, Project, and Readiness Agents.
    - Manages interactive multi-agent chat consultation sessions.
    """
    def __init__(self, matcher: CareerMatcher):
        super().__init__(
            name="Orchestrator Agent",
            role="Coordinates the agentic career workflow and routes student queries to specialist agents."
        )
        self.matcher = matcher
        self.career_agent = CareerAnalysisAgent(matcher)
        self.gap_agent = SkillGapAgent()
        self.planner_agent = LearningPlannerAgent()
        self.project_agent = ProjectRecommendationAgent()
        self.readiness_agent = CareerReadinessAgent()

    async def run_full_pipeline(
        self,
        profile: Dict[str, Any],
        target_career_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Execute the full multi-agent career advisory pipeline.
        """
        # Step 1: Career Analysis
        career_res = await self.career_agent.process({"profile": profile})
        top_recs = career_res["top_recommendations"]
        
        # Determine chosen career
        chosen_career = None
        if target_career_id:
            for rec in top_recs:
                if rec["career_id"] == target_career_id:
                    chosen_career = rec.get("career_details")
                    break
            if not chosen_career:
                chosen_career = self.matcher.get_career_by_id(target_career_id)

        if not chosen_career and top_recs:
            chosen_career = top_recs[0].get("career_details")
        if not chosen_career:
            all_careers = self.matcher.get_all_careers()
            chosen_career = all_careers[0] if all_careers else {}

        # Step 2: Skill Gap Analysis
        gap_res = await self.gap_agent.process({
            "profile": profile,
            "career": chosen_career
        })

        # Step 3: Learning Planner
        plan_res = await self.planner_agent.process({
            "profile": profile,
            "career": chosen_career,
            "skill_gap": gap_res
        })

        # Step 4: Project Recommendations
        proj_res = await self.project_agent.process({
            "profile": profile,
            "career": chosen_career,
            "skill_gap": gap_res
        })

        # Step 5: Career Readiness
        readiness_res = await self.readiness_agent.process({
            "profile": profile,
            "career": chosen_career,
            "skill_gap": gap_res,
            "progress": {}
        })

        # Step 6: Orchestrator synthesis summary
        orchestrator_summary = (
            f"Multi-Agent Evaluation Complete for **{profile.get('name', 'Student')}**:\n\n"
            f"1. **Career Match**: Highest alignment identified with **{chosen_career.get('title')}**.\n"
            f"2. **Gap Analysis**: Identified {len(gap_res.get('missing_core_skills', []))} core and "
            f"{len(gap_res.get('missing_supplementary_skills', []))} supplementary skill gaps.\n"
            f"3. **Adaptive Roadmap**: Tailored 12-week learning trajectory generated for {profile.get('weekly_hours_available', 15)} hours/week.\n"
            f"4. **Portfolio Strategy**: Curated {len(proj_res.get('suggested_projects', []))} portfolio projects to prove real competency.\n"
            f"5. **Readiness Score**: Current benchmark readiness is {readiness_res['readiness']['overall_readiness_score']}/100."
        )

        return {
            "top_recommendations": top_recs,
            "selected_career": chosen_career,
            "skill_gap": gap_res,
            "roadmap": plan_res,
            "projects": proj_res["suggested_projects"],
            "readiness": readiness_res["readiness"],
            "orchestrator_summary": orchestrator_summary
        }

    async def handle_chat_message(
        self,
        profile: Dict[str, Any],
        message: str,
        career_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Route conversational student queries to the most qualified agent.
        """
        msg_lower = message.lower()
        
        # Resolve current career context
        career = None
        if career_id:
            career = self.matcher.get_career_by_id(career_id)
        if not career:
            if profile:
                recs = self.matcher.match_student(profile)
                career = recs[0]["career_details"] if recs else self.matcher.get_all_careers()[0]
            else:
                career = self.matcher.get_all_careers()[0]

        # Agent Routing Logic
        active_agent = "Orchestrator Agent"
        routing_reason = "General consultation"

        if any(w in msg_lower for w in ["gap", "missing", "learn first", "prerequisite", "skills", "skill gap"]):
            active_agent = "Skill Gap Analysis Agent"
            routing_reason = "Diagnosing technical competencies & priority gaps"
        elif any(w in msg_lower for w in ["roadmap", "schedule", "week", "timeline", "hours", "how long", "study"]):
            active_agent = "Learning Planner Agent"
            routing_reason = "Formulating learning timeline & weekly pacing"
        elif any(w in msg_lower for w in ["project", "portfolio", "github", "resume", "build", "capstone"]):
            active_agent = "Project Recommendation Agent"
            routing_reason = "Advising on high-signal portfolio projects"
        elif any(w in msg_lower for w in ["ready", "internship", "interview", "hire", "employability", "sdg", "score"]):
            active_agent = "Career Readiness Agent"
            routing_reason = "Assessing employability readiness & interview standing"
        elif any(w in msg_lower for w in ["career", "role", "salary", "recommend", "options", "paths"]):
            active_agent = "Career Analysis Agent"
            routing_reason = "Analyzing career pathways and industry demand"

        # Deterministic Expert Fallback Responses
        fallback_replies = {
            "Skill Gap Analysis Agent": (
                f"Hello {profile.get('name', 'there')}! Looking at your target path for **{career.get('title')}**, "
                f"the most critical high-leverage skill to acquire right now is **{career.get('core_skills', ['Core Skill'])[0]}**. "
                f"Your existing skills in {', '.join(profile.get('current_skills', ['your foundational skills'])[:2])} give you a solid stepping stone. "
                f"I recommend prioritizing the top core prerequisites before exploring supplementary tools."
            ),
            "Learning Planner Agent": (
                f"Based on your commitment of {profile.get('weekly_hours_available', 15)} hours/week, you can complete the **{career.get('title')}** roadmap in 12 weeks. "
                f"In Weeks 1–4, focus on mastering the foundations with small hands-on scripts. Weeks 5–8 focus on systems integration, "
                f"and Weeks 9–12 will take you through deploying an end-to-end capstone."
            ),
            "Project Recommendation Agent": (
                f"For **{career.get('title')}**, recruiters care most about projects with verifiable production value. "
                f"I recommend building a **{career.get('project_ideas', [{}])[0].get('title', 'Target System')}** using "
                f"{', '.join(career.get('project_ideas', [{}])[0].get('tech_stack', ['modern tools']))}. "
                f"Make sure to include automated tests, a clear architectural diagram in your README, and deploy it live!"
            ),
            "Career Readiness Agent": (
                f"Your current readiness trajectory for **{career.get('title')}** is building solid foundation! "
                f"Under UN SDG 8 (Decent Work & Economic Growth), building verifiable skills and portfolio proof gives you "
                f"genuine employability leverage. To raise your score to the top tier, ship 1 complete deployed project and complete the weekly milestones."
            ),
            "Career Analysis Agent": (
                f"**{career.get('title')}** offers an average industry compensation of {career.get('avg_salary_usd')} with **{career.get('industry_demand')}** demand. "
                f"It operates within the {career.get('domain')} domain. Your background in {profile.get('field_of_study', 'Tech')} aligns very naturally with this track."
            ),
            "Orchestrator Agent": (
                f"Hello {profile.get('name', 'Student')}! I am your CareerPilot AI Orchestrator. "
                f"I can coordinate our specialized agents to help you analyze career fit, break down skill gaps, generate a 12-week study plan, or design portfolio projects. "
                f"What aspect of your career planning would you like to explore?"
            )
        }

        default_reply = fallback_replies.get(active_agent, fallback_replies["Orchestrator Agent"])

        reply_content = default_reply
        if llm_service.has_api_key():
            prompt = (
                f"You are the {active_agent} in the CareerPilot AI system.\n"
                f"Student Profile:\n"
                f"- Name: {profile.get('name')}\n"
                f"- Field: {profile.get('education_level')} in {profile.get('field_of_study')}\n"
                f"- Skills: {', '.join(profile.get('current_skills', []))}\n"
                f"- Target Career: {career.get('title')}\n"
                f"Student Message: '{message}'\n\n"
                f"Provide a helpful, direct, actionable, encouraging response in your persona. Keep it under 4 sentences."
            )
            llm_text = await llm_service.generate_response(
                prompt=prompt,
                system_instruction=f"You are the {active_agent}. Be actionable, technical, concise, and empowering.",
                fallback_response=default_reply
            )
            if llm_text:
                reply_content = llm_text.strip()

        suggestions = [
            f"What projects should I build for {career.get('title')}?",
            f"Break down my biggest skill gaps for {career.get('title')}",
            f"How do I pace my 12-week learning roadmap?",
            "What is my current career readiness score?"
        ]

        return {
            "reply": reply_content,
            "agent_name": active_agent,
            "routing_reason": routing_reason,
            "suggestions": suggestions,
            "timestamp": "Just now"
        }

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        return await self.run_full_pipeline(context.get("profile", {}), context.get("target_career_id"))
