import pytest
from backend.app.ml.matcher import CareerMatcher, normalize_skill

def test_career_catalog_contains_at_least_20_careers():
    matcher = CareerMatcher()
    careers = matcher.get_all_careers()
    assert len(careers) >= 20, f"Expected at least 20 careers, got {len(careers)}"

def test_career_has_required_attributes():
    matcher = CareerMatcher()
    careers = matcher.get_all_careers()
    for c in careers:
        assert "id" in c
        assert "title" in c
        assert "domain" in c
        assert "core_skills" in c and len(c["core_skills"]) > 0
        assert "supplementary_skills" in c
        assert "learning_topics" in c and len(c["learning_topics"]) >= 10
        assert "project_ideas" in c and len(c["project_ideas"]) >= 1

def test_normalize_skill():
    assert normalize_skill("  React.js  ") == "reactjs"
    assert normalize_skill("Node-JS") == "nodejs"
    assert normalize_skill("C++") == "c++"
    assert normalize_skill("Machine Learning") == "machinelearning"

def test_matching_logic_produces_explainable_scores():
    matcher = CareerMatcher()
    student_profile = {
        "name": "Jane Doe",
        "field_of_study": "Computer Science",
        "current_skills": ["Python", "Machine Learning", "Scikit-Learn", "Git"],
        "target_roles": ["AI & Machine Learning Engineer"],
        "interests": ["Artificial Intelligence", "Deep Learning"],
        "experience_level": "intermediate"
    }

    results = matcher.match_student(student_profile)
    assert len(results) > 0
    top = results[0]
    
    # Check bounds
    assert 0.0 <= top["fit_score"] <= 100.0
    assert "breakdown" in top
    bd = top["breakdown"]
    assert "core_skill_match_pct" in bd
    assert "interest_alignment_pct" in bd
    assert "semantic_similarity_pct" in bd
    assert "rationale" in bd
    assert len(top["matched_skills"]) > 0
    # Top match for AI skills should be AI/ML Engineer or Data Scientist
    assert "AI" in top["title"] or "Data" in top["title"] or "Machine" in top["title"]
