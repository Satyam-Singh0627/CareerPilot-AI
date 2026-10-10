import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_check_endpoint():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert data["career_catalog_size"] >= 20
    assert len(data["agents"]) == 6

def test_careers_catalog_and_domains():
    res = client.get("/api/careers")
    assert res.status_code == 200
    careers = res.json()
    assert len(careers) >= 20

    res_domains = client.get("/api/careers/domains")
    assert res_domains.status_code == 200
    domains = res_domains.json()
    assert "Software Engineering" in domains or "Artificial Intelligence & Data" in domains

def test_demo_profile_endpoint():
    res = client.get("/api/profile/demo/sample")
    assert res.status_code == 200
    profile = res.json()
    assert profile["id"] == "demo-student"
    assert len(profile["current_skills"]) > 0

def test_recommendations_analysis_endpoint():
    payload = {
        "id": "demo-student",
        "name": "Alex Rivera",
        "field_of_study": "Computer Science",
        "education_level": "Undergraduate",
        "current_skills": ["Python", "SQL", "Pandas"],
        "target_roles": ["Data Scientist"],
        "interests": ["Data", "AI"],
        "experience_level": "beginner",
        "weekly_hours_available": 15
    }
    res = client.post("/api/recommendations/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "top_recommendations" in data
    assert "skill_gap" in data
    assert "readiness" in data
    assert "orchestrator_summary" in data

def test_chat_message_endpoint():
    payload = {
        "profile_id": "demo-student",
        "message": "What projects should I build to improve my portfolio?",
        "career_id": "ai-ml-engineer"
    }
    res = client.post("/api/chat/message", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "reply" in data
    assert "agent_name" in data
    assert "suggestions" in data

def test_progress_update_and_get():
    update_payload = {
        "profile_id": "demo-student",
        "career_id": "ai-ml-engineer",
        "completed_skills": ["Python", "Pandas"],
        "completed_milestones": [1, 2],
        "completed_projects": ["Predictive Customer Churn Engine"],
        "notes": ["Finished Week 1 and 2 foundations!"]
    }
    res = client.post("/api/progress/update", json=update_payload)
    assert res.status_code == 200
    data = res.json()
    assert "Python" in data["completed_skills"]
    assert "readiness" in data

def test_login_or_lookup_endpoint():
    # Login with new email
    payload = {"email": "test.student@university.edu", "name": "Test Student"}
    res = client.post("/api/profile/login", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["email"] == "test.student@university.edu"
    assert data["name"] == "Test Student"
    assert "id" in data

def test_profile_empty_name_validation():
    payload = {
        "name": "   ",
        "education_level": "Undergraduate",
        "field_of_study": "Computer Science"
    }
    res = client.post("/api/profile", json=payload)
    assert res.status_code == 400
    assert "Name cannot be blank" in res.json().get("detail", "")

def test_login_invalid_email_validation():
    # Empty email
    res_empty = client.post("/api/profile/login", json={"email": ""})
    assert res_empty.status_code == 400

    # Malformed email
    res_malformed = client.post("/api/profile/login", json={"email": "notanemail"})
    assert res_malformed.status_code == 400

def test_career_not_found_returns_404():
    res = client.get("/api/careers/non-existent-career-id-999")
    assert res.status_code == 404

def test_ai_chat_deterministic_fallback():
    # Message sent without external LLM keys returns structured agent advice
    payload = {
        "profile_id": "guest",
        "message": "How do I pace my 12-week study plan?",
        "career_id": "full-stack-engineer"
    }
    res = client.post("/api/chat/message", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert len(data["reply"]) > 20
    assert "suggestions" in data

def test_custom_exception_handler_structure():
    res = client.get("/api/careers/non-existent-career-id-999")
    assert res.status_code == 404
    data = res.json()
    assert data.get("status") == "error"
    assert data.get("code") == 404
    assert "not found" in data.get("message", "").lower()

def test_delete_profile_endpoint():
    # Create temporary profile
    created = client.post("/api/profile", json={"name": "Temp Delete Student"}).json()
    p_id = created["id"]
    
    # Delete profile
    del_res = client.delete(f"/api/profile/{p_id}")
    assert del_res.status_code == 200
    assert del_res.json()["status"] == "success"

    # Verify 404 on subsequent lookup
    get_res = client.get(f"/api/profile/{p_id}")
    assert get_res.status_code == 404

def test_export_profile_endpoint():
    res = client.get("/api/profile/demo-student/export")
    assert res.status_code == 200
    data = res.json()
    assert "profile" in data
    assert "export_metadata" in data
    assert data["profile"]["id"] == "demo-student"

def test_clear_chat_history_endpoint():
    # Send a message to ensure history exists
    client.post("/api/chat/message", json={
        "profile_id": "demo-student",
        "message": "Hello advisor"
    })
    
    del_res = client.delete("/api/chat/history/demo-student")
    assert del_res.status_code == 200
    assert del_res.json()["status"] == "success"

    hist_res = client.get("/api/chat/history/demo-student")
    assert hist_res.status_code == 200
    assert len(hist_res.json()) == 0

def test_cors_preflight_production_vercel_domain():
    res = client.options(
        "/api/profile/login",
        headers={
            "Origin": "https://career-pilot-ai-henna.vercel.app",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        }
    )
    assert res.status_code == 200
    assert res.headers.get("access-control-allow-origin") == "https://career-pilot-ai-henna.vercel.app"
    assert res.headers.get("access-control-allow-credentials") == "true"

def test_cors_preflight_preview_vercel_domain():
    res = client.options(
        "/api/profile/login",
        headers={
            "Origin": "https://career-pilot-ai-preview-test.vercel.app",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        }
    )
    assert res.status_code == 200
    assert res.headers.get("access-control-allow-origin") == "https://career-pilot-ai-preview-test.vercel.app"
    assert res.headers.get("access-control-allow-credentials") == "true"

def test_cors_preflight_disallowed_origin():
    res = client.options(
        "/api/profile/login",
        headers={
            "Origin": "https://unauthorized-domain.com",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        }
    )
    assert res.status_code == 400
    assert "Disallowed CORS origin" in res.text

def test_login_existing_user_retrieval():
    email = "returning.scholar@university.edu"
    first = client.post("/api/profile/login", json={"email": email, "name": "Returning Scholar"}).json()
    assert first["email"] == email
    first_id = first["id"]

    second = client.post("/api/profile/login", json={"email": email}).json()
    assert second["id"] == first_id
    assert second["name"] == "Returning Scholar"






