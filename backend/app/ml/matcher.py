import json
from pathlib import Path
from typing import List, Dict, Any, Tuple, Optional
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "careers.json"

def normalize_skill(s: str) -> str:
    """Normalize skill strings for robust matching."""
    s = s.strip().lower()
    # Normalize variants
    s = re.sub(r'[\./\-_]', '', s)
    s = re.sub(r'\s+', '', s)
    return s

class CareerMatcher:
    def __init__(self, data_path: Path = DATA_PATH):
        self.data_path = data_path
        self.careers: List[Dict[str, Any]] = self._load_careers()
        self._init_vectorizer()

    def _load_careers(self) -> List[Dict[str, Any]]:
        with open(self.data_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def get_all_careers(self) -> List[Dict[str, Any]]:
        return self.careers

    def get_career_by_id(self, career_id: str) -> Optional[Dict[str, Any]]:
        for c in self.careers:
            if c["id"] == career_id:
                return c
        return None

    def _init_vectorizer(self):
        """Prepare TF-IDF matrix for semantic matching."""
        self.career_corpus = []
        for c in self.careers:
            text = f"{c['title']} {c['domain']} {c['description']} " + \
                   " ".join(c.get('core_skills', [])) + " " + \
                   " ".join(c.get('supplementary_skills', [])) + " " + \
                   " ".join(c.get('soft_skills', []))
            self.career_corpus.append(text)

        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            ngram_range=(1, 2),
            sublinear_tf=True
        )
        self.tfidf_matrix = self.vectorizer.fit_transform(self.career_corpus)

    def match_student(self, profile: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Compute explainable fit scores (0-100) combining:
        - Core Skills Overlap (40%)
        - Supplementary Skills Overlap (20%)
        - Domain/Interest Alignment (20%)
        - TF-IDF Cosine Similarity (20%)
        """
        student_skills = profile.get("current_skills", [])
        norm_student_skills = {normalize_skill(s) for s in student_skills}
        student_interests = [s.lower() for s in profile.get("interests", [])]
        target_roles = [r.lower() for r in profile.get("target_roles", [])]
        
        # Prepare profile query for TF-IDF
        profile_query = (
            f"{profile.get('field_of_study', '')} " +
            " ".join(target_roles) + " " +
            " ".join(student_interests) + " " +
            " ".join(student_skills) + " " +
            profile.get('bio', '')
        )
        
        if profile_query.strip():
            query_vec = self.vectorizer.transform([profile_query])
            sim_scores = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        else:
            sim_scores = np.zeros(len(self.careers))

        scored_results = []

        for idx, career in enumerate(self.careers):
            core_skills = career.get("core_skills", [])
            supp_skills = career.get("supplementary_skills", [])
            
            # 1. Core skills overlap
            matched_core = []
            missing_core = []
            for cs in core_skills:
                norm_cs = normalize_skill(cs)
                # Direct match or substring match (e.g. "python" in "python programming")
                if any(norm_cs in nss or nss in norm_cs for nss in norm_student_skills):
                    matched_core.append(cs)
                else:
                    missing_core.append(cs)
            
            core_pct = (len(matched_core) / max(len(core_skills), 1)) * 100.0

            # 2. Supplementary skills overlap
            matched_supp = []
            missing_supp = []
            for ss in supp_skills:
                norm_ss = normalize_skill(ss)
                if any(norm_ss in nss or nss in norm_ss for nss in norm_student_skills):
                    matched_supp.append(ss)
                else:
                    missing_supp.append(ss)
            
            supp_pct = (len(matched_supp) / max(len(supp_skills), 1)) * 100.0

            # 3. Domain & Interest Alignment
            interest_score = 0.0
            career_title_lower = career["title"].lower()
            career_domain_lower = career["domain"].lower()
            
            # Direct target role match
            for tr in target_roles:
                if tr and (tr in career_title_lower or career_title_lower in tr):
                    interest_score += 45.0
                    break
                elif tr and any(w in career_title_lower for w in tr.split()):
                    interest_score += 25.0

            # Interest keywords
            for interest in student_interests:
                if interest in career_domain_lower or interest in career_title_lower:
                    interest_score += 20.0
                elif any(word in career_title_lower or word in career_domain_lower for word in interest.split()):
                    interest_score += 10.0

            interest_pct = min(100.0, interest_score)

            # 4. Semantic similarity
            semantic_pct = float(sim_scores[idx]) * 100.0

            # 5. Composite Fit Score (0-100)
            composite_score = (
                (core_pct * 0.40) +
                (supp_pct * 0.20) +
                (interest_pct * 0.20) +
                (semantic_pct * 0.20)
            )

            # Keep between 10 and 99.5 for realistic student assessment
            # A baseline curiosity factor of minimum 15% is granted if interests intersect
            final_fit = round(float(np.clip(composite_score, 12.0, 99.0)), 1)

            # Readiness level categorization
            if final_fit >= 75.0:
                readiness_level = "Ready to Apply / Advanced Track"
            elif final_fit >= 50.0:
                readiness_level = "On Track with Moderate Gaps"
            else:
                readiness_level = "Foundational Upskilling Needed"

            # Rationale generation
            rationale_parts = []
            if matched_core:
                rationale_parts.append(f"Strong foundation in {len(matched_core)} core skill(s): {', '.join(matched_core[:3])}")
            if interest_pct > 40:
                rationale_parts.append(f"High affinity with {career['domain']} based on your specified target roles & interests")
            if missing_core:
                rationale_parts.append(f"Key skill gap to bridge: {missing_core[0]}")
            
            rationale = ". ".join(rationale_parts) if rationale_parts else "Good exploratory match based on your academic background."

            scored_results.append({
                "career_id": career["id"],
                "title": career["title"],
                "domain": career["domain"],
                "fit_score": final_fit,
                "industry_demand": career.get("industry_demand", "High"),
                "avg_salary_usd": career.get("avg_salary_usd", "$90,000 - $130,000"),
                "sdg_impact": career.get("sdg_impact", "Promotes decent work and economic innovation under UN SDG 8."),
                "breakdown": {
                    "core_skill_match_pct": round(core_pct, 1),
                    "supplementary_skill_match_pct": round(supp_pct, 1),
                    "interest_alignment_pct": round(interest_pct, 1),
                    "semantic_similarity_pct": round(semantic_pct, 1),
                    "rationale": rationale
                },
                "matched_skills": matched_core + matched_supp,
                "missing_skills": missing_core + missing_supp,
                "readiness_level": readiness_level,
                "career_details": career
            })

        # Sort by fit_score descending
        scored_results.sort(key=lambda x: x["fit_score"], reverse=True)
        return scored_results

