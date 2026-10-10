# CareerPilot AI — Agentic AI Career Advisor
> **Internship Final Project**  
> **SDG Alignment:** UN Sustainable Development Goal 8 (Decent Work and Economic Growth — Target 8.6 & 8.2)

---

## 🌟 Executive Summary
**CareerPilot AI** is an agentic, full-stack web application designed for university students and early-career jobseekers. It solves the widespread problem of ambiguous career discovery by combining **transparent, explainable AI matching (0–100 fit scores)**, **precision skill-gap diagnostics**, **personalized 12-week learning roadmaps**, and **recruiter-ready portfolio project suggestions**.

The system features an autonomous **6-agent cooperative architecture** that runs 100% locally with deterministic fallback algorithms (scikit-learn TF-IDF + weighted domain matching) and offers optional live generative AI synthesis through Google Gemini or OpenAI when an API key is configured.

---

## 🎯 UN SDG 8: Decent Work and Economic Growth
This project directly addresses **SDG 8**:
- **Target 8.6:** Substantially reduce the proportion of youth not in employment, education or training (NEET) by giving students measurable, step-by-step upskilling pathways.
- **Target 8.2:** Achieve higher levels of economic productivity through technological upgrading and innovation, directing talent toward high-impact tech fields (AI/ML, Cloud, Cybersecurity, Data, and Software Engineering).

---

## 🤖 Cooperating Multi-Agent Architecture

```
                                  ┌────────────────────────┐
                                  │   Student Onboarding   │
                                  └───────────┬────────────┘
                                              │ Profile Data
                                              ▼
                                 ┌─────────────────────────┐
                                 │   Orchestrator Agent    │
                                 └───────┬───┬───┬───┬─────┘
                                         │   │   │   │
                  ┌──────────────────────┘   │   │   └──────────────────────┐
                  ▼                          ▼   ▼                          ▼
    ┌───────────────────────────┐  ┌───────────────┐  ┌───────────────────────────┐
    │   Career Analysis Agent   │  │   Skill Gap   │  │  Learning Planner Agent   │
    │   • TF-IDF Vectorization  │  │ Analysis Agent│  │  • 12-Week Curriculum     │
    │   • 0–100 Explainable Fit │  │ • Critical/   │  │  • 3 Learning Phases      │
    │   • 22+ Domain Pathways   │  │   Supp Gaps   │  │  • Hours/Week Calibrated  │
    └───────────────────────────┘  └───────┬───────┘  └───────────────────────────┘
                                           │
                                           ▼
                            ┌───────────────────────────────┐
                            │  Project Recommendation Agent │
                            │  • High-Signal Capstones      │
                            │  • Tech Stacks & Deliverables │
                            └──────────────┬────────────────┘
                                           │
                                           ▼
                            ┌───────────────────────────────┐
                            │    Career Readiness Agent     │
                            │  • Employability Score (0-100)│
                            │  • Technical & Portfolio Audit│
                            │  • SDG 8 Empowerment Metrics  │
                            └───────────────────────────────┘
```

1. **Career Analysis Agent:** Evaluates student major, current skills, and career interests against 22+ professional tech tracks using Scikit-Learn TF-IDF cosine similarity and multi-factor weighted matching.
2. **Skill Gap Analysis Agent:** Diagnoses missing competencies, stratifies gaps into High-Priority (Core prerequisites) and Medium-Priority (Supplementary tools), estimates study weeks, and maps curated resources.
3. **Learning Planner Agent:** Formulates an adaptive 12-week roadmap structured into Phase 1 (Foundations), Phase 2 (Systems Integration), and Phase 3 (Capstone Polish).
4. **Project Recommendation Agent:** Suggests practical, real-world portfolio capstones with defined deliverables to demonstrate verified competency to hiring managers.
5. **Career Readiness Agent:** Calculates a dynamic employability readiness benchmark (0–100) based on verified skills, portfolio completeness, and learning pace.
6. **Orchestrator Agent:** Coordinates the multi-agent pipeline and routes real-time student queries to the most qualified specialist agent.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Recharts, Lucide Icons |
| **Backend** | Python 3.14 / 3.11+, FastAPI, Uvicorn, Pydantic v2 |
| **Database** | SQLite (Persists profiles, recommendations, roadmaps, progress, chat logs) |
| **AI / ML** | Scikit-Learn (`TfidfVectorizer`, Cosine Similarity), NumPy |
| **Optional LLM** | Google Gemini (`gemini-1.5-flash`) / OpenAI (`gpt-4o-mini`) via environment variables |
| **Testing** | Pytest, FastAPI TestClient, HTTPX |

---

## 📁 Project Structure

```
CAREERPILOT AI/
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── base_agent.py             # Agent abstract base class
│   │   │   ├── career_analysis_agent.py  # Career matching & suitability agent
│   │   │   ├── skill_gap_agent.py        # Skill gap diagnosis & resource mapping
│   │   │   ├── learning_planner_agent.py # 12-week milestone planner
│   │   │   ├── project_agent.py          # Portfolio project recommendation agent
│   │   │   ├── career_readiness_agent.py # Employability benchmark agent (SDG 8)
│   │   │   ├── orchestrator.py           # Multi-agent coordinator & router
│   │   │   └── llm_service.py            # Optional LLM integration with fallback
│   │   ├── data/
│   │   │   └── careers.json              # 22+ comprehensive career tracks
│   │   ├── ml/
│   │   │   └── matcher.py                # Scikit-learn TF-IDF & weighted matching
│   │   ├── routes/
│   │   │   ├── careers.py                # Career catalog & domain queries
│   │   │   ├── profile.py                # Profile management & demo preloads
│   │   │   ├── recommendations.py        # Recommendation pipeline endpoints
│   │   │   ├── roadmap.py                # Roadmap generation & retrieval
│   │   │   ├── chat.py                   # Multi-agent chat consultation
│   │   │   └── progress.py               # Milestone & readiness tracking
│   │   ├── config.py                     # App configuration & env loader
│   │   ├── database.py                   # SQLite schema & connection helpers
│   │   ├── models.py / schemas.py        # Pydantic validation schemas
│   │   └── main.py                       # FastAPI application entry point
│   ├── tests/
│   │   ├── test_matcher.py               # Unit tests for ML & scoring
│   │   ├── test_agents.py                # Unit tests for all 6 agents
│   │   └── test_api.py                   # Integration tests for FastAPI routes
│   ├── requirements.txt                  # Python dependencies
│   └── .env.example                      # Backend environment template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx                # Header with navigation & demo trigger
│   │   │   ├── Footer.tsx                # Footer with SDG 8 & integrity notes
│   │   │   ├── CareerCard.tsx            # Career card with fit score & badges
│   │   │   ├── FitScoreGauge.tsx         # Circular 0–100 visual score gauge
│   │   │   ├── ScoreBreakdownModal.tsx   # Explainable AI mathematical audit modal
│   │   │   ├── SkillRadar.tsx            # Recharts radar competency comparison
│   │   │   ├── RoadmapTimeline.tsx       # 12-Week interactive milestone timeline
│   │   │   └── AgentChatWidget.tsx       # Multi-agent conversational widget
│   │   ├── context/
│   │   │   └── CareerPilotContext.tsx    # Global state management
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx           # Hero section & value proposition
│   │   │   ├── OnboardingPage.tsx        # 3-step student intake questionnaire
│   │   │   ├── DashboardPage.tsx         # Student central command dashboard
│   │   │   ├── CareerRecommendationsPage.tsx # Catalog & search/domain filters
│   │   │   ├── SkillGapPage.tsx          # Missing skills & curated resources
│   │   │   ├── RoadmapPage.tsx           # 12-Week milestone planner
│   │   │   ├── ProjectsPage.tsx          # Portfolio capstone suggestions
│   │   │   ├── AssistantPage.tsx         # Dedicated AI multi-agent consultation
│   │   │   ├── ProgressPage.tsx          # Employability readiness score audit
│   │   │   └── SettingsPage.tsx          # System telemetry & profile resets
│   │   ├── services/
│   │   │   └── api.ts                    # REST API client
│   │   ├── types/
│   │   │   └── index.ts                  # TypeScript interface contracts
│   │   ├── App.tsx                       # Main router & app container
│   │   ├── main.tsx                      # DOM entry point
│   │   └── index.css                     # Tailwind v4 theme & glassmorphism
│   ├── index.html                        # HTML5 document with SEO tags
│   ├── package.json                      # Frontend dependencies
│   ├── tsconfig.json                     # TypeScript configuration
│   └── vite.config.ts                    # Vite config with API proxy
└── README.md
```

---

## ⚡ Quickstart Guide (Windows)

### Prerequisites
- **Python:** 3.11+ (Tested and verified on Python 3.14)
- **Node.js:** v18+ (Tested and verified on Node v25 / npm 11)

---

### Step 1: Backend Setup
Open a terminal (PowerShell or Command Prompt) in the project root:

```powershell
# Navigate to project root
cd "C:\Users\SATYAM SINGH\MY FILES\PROJECTS\CAREERPILOT AI"

# Activate the existing virtual environment (or create with python -m venv backend/venv)
.\backend\venv\Scripts\Activate.ps1

# Install requirements (already pre-installed in venv)
pip install -r backend/requirements.txt

# Start the FastAPI server
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
The backend will start at: **`http://127.0.0.1:8000`**  
Interactive Swagger API Documentation: **`http://127.0.0.1:8000/docs`**

---

### Step 2: Frontend Setup
Open a second terminal window:

```powershell
cd "C:\Users\SATYAM SINGH\MY FILES\PROJECTS\CAREERPILOT AI\frontend"

# Start the Vite development server
npm run dev
```
The frontend will start at: **`http://127.0.0.1:5173`**

---

### Step 3: Run the Test Suite
To verify that all 11 backend tests (ML matcher, all 6 agents, and API endpoints) pass:

```powershell
.\backend\venv\Scripts\python.exe -m pytest backend/tests -v
```
**Test Results:**
```
======================== 11 passed, 1 warning in 3.62s ========================
backend/tests/test_agents.py::test_all_cooperating_agents_pipeline PASSED
backend/tests/test_api.py::test_health_check_endpoint PASSED
backend/tests/test_api.py::test_careers_catalog_and_domains PASSED
backend/tests/test_api.py::test_demo_profile_endpoint PASSED
backend/tests/test_api.py::test_recommendations_analysis_endpoint PASSED
backend/tests/test_api.py::test_chat_message_endpoint PASSED
backend/tests/test_api.py::test_progress_update_and_get PASSED
backend/tests/test_matcher.py::test_career_catalog_contains_at_least_20_careers PASSED
backend/tests/test_matcher.py::test_career_has_required_attributes PASSED
backend/tests/test_matcher.py::test_normalize_skill PASSED
backend/tests/test_matcher.py::test_matching_logic_produces_explainable_scores PASSED
```

---

## 🚀 Key Features Walkthrough

### 1. Instant 1-Click Evaluation
- Click **"Try Demo Profile"** on the landing page or navbar to load sample student **Alex Rivera** (CS Junior, Python/SQL/Git, aiming for Data Science / AI/ML).
- The system automatically triggers the full multi-agent pipeline and populates the dashboard, recommendations, skill gaps, roadmap, and progress.

### 2. Transparent 0–100 Fit Scoring
- Every career card features an explainable score. Click **"Audit Score"** to see:
  - **40% Core Skills Overlap**
  - **20% Supplementary Tooling Overlap**
  - **20% Domain & Interest Alignment**
  - **20% TF-IDF Cosine Similarity**
  - Natural language reasoning produced by the Career Analysis Agent.

### 3. Interactive Skill Gap Diagnostics
- Compares student knowledge against market benchmarks.
- Stratifies missing skills into **High-Priority** (core prerequisites) and **Supplementary tools**.
- Features interactive **"Mark as Mastered"** toggles that dynamically update your overall employability readiness score.

### 4. 12-Week Progressive Roadmap
- Broken into **Phase 1 (Foundations)**, **Phase 2 (Systems Integration)**, and **Phase 3 (Capstone Polish)**.
- Tracks milestone checkboxes with live SQLite synchronization.

### 5. Multi-Agent AI Career Advisor Chat
- Interactive chat that detects student intent and routes to the proper specialist:
  - *"What are my main skill gaps?"* ➔ **Skill Gap Agent**
  - *"How should I pace my roadmap?"* ➔ **Learning Planner Agent**
  - *"What projects should I build?"* ➔ **Project Recommendation Agent**
  - *"What is my hiring readiness?"* ➔ **Career Readiness Agent**

---

## 🔑 Optional LLM Configuration
CareerPilot AI runs **completely without an API key** using intelligent, deterministic domain logic. If you wish to enable live generative synthesis:
1. Create a `.env` file in `backend/.env`:
```env
GEMINI_API_KEY=your_google_ai_studio_api_key_here
LLM_PROVIDER=gemini
LLM_MODEL=gemini-1.5-flash
```
2. Restart the backend. The system will automatically use Gemini for agent conversational synthesis and summaries.

---

## 🌐 Cloud Deployment Setup (Vercel & Render)

### 1. Backend on Render
- **Build Command:** `pip install -r backend/requirements.txt`
- **Start Command:** `python -m uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables:**
  - `ALLOWED_ORIGINS`: `https://career-pilot-ai-henna.vercel.app,http://localhost:5173`
  - `ALLOWED_ORIGIN_REGEX`: `https?://(localhost|127\.0\.0\.1)(:\d+)?|https://.*\.vercel\.app`
  - *(Optional)* `GEMINI_API_KEY`: Your Google AI Studio key

### 2. Frontend on Vercel
- **Framework Preset:** Vite
- **Root Directory:** `frontend` (or project root if configured)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variable:**
  - `VITE_API_URL`: `https://careerpilot-ai-backend-3b8o.onrender.com` (Your live Render backend URL)

---

## ⚖️ Academic Integrity & Ethical Note
CareerPilot AI is an educational advisory system designed for student empowerment. It uses transparent skill-matching metrics to help students prioritize learning. It does **not** claim to predict actual employer hiring outcomes or invent model training statistics.

