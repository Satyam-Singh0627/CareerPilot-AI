export interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  education_level: string;
  field_of_study: string;
  graduation_year: number;
  current_skills: string[];
  target_roles: string[];
  interests: string[];
  experience_level: string;
  bio?: string;
  preferred_work_style: string;
  weekly_hours_available: number;
  created_at?: string;
  updated_at?: string;
}

export interface ScoreBreakdown {
  core_skill_match_pct: number;
  supplementary_skill_match_pct: number;
  interest_alignment_pct: number;
  semantic_similarity_pct: number;
  rationale: string;
}

export interface CareerRecommendation {
  career_id: string;
  title: string;
  domain: string;
  fit_score: number;
  industry_demand: string;
  avg_salary_usd: string;
  sdg_impact: string;
  breakdown: ScoreBreakdown;
  matched_skills: string[];
  missing_skills: string[];
  readiness_level: string;
  career_details?: Career;
}

export interface Career {
  id: string;
  title: string;
  domain: string;
  description: string;
  sdg_impact: string;
  industry_demand: string;
  avg_salary_usd: string;
  experience_level_target: string;
  core_skills: string[];
  supplementary_skills: string[];
  soft_skills: string[];
  learning_topics: { week: number; topic: string }[];
  project_ideas: {
    title: string;
    level: string;
    description: string;
    tech_stack: string[];
    deliverable: string;
  }[];
}

export interface SkillGapDetail {
  skill: string;
  category: string;
  priority: string;
  learning_effort_weeks: number;
  recommended_resources: string[];
}

export interface SkillGapReport {
  career_id: string;
  career_title: string;
  matched_skills: string[];
  missing_core_skills: string[];
  missing_supplementary_skills: string[];
  skill_match_percentage: number;
  gap_summary: string;
  prioritized_gaps: SkillGapDetail[];
}

export interface RoadmapMilestone {
  week: number;
  title: string;
  focus_skills: string[];
  learning_objectives: string[];
  recommended_activities: string[];
  estimated_hours: number;
  completed?: boolean;
}

export interface LearningRoadmap {
  id: string;
  profile_id: string;
  career_id: string;
  career_title: string;
  total_weeks: number;
  milestones: RoadmapMilestone[];
  summary: string;
}

export interface ProjectRecommendation {
  title: string;
  level: string;
  description: string;
  tech_stack: string[];
  skills_developed: string[];
  portfolio_value: string;
  deliverable: string;
  completed?: boolean;
}

export interface ReadinessReport {
  overall_readiness_score: number;
  technical_skills_readiness: number;
  portfolio_readiness: number;
  learning_pace_readiness: number;
  status: string;
  strengths: string[];
  priority_action_items: string[];
  sdg_empowerment_note: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agent_name?: string;
  content: string;
  timestamp: string;
  suggestions?: string[];
}
