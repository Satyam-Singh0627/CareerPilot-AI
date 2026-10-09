# CareerPilot AI — Project Concept Note
**Project Title:** CareerPilot AI — Agentic AI Career Advisor  
**Mission Statement:** Equipping university students with transparent skill-gap diagnostics and personalized learning roadmaps to enhance graduate employability.  
**Sustainable Development Goal:** UN SDG 8 — Decent Work and Economic Growth (Targets 8.6 & 8.2)  

---

## 1. Introduction & Background
As digital industries evolve at unprecedented speed, university curricula struggle to keep pace with modern tooling expectations. Millions of computer science and engineering undergraduates face severe uncertainty regarding role selection, required competencies, and effective preparation strategies.

Traditional career advice suffers from two extremes:
1. **Generic Human Counseling:** Broad, non-technical advice that cannot evaluate granular frameworks (e.g. PyTorch vs TensorFlow, Docker vs Kubernetes).
2. **Opaque Commercial Black-Boxes:** Proprietary platforms providing arbitrary recommendations without explainability, discouraging students and obscuring real prerequisites.

CareerPilot AI bridges this gap as an **autonomous, explainable agentic career advisor**.

---

## 2. Project Objectives
1. **Explainable Role Alignment:** Map a student's academic background, coursework skills, and declared interests across 22+ professional tech tracks using formulaic, transparent 0–100 fit scores.
2. **Actionable Skill-Gap Auditing:** Stratify missing competencies into Critical Core Prerequisites and Supplementary Tools, mapping each gap to estimated weeks of study and official, free documentation.
3. **Adaptive 12-Week Roadmap Generation:** Synthesize a 3-phase curriculum (Foundations, Systems Integration, Capstone Polish) tailored to the student's declared weekly availability.
4. **Recruiter-Ready Proof of Work:** Provide concrete portfolio capstone ideas with explicit deliverables to demonstrate verified technical competence.
5. **Multi-Agent Advisory Architecture:** Deploy 6 specialized agents coordinating under an Orchestrator Agent to handle conversational guidance, pacing, and readiness evaluation.

---

## 3. UN Sustainable Development Goal Alignment
CareerPilot AI is directly aligned with **UN SDG 8 (Decent Work and Economic Growth)**:
* **Target 8.6 (Youth Employment & Skills):** By 2030, substantially reduce the proportion of youth not in employment, education or training (NEET). CareerPilot AI targets this by converting abstract job requirements into structured, milestone-driven weekly study schedules.
* **Target 8.2 (Economic Productivity via Tech Upgrading):** Directs student talent toward high-signal technology sectors (Artificial Intelligence, Cloud Computing, Cybersecurity, Data Science, and Full Stack Engineering).

---

## 4. Multi-Agent Ecosystem Architecture
CareerPilot AI is powered by six cooperating agents:
1. **Career Analysis Agent:** Computes suitability scores using scikit-learn TF-IDF vectorization and multi-factor weighted matching.
2. **Skill Gap Analysis Agent:** Evaluates core vs supplementary deficits, estimates mastery weeks, and links official documentation.
3. **Learning Planner Agent:** Builds adaptive 12-week milestones across Foundations, Systems Integration, and Capstone Polish.
4. **Project Recommendation Agent:** Proposes portfolio capstones with defined deliverables to prove capability to recruiters.
5. **Career Readiness Agent:** Calculates a dynamic employability score based on verified completed milestones and skills.
6. **Orchestrator Agent:** Coordinates agent collaboration, parses user intent, and directs student queries to the appropriate specialist.

---

## 5. Technical Stack & Implementation
* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Recharts, Lucide Icons. Designed with an authentic light Glassmorphism design system (`backdrop-filter: blur`, ambient pastel refraction, 60–75% translucent white surfaces).
* **Backend:** Python 3.14/3.11+, FastAPI, Uvicorn, Pydantic v2.
* **Database:** SQLite (persists student profiles, career matches, roadmaps, completed milestones, and chat logs).
* **Machine Learning:** Scikit-Learn (`TfidfVectorizer`, Cosine Similarity) + Weighted Multi-Factor Matching.
* **Optional LLM:** Google Gemini (`gemini-1.5-flash`) / OpenAI (`gpt-4o-mini`) via environment variables with 100% deterministic local fallback.
