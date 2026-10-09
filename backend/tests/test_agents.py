import asyncio
from backend.app.ml.matcher import CareerMatcher
from backend.app.agents.career_analysis_agent import CareerAnalysisAgent
from backend.app.agents.skill_gap_agent import SkillGapAgent
from backend.app.agents.learning_planner_agent import LearningPlannerAgent
from backend.app.agents.project_agent import ProjectRecommendationAgent
from backend.app.agents.career_readiness_agent import CareerReadinessAgent
from backend.app.agents.orchestrator import OrchestratorAgent

def test_all_cooperating_agents_pipeline():
    async def _run():
        matcher = CareerMatcher()
        sample_profile = {
            "name": "Alex",
            "education_level": "Undergraduate",
            "field_of_study": "Software Engineering",
            "current_skills": ["Python", "SQL", "Git", "HTML5 & CSS3"],
            "target_roles": ["Full Stack Web Developer"],
            "interests": ["Web Apps", "Cloud"],
            "experience_level": "beginner",
            "weekly_hours_available": 15
        }

        # 1. Career Analysis Agent
        analysis_agent = CareerAnalysisAgent(matcher)
        analysis_res = await analysis_agent.process({"profile": sample_profile})
        assert len(analysis_res["top_recommendations"]) > 0
        top_career = analysis_res["primary_career"]["career_details"]

        # 2. Skill Gap Agent
        gap_agent = SkillGapAgent()
        gap_res = await gap_agent.process({"profile": sample_profile, "career": top_career})
        assert "missing_core_skills" in gap_res
        assert "prioritized_gaps" in gap_res
        assert 0.0 <= gap_res["skill_match_percentage"] <= 100.0

        # 3. Learning Planner Agent
        planner_agent = LearningPlannerAgent()
        planner_res = await planner_agent.process({
            "profile": sample_profile,
            "career": top_career,
            "skill_gap": gap_res
        })
        assert planner_res["total_weeks"] == 12
        assert len(planner_res["milestones"]) == 12

        # 4. Project Recommendation Agent
        project_agent = ProjectRecommendationAgent()
        proj_res = await project_agent.process({
            "profile": sample_profile,
            "career": top_career,
            "skill_gap": gap_res
        })
        assert len(proj_res["suggested_projects"]) >= 1

        # 5. Career Readiness Agent
        readiness_agent = CareerReadinessAgent()
        ready_res = await readiness_agent.process({
            "profile": sample_profile,
            "career": top_career,
            "skill_gap": gap_res,
            "progress": {}
        })
        readiness = ready_res["readiness"]
        assert 0.0 <= readiness["overall_readiness_score"] <= 100.0
        assert "sdg_empowerment_note" in readiness
        assert "SDG 8" in readiness["sdg_empowerment_note"]

        # 6. Orchestrator Agent
        orchestrator = OrchestratorAgent(matcher)
        pipeline_res = await orchestrator.run_full_pipeline(sample_profile)
        assert "top_recommendations" in pipeline_res
        assert "orchestrator_summary" in pipeline_res

        # Chat routing
        chat_res = await orchestrator.handle_chat_message(
            sample_profile,
            "What are my main skill gaps?",
            top_career["id"]
        )
        assert "Skill Gap" in chat_res["agent_name"]
        assert len(chat_res["reply"]) > 0

    asyncio.run(_run())
