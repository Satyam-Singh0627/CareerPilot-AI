# CareerPilot AI — Lean Canvas
**Project:** CareerPilot AI — Agentic AI Career Advisor  
**Academic Alignment:** UN Sustainable Development Goal 8 (Decent Work & Economic Growth)  
**Target Audience:** University Undergraduate Students & Early Career Jobseekers  

---

## 1. Problem
* **Ambiguous Career Discovery:** College students lack personalized, transparent guidance connecting their university coursework to actual job market requirements.
* **Non-Actionable Advice:** Generic career counseling offers vague advice ("learn coding", "do projects") without explaining specific prerequisite skill gaps.
* **Static Roadmaps:** Online tutorials and curriculum roadmaps are rigid and fail to adapt to a student's available weekly study hours or existing skillsets.
* **Youth NEET Risk:** High rates of youth not in employment, education, or training due to skill mismatch upon university graduation (UN SDG Target 8.6).

## 2. Customer Segments
* **Primary:** Computer Science, Information Technology, and Engineering undergraduates preparing for summer internships or entry-level roles.
* **Secondary:** Self-taught learners and career switchers entering high-demand digital technology fields.
* **Institutional:** University career centers and computer science faculties seeking automated diagnostic tools for student placement guidance.

## 3. Unique Value Proposition (UVP)
> *"An autonomous, explainable 6-agent career navigation partner that transforms coursework into high-fit tech careers, audits skill gaps with mathematical transparency, and constructs personalized 12-week roadmaps aligned with UN SDG 8."*

* **100% Explainable 0–100 Fit Scoring:** Evaluated via Scikit-Learn TF-IDF vectorization, core skill overlap, and domain affinity.
* **Deterministic Autonomy:** Runs completely offline without mandatory external API keys or subscription fees.
* **Verified Documentation Links:** Direct links to official, free documentation for every diagnosed missing tool.

## 4. Solution
1. **Multi-Factor Career Matcher:** Matches student profiles across 22+ professional tech tracks.
2. **Skill-Gap Diagnostics:** Separates mastered competencies from high-priority core prerequisites and supplementary tools.
3. **Adaptive 12-Week Roadmap:** Calibrated to the student's declared weekly dedication (5 to 40 hours/week).
4. **Recruiter-Ready Projects:** Specific portfolio capstones with defined deliverables to demonstrate verified competency.
5. **6-Agent Advisory Chat:** Specialized agents for analysis, gaps, roadmaps, projects, and readiness.

## 5. Channels
* **Direct Web Application:** Local/cloud-hosted web app with zero-friction guest and demo mode.
* **University Hackathons & Placement Drives:** Demonstrations during university career fairs and campus placement prep.
* **Open Source Repository:** Public GitHub repository for student developer communities and tech societies.

## 6. Cost Structure
* **Development & Hosting:** Python FastAPI backend, React frontend, SQLite database, lightweight cloud hosting (AWS / Render / DigitalOcean).
* **AI Compute:** Zero marginal cost for deterministic local matching engine; optional pay-as-you-go Gemini/OpenAI API calls.
* **Maintenance:** Open-source contributions and curated quarterly updates to career benchmark datasets.

## 7. Revenue & Sustainability Model
* **Freemium University Tool:** 100% free for individual university students.
* **Institutional Licensing:** B2B campus license for university placement cells offering cohort-level skill gap analytics and accreditation reports.
* **Grants & Sponsorships:** Educational innovation and SDG 8 workforce development grant funding.

## 8. Key Metrics (KPIs)
* **Match Clarity:** Number of students completing onboarding and viewing explainable score breakdowns.
* **Skill Acquisition:** Number of diagnosed skill gaps marked as mastered in persistent SQLite progress.
* **Milestone Completion:** Percentage of 12-week roadmap milestones finished by students.
* **Capstone Output:** Volume of portfolio projects marked completed with verified deliverables.

## 9. Unfair Advantage
* **Mathematical Transparency:** Unlike proprietary black-box career tools, CareerPilot AI provides exact formulaic audits for every score calculation (40% Core, 20% Supplementary, 20% Affinity, 20% TF-IDF Cosine Similarity).
* **Zero Hallucination Guarantee:** Deterministic local rule engine ensures 100% reliable responses without API downtime or token exhaustion.
