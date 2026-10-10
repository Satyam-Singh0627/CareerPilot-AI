import {
  StudentProfile,
  Career,
  CareerRecommendation,
  SkillGapReport,
  LearningRoadmap,
  ProjectRecommendation,
  ReadinessReport
} from '../types';

/**
 * Resolves the backend base URL for API requests.
 * Normalizes input so trailing slashes and redundant '/api' segments are cleanly handled:
 * - Unset (dev mode / local proxy): '/api'
 * - 'https://backend.onrender.com' -> 'https://backend.onrender.com/api'
 * - 'https://backend.onrender.com/' -> 'https://backend.onrender.com/api'
 * - 'https://backend.onrender.com/api' -> 'https://backend.onrender.com/api'
 * - 'https://backend.onrender.com/api/' -> 'https://backend.onrender.com/api'
 */
export function getApiBaseUrl(): string {
  const envUrl = (
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    ''
  ).trim();

  if (!envUrl) {
    return '/api';
  }

  const cleanUrl = envUrl.replace(/\/+$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
}

export const API_BASE = getApiBaseUrl();

async function handleResponse<T = any>(res: Response, fallbackError: string): Promise<T> {
  if (!res.ok) {
    let errorDetail = fallbackError;
    try {
      const data = await res.json();
      if (typeof data.detail === 'string') {
        errorDetail = data.detail;
      } else if (Array.isArray(data.detail) && data.detail[0]?.msg) {
        errorDetail = data.detail.map((d: any) => d.msg).join(', ');
      } else if (typeof data.message === 'string') {
        errorDetail = data.message;
      }
    } catch {
      // Body is not JSON
    }
    throw new Error(errorDetail);
  }
  return res.json();
}

export const api = {
  // Health
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return handleResponse(res, 'Health check failed');
  },

  // Careers
  async getCareers(domain?: string, search?: string): Promise<Career[]> {
    const params = new URLSearchParams();
    if (domain) params.append('domain', domain);
    if (search) params.append('search', search);
    const res = await fetch(`${API_BASE}/careers?${params.toString()}`);
    return handleResponse<Career[]>(res, 'Failed to fetch careers');
  },

  async getDomains(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/careers/domains`);
    return handleResponse<string[]>(res, 'Failed to fetch domains');
  },

  async getCareerById(careerId: string): Promise<Career> {
    const res = await fetch(`${API_BASE}/careers/${careerId}`);
    return handleResponse<Career>(res, 'Failed to fetch career details');
  },

  // Profile
  async saveProfile(profile: Partial<StudentProfile>): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    return handleResponse<StudentProfile>(res, 'Failed to save profile');
  },

  async getProfile(profileId: string): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE}/profile/${profileId}`);
    return handleResponse<StudentProfile>(res, 'Failed to load profile');
  },

  async getDemoProfile(): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE}/profile/demo/sample`);
    return handleResponse<StudentProfile>(res, 'Failed to load demo profile');
  },

  async login(email: string, name?: string): Promise<StudentProfile> {
    const res = await fetch(`${API_BASE}/profile/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name: name || '' }),
    });
    return handleResponse<StudentProfile>(res, 'Login failed');
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
    return handleResponse(res, 'Multi-agent analysis failed');
  },

  // Roadmap
  async generateRoadmap(profile: Partial<StudentProfile>, careerId: string): Promise<LearningRoadmap> {
    const res = await fetch(`${API_BASE}/roadmap/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, career_id: careerId }),
    });
    return handleResponse<LearningRoadmap>(res, 'Failed to generate roadmap');
  },

  // Progress
  async getProgress(profileId: string, careerId: string) {
    const res = await fetch(`${API_BASE}/progress/${profileId}/${careerId}`);
    return handleResponse(res, 'Failed to load progress');
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
    return handleResponse(res, 'Failed to update progress');
  },

  // Chat
  async sendChatMessage(profileId: string, message: string, careerId?: string, profile?: any) {
    const res = await fetch(`${API_BASE}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: profileId, message, career_id: careerId, profile }),
    });
    return handleResponse(res, 'Failed to send message');
  },

  async getChatHistory(profileId: string): Promise<any[]> {
    const res = await fetch(`${API_BASE}/chat/history/${profileId}`);
    if (!res.ok) return [];
    return res.json();
  }
};
