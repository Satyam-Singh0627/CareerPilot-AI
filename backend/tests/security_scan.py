import os
import re

PATTERNS = {
    'Google API Key': r'AIza[0-9A-Za-z\-_]{35}',
    'OpenAI API Key': r'sk-[a-zA-Z0-9]{20,}',
    'GitHub Token': r'(?:ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9]{36}',
    'GitHub PAT': r'github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}',
    'AWS Access Key': r'(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}',
    'Private Key': r'-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----',
    'Slack Token': r'xox[baprs]-[0-9a-zA-Z]{10,48}',
    'Stripe Live Key': r'(?:sk|rk)_live_[0-9a-zA-Z]{24}',
    'Hardcoded Secret': r'(?i)(?:password|passwd|secret|api_key|apikey)\s*=\s*[\'"][^\'\"\n]{8,}[\'"]',
    'Database URI With Credentials': r'(?:postgres|postgresql|mysql|mongodb\+srv|mongodb):\/\/[a-zA-Z0-9_\-\.]+:[^\/\s@]+@',
}

IGNORE_DIRS = {'.git', 'venv', 'node_modules', '__pycache__', '.pytest_cache', 'dist'}
IGNORE_EXTS = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.db', '.sqlite'}

def scan_repository():
    findings = []
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in IGNORE_EXTS:
                continue
            filepath = os.path.join(root, f)
            rel_path = os.path.relpath(filepath, root_dir)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as fp:
                    lines = fp.readlines()
                    for line_num, line in enumerate(lines, 1):
                        for name, pat in PATTERNS.items():
                            for match in re.finditer(pat, line):
                                matched_text = match.group(0)
                                lower = matched_text.lower()
                                if any(safe in lower for safe in ['placeholder', 'example', 'dummy', 'your_', 'test', '<', '>', 'deterministic', 'gemini-1.5']):
                                    continue
                                findings.append({
                                    'type': name,
                                    'file': rel_path,
                                    'line': line_num,
                                    'snippet': matched_text[:8] + '***'
                                })
            except Exception:
                pass
    return findings

if __name__ == '__main__':
    results = scan_repository()
    if results:
        print(f"FAILED: Found {len(results)} potential secrets:")
        for r in results:
            print(f"  [{r['type']}] {r['file']}:{r['line']} -> {r['snippet']}")
    else:
        print("PASSED: 0 secrets detected across repository files.")
