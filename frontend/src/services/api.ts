import {
  StudentProfile,
  Career,
  CareerRecommendation,
  SkillGapReport,
  LearningRoadmap,
  ProjectRecommendation,
  ReadinessReport,
  ChatMessage
} from '../types';

const API_BASE = '/api';

export const api = {
  // Health
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },

  // Careers
  async getCareers(domain?: string, search?: string): Promise<Career[]> {
    const params = new URLSearchParams();
    if (domain) params.append('domain', domain);
    if (search) params.append('search', search);
    const res = await fetch(`${API_BASE}/careers?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch careers');
    return res.json();
  },

  async getDomains(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/careers/domains`);
    if (!res.ok) throw new Error('Failed to fetch domains');
    return res.json();
  },

  async getCareerById(careerId: string): Promise<Career> {
    const res = await fetch(`${API_BASE}/careers/${careerId}`);
    if (!res.ok) throw new Error('Failed to fetch career details');
    return res.json();
  },

  // Profile
  async saveProfile(profile: Partial<StudentProfile>): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error('Failed to save profile');
    return res.json();
  },

  async getProfile(profileId: string): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE}/profile/${profileId}`);
    if (!res.ok) throw new Error('Failed to load profile');
    return res.json();
  },

  async getDemoProfile(): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE}/profile/demo/sample`);
    if (!res.ok) throw new Error('Failed to load demo profile');
    return res.json();
  },

  async login(email: string, name?: string): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE}/profile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name: name || '' }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  // Recommendations & Full Agent Analysis
  async analyzeProfile(profile: Partial<StudentProfile>, targetCareerId?: string): Promise<{
    top_recommendations: CareerRecommendation[];
    selected_career: Career;
    skill_gap: SkillGapReport;
    roadmap: LearningRoadmap;
    projects: ProjectRecommendation[];
    readiness: ReadinessReport;
    orchestrator_summary: string;
  }> {
    const url = targetCareerId
      ? `${API_BASE}/recommendations/analyze?target_career_id=${encodeURIComponent(targetCareerId)}`
      : `${API_BASE}/recommendations/analyze`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error('Multi-agent analysis failed');
    return res.json();
  },

  // Roadmap
  async generateRoadmap(profile: Partial<StudentProfile>, careerId: string): Promise<LearningRoadmap> {
    const res = await fetch(`${API_BASE}/roadmap/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, career_id: careerId }),
    });
    if (!res.ok) throw new Error('Failed to generate roadmap');
    return res.json();
  },

  // Progress
  async getProgress(profileId: string, careerId: string) {
    const res = await fetch(`${API_BASE}/progress/${profileId}/${careerId}`);
    if (!res.ok) throw new Error('Failed to load progress');
    return res.json();
  },

  async updateProgress(payload: {
    profile_id: string;
    career_id: string;
    completed_skills?: string[];
    completed_milestones?: number[];
    completed_projects?: string[];
    notes?: string[];
  }) {
    const res = await fetch(`${API_BASE}/progress/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update progress');
    return res.json();
  },

  // Chat
  async sendChatMessage(profileId: string, message: string, careerId?: string, profile?: any) {
    const res = await fetch(`${API_BASE}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: profileId, message, career_id: careerId, profile }),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },

  async getChatHistory(profileId: string): Promise<any[]> {
    const res = await fetch(`${API_BASE}/chat/history/${profileId}`);
    if (!res.ok) return [];
    return res.json();
  }
};
