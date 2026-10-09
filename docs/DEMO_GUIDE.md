# CareerPilot AI — Evaluator Demonstration Guide
**Project:** CareerPilot AI — Agentic AI Career Advisor  
**Format:** Step-by-Step Live Evaluator & Grading Walkthrough  

---

## 1. Prerequisites Checklist
1. **Backend Server Running:**
   ```powershell
   cd "C:\Users\SATYAM SINGH\MY FILES\PROJECTS\CAREERPILOT AI"
   .\backend\venv\Scripts\python.exe -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
   ```
2. **Frontend Dev Server Running:**
   ```powershell
   cd "C:\Users\SATYAM SINGH\MY FILES\PROJECTS\CAREERPILOT AI\frontend"
   npm run dev -- --host 127.0.0.1 --port 5173
   ```
3. Open a browser and navigate to: **`http://127.0.0.1:5173`**

---

## 2. Demonstration Flow

### Step 1: Public Landing Page & Design Verification
1. Note the **Public Landing Page**:
   - Clean, light Glassmorphism design (`#F6F8F7` warm white backdrop, translucent glass panels, emerald green `#059669` accents, and subtle ambient pastel refraction).
   - Dedicated Public Navbar with *Features*, *How It Works*, *SDG 8 Mission*, *User Guide*, *Theme Toggle*, *Sign In*, and *Get Started*.
   - Standalone layout (the authenticated sidebar is hidden).
   - Headline: *"Find Your Career Direction. Build the Skills to Get There."*
   - Tasteful glass simulation preview of the live dashboard.
2. Toggle the **Theme Switcher** (Sun/Moon icon) to verify the dark theme is a soft slate charcoal, not heavy navy blue. Toggle back to Light mode.

### Step 2: Instant 1-Click Demo Evaluation
1. Click the **"Try Instant Demo (Alex Rivera)"** button on the hero section.
2. The system triggers the full multi-agent pipeline:
   - Evaluates coursework (Python, SQL, Git, Pandas, JavaScript).
   - Runs TF-IDF vectorization and multi-factor matching across 22+ tech pathways.
   - Diagnoses skill gaps and creates a 12-week roadmap.
   - Redirects to the **Student Dashboard**.

### Step 3: Simplified Dashboard Verification
1. Verify the 5 structured sections on the Dashboard:
   - **Section A (Welcome):** *"Welcome back, Alex Rivera! 👋"* with primary action button (*"Continue Your Roadmap"*).
   - **Section B (Summary Cards):** 4 clean glass cards: *Top Match*, *Skills to Improve*, *Learning Progress*, and *Portfolio Projects*.
   - **Section C (Recommended Career):** Prominent focus on *AI & Machine Learning Engineer (92% Fit)* with concise rationale and *"View Career Details"* CTA.
   - **Section D (Next Steps):** 4 actionable cards: Complete Profile, Review Skill Gaps, Continue Roadmap, and Explore Projects.
   - **Section E (AI Career Advisor):** Concise summary card with *"Ask AI Advisor"* action.

### Step 4: 6-Step Interactive Glass Product Tour
1. Click **"Product Tour"** in the top navigation bar.
2. Walk through the 6 steps:
   - *Step 1:* Welcome to CareerPilot AI
   - *Step 2:* Student Profile & Background
   - *Step 3:* Career Matches & Fit Scores
   - *Step 4:* Precision Skill-Gap Diagnostics
   - *Step 5:* Adaptive Roadmap & Portfolio Projects
   - *Step 6:* AI Career Assistant & Readiness Audit
3. Test **Back**, **Next**, **Skip Tour**, and step indicator dots. Notice how the tour safely navigates between tabs without permanently blocking the application.

### Step 5: Explainable Career Matching & Score Audit
1. Navigate to **"Career Matches"** via the sidebar.
2. Filter tracks using domain chips (*AI/ML*, *Cloud*, *Data*, etc.) or type in the search bar.
3. Click **"Audit Score"** on any career card (e.g., *AI & Machine Learning Engineer*).
4. The audit modal opens, showing the exact mathematical breakdown:
   - 40% Core Skills Overlap
   - 20% Supplementary Tooling Overlap
   - 20% Domain & Interest Alignment
   - 20% TF-IDF Cosine Similarity
   - Notice the prominent disclaimer explaining that fit scores measure profile-to-role educational alignment, not hiring probability.

### Step 6: Skill Gap Diagnostics & Live Progress Update
1. Navigate to **"Skill Gap Analysis"**.
2. Note the three separate sections:
   - *Mastered Skills* (Green)
   - *Critical Core Gaps* (Rose)
   - *Supplementary Tools* (Sky Blue)
3. Check off any skill (e.g. *"PyTorch"*) using the **"Mark as Mastered"** button.
4. Notice how the milestone state immediately updates in SQLite.
5. Review the vetted free documentation links provided for each gap.

### Step 7: 12-Week Adaptive Roadmap
1. Navigate to **"Learning Roadmap"**.
2. View the 3 phases: *Foundations (Weeks 1–4)*, *Systems Integration (Weeks 5–8)*, and *Capstone Polish (Weeks 9–12)*.
3. Check off **Week 1** and **Week 2**.
4. Notice the progress meter dynamically increases.

### Step 8: Multi-Agent AI Career Assistant
1. Navigate to **"AI Career Assistant"**.
2. Notice the roster of 6 specialized agents and the engine status indicator (*"Deterministic Local Agent Engine"*).
3. Click a suggested question (e.g. *"What are my highest priority skill gaps?"*).
4. The Orchestrator routes the query to the Skill Gap Agent and responds with validated guidance.

### Step 9: Account Sign Out & Session Exit Flow
1. Click the student profile dropdown in the top bar.
2. Select **"Log Out"**.
3. A confirmation dialog appears: *"Sign Out of CareerPilot AI?"*.
4. Click **"Log Out"**.
5. The application clears session state and redirects to the **Public Landing Page**.
6. Refresh the browser page (`F5`) to confirm that the session remains logged out and does not restore authenticated screens without logging in.
