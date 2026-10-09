from fastapi.testclient import TestClient
from backend.app.main import app
from .security_scan import scan_repository

client = TestClient(app)

def test_no_hardcoded_secrets_in_repository():
    findings = scan_repository()
    assert findings == [], f"Found potential hardcoded secrets: {findings}"

def test_security_headers_present():
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.headers.get("X-Content-Type-Options") == "nosniff"
    assert res.headers.get("X-Frame-Options") == "DENY"
    assert res.headers.get("X-XSS-Protection") == "1; mode=block"
    assert res.headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"
    assert "geolocation=()" in res.headers.get("Permissions-Policy", "")
def test_rate_limiter_allows_normal_traffic():
    for _ in range(5):
        res = client.get("/api/health")
        assert res.status_code == 200
