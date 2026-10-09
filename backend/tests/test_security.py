from .security_scan import scan_repository

def test_no_hardcoded_secrets_in_repository():
    findings = scan_repository()
    assert findings == [], f"Found potential hardcoded secrets: {findings}"
