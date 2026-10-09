# Contributing to CareerPilot AI

Thank you for your interest in contributing to CareerPilot AI! We welcome contributions that improve student career guidance, multi-agent evaluation, and platform reliability.

## Getting Started

1. **Fork and Clone**
   ```bash
   git clone https://github.com/Satyam-Singh0627/CareerPilot-AI.git
   cd CareerPilot-AI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Linux/macOS:
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## Development Guidelines

- **Zero Hardcoded Secrets**: Never commit real API keys, credentials, or personal database files. All secrets belong in local `.env` files.
- **Testing**: Run pytest before opening a PR:
  ```bash
  python -m pytest backend/tests
  ```
- **Frontend Code Quality**: Ensure type-checking and linter pass cleanly:
  ```bash
  npm run build
  npm run lint
  ```
- **Commit Style**: Use conventional commit messages (`feat:`, `fix:`, `docs:`, `sec:`, `perf:`, `test:`).

## Code of Conduct

Please treat all community members with respect and maintain a supportive, inclusive environment.
