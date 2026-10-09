# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The CareerPilot AI project takes application security and student data privacy seriously.

If you believe you have discovered a vulnerability, security flaw, or exposed credential:

1. **Do not disclose the issue publicly** in GitHub Issues, pull requests, or discussions.
2. Please report the issue privately by sending an email with details, reproduction steps, and impact assessment to:
   **singhsatyam6000@gmail.com**
3. Include:
   - A description of the issue and affected components.
   - Exact steps or minimal payload required to reproduce the behavior.
   - Any suggested mitigations.

## Security Practices

* **No Credentials in Git**: Real API keys, tokens, certificates, and private database files must never be committed. All local configurations are loaded via `.env` files protected by `.gitignore`.
* **Safe Fallbacks**: The core application functions 100% deterministically without external LLM API keys.
* **Database Isolation**: Student data is kept local and isolated, with full data export and deletion endpoints provided for privacy compliance.
* **HTTP Protection**: The API enforces HTTP security headers, CORS boundaries, rate limiting, and parameter binding for all SQLite queries.
