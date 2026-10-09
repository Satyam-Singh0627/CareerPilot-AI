from typing import Dict, Any, List
from .base_agent import BaseAgent
from ..ml.matcher import normalize_skill
from .llm_service import llm_service

# Resource database mapping common skills to reputable educational resources
RESOURCE_MAP = {
    "python": ["Python Official Docs & Tutorial", "CS50's Introduction to Programming with Python", "Automate the Boring Stuff with Python"],
    "machinelearning": ["Andrew Ng's Machine Learning Specialization (Coursera)", "Scikit-Learn User Guide & Tutorials", "Hands-On Machine Learning (Aurélien Géron)"],
    "deeplearning": ["DeepLearning.AI Specialization", "Fast.ai Practical Deep Learning for Coders", "PyTorch 60-Minute Blitz"],
    "pytorch": ["Official PyTorch Tutorials", "Deep Learning with PyTorch (Manning)", "Stanford CS230"],
    "tensorflow": ["TensorFlow Developer Certificate Guide", "Keras Core Documentation", "Google Cloud ML Foundations"],
    "sql": ["Mode Analytics SQL Tutorial", "SQLZoo Interactive Exercises", "PostgreSQL Tutorial & Documentation"],
    "react": ["React.dev Official Interactive Tutorial", "Full Stack Open (University of Helsinki)", "Epic React by Kent C. Dodds"],
    "typescript": ["TypeScript Handbook (Official)", "Matt Pocock's Total TypeScript", "ExecuteProgram TypeScript Track"],
    "javascript": ["JavaScript.info - The Modern JavaScript Tutorial", "MDN Web Docs JavaScript Guide", "Eloquent JavaScript"],
    "docker": ["Docker Official Getting Started Guide", "Play with Docker Interactive Labs", "Docker & Kubernetes: The Practical Guide"],
    "kubernetes": ["Kubernetes The Hard Way (Kelsey Hightower)", "Linux Foundation Introduction to Kubernetes", "KodeKloud CKA Labs"],
    "aws": ["AWS Cloud Practitioner Essentials", "AWS Skill Builder Free Hands-on Labs", "Adrian Cantrill AWS Associate Courses"],
    "fastapi": ["FastAPI Official Tutorial & User Guide (Tiangolo)", "Building REST APIs with FastAPI (TestDriven.io)", "Real Python FastAPI Guides"],
    "linux": ["OverTheWire Bandit Wargame", "The Linux Command Line (William Shotts)", "Linux Foundation Introduction to Linux"],
    "figma": ["Figma for Beginners (Official YouTube)", "Refactoring UI (Adam Wathan & Steve Schoger)", "Google UX Design Certificate"],
    "git": ["Git Immersion Guided Tour", "Pro Git Book (Free by Scott Chacon)", "GitHub Skills Interactive Modules"],
    "tableau": ["Tableau Free Training Videos", "Maven Analytics Tableau Desktop Course", "Makeover Monday Community Projects"],
    "powerbi": ["Microsoft Learn Power BI Data Analyst Path", "Guy in a Cube YouTube Channel", "SQLBI DAX Guide"],
    "solidity": ["CryptoZombies Interactive Solidity Tutorial", "Solidity Documentation", "Patrick Collins FreeCodeCamp Web3 Course"],
    "default": ["FreeCodeCamp Interactive Tracks", "Coursera Guided Projects", "Official Documentation & GitHub Examples"]
}

def get_resources_for_skill(skill: str) -> List[str]:
    norm = normalize_skill(skill)
    for key, res in RESOURCE_MAP.items():
        if key in norm or norm in key:
            return res
    return RESOURCE_MAP["default"]

class SkillGapAgent(BaseAgent):
    """
    Agent responsible for diagnosing missing technical competencies,
    categorizing priority, estimating acquisition timeframe, and mapping resources.
    """
    def __init__(self):
        super().__init__(
            name="Skill Gap Analysis Agent",
            role="Diagnoses competency gaps, prioritizes learning urgency, and maps curated educational resources."
        )

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        profile = context.get("profile", {})
        career = context.get("career", {})
        
        student_skills = profile.get("current_skills", [])
        norm_student_skills = {normalize_skill(s) for s in student_skills}
        
        core_skills = career.get("core_skills", [])
        supp_skills = career.get("supplementary_skills", [])

        matched_skills = []
        missing_core = []
        missing_supp = []

        for cs in core_skills:
            norm_cs = normalize_skill(cs)
            if any(norm_cs in nss or nss in norm_cs for nss in norm_student_skills):
                matched_skills.append(cs)
            else:
                missing_core.append(cs)

        for ss in supp_skills:
            norm_ss = normalize_skill(ss)
            if any(norm_ss in nss or nss in norm_ss for nss in norm_student_skills):
                matched_skills.append(ss)
            else:
                missing_supp.append(ss)

        total_req = len(core_skills) + len(supp_skills)
        match_pct = round((len(matched_skills) / max(total_req, 1)) * 100.0, 1)

        # Prioritized gaps
        prioritized_gaps = []
        
        # High priority: Core missing skills
        for cs in missing_core:
            prioritized_gaps.append({
                "skill": cs,
                "category": "core",
                "priority": "high",
                "learning_effort_weeks": 2 if len(prioritized_gaps) < 3 else 3,
                "recommended_resources": get_resources_for_skill(cs)
            })

        # Medium priority: Supplementary missing skills
        for ss in missing_supp:
            prioritized_gaps.append({
                "skill": ss,
                "category": "supplementary",
                "priority": "medium",
                "learning_effort_weeks": 1 if len(prioritized_gaps) < 6 else 2,
                "recommended_resources": get_resources_for_skill(ss)
            })

        gap_summary = (
            f"For the **{career.get('title', 'Target Role')}** track, you currently cover {match_pct}% "
            f"of industry-standard prerequisites. You have {len(missing_core)} high-priority core competencies "
            f"and {len(missing_supp)} supplementary competencies to acquire for competitive internship readiness."
        )

        return {
            "career_id": career.get("id", "target"),
            "career_title": career.get("title", "Target Role"),
            "matched_skills": matched_skills,
            "missing_core_skills": missing_core,
            "missing_supplementary_skills": missing_supp,
            "skill_match_percentage": match_pct,
            "gap_summary": gap_summary,
            "prioritized_gaps": prioritized_gaps
        }
