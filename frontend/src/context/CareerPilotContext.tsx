import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  StudentProfile,
  Career,
  CareerRecommendation,
  SkillGapReport,
  LearningRoadmap,
  ProjectRecommendation,
  ReadinessReport
} from '../types';
import { api } from '../services/api';

export type ThemeMode = 'light' | 'dark';

interface CareerPilotContextType {
  profile: StudentProfile | null;
  selectedCareer: Career | null;
  recommendations: CareerRecommendation[];
  skillGap: SkillGapReport | null;
  roadmap: LearningRoadmap | null;
  projects: ProjectRecommendation[];
  readiness: ReadinessReport | null;
  orchestratorSummary: string;
  completedSkills: string[];
  completedMilestones: number[];
  completedProjects: string[];
  isLoading: boolean;
  activeTab: string;
  theme: ThemeMode;
  isDemoProfile: boolean;
  isAuthModalOpen: boolean;
  isLogoutConfirmOpen: boolean;
  toggleTheme: () => void;
  setActiveTab: (tab: string) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, name?: string) => Promise<void>;
  promptLogout: () => void;
  cancelLogout: () => void;
  confirmLogout: () => void;
  logout: () => void;
  loadDemoProfile: () => Promise<void>;
  updateProfile: (profileData: Partial<StudentProfile>) => Promise<void>;
  selectCareerAndAnalyze: (careerId: string) => Promise<void>;
  toggleSkillCompletion: (skill: string) => Promise<void>;
  toggleMilestoneCompletion: (week: number) => Promise<void>;
  toggleProjectCompletion: (projectTitle: string) => Promise<void>;
  refreshAnalysis: () => Promise<void>;
  // Product Tour
  isTourOpen: boolean;
  tourStep: number;
  startTour: () => void;
  closeTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
}

const CareerPilotContext = createContext<CareerPilotContextType | undefined>(undefined);

const DEFAULT_DEMO_PROFILE: StudentProfile = {
  id: 'demo-student',
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  education_level: 'Undergraduate (Junior)',
  field_of_study: 'Computer Science & Data',
  graduation_year: 2026,
  current_skills: ['Python', 'SQL', 'Pandas', 'Git', 'JavaScript', 'HTML5 & CSS3'],
  target_roles: ['Data Scientist', 'AI & Machine Learning Engineer', 'Full Stack Web Developer'],
  interests: ['Artificial Intelligence', 'Predictive Analytics', 'Cloud Technology', 'Sustainable Tech'],
  experience_level: 'intermediate',
  bio: 'Junior CS undergraduate passionate about data science and building intelligent web applications. Looking for summer 2026 internships.',
  preferred_work_style: 'hybrid',
  weekly_hours_available: 15,
};

export const CareerPilotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('careerpilot_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [isDemoProfile, setIsDemoProfile] = useState<boolean>(() => {
    return localStorage.getItem('careerpilot_is_demo') === 'true';
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = localStorage.getItem('careerpilot_profile');
    return saved ? 'dashboard' : 'landing';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('careerpilot_theme') as ThemeMode;
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState<boolean>(false);

  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [tourStep, setTourStep] = useState<number>(1);

  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [skillGap, setSkillGap] = useState<SkillGapReport | null>(null);
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [projects, setProjects] = useState<ProjectRecommendation[]>([]);
  const [readiness, setReadiness] = useState<ReadinessReport | null>(null);
  const [orchestratorSummary, setOrchestratorSummary] = useState<string>('');
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const [completedMilestones, setCompletedMilestones] = useState<number[]>([]);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync theme to HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('careerpilot_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const startTour = () => {
    setTourStep(1);
    setIsTourOpen(true);
  };

  const closeTour = () => {
    setIsTourOpen(false);
    localStorage.setItem('careerpilot_tour_completed', 'true');
  };

  const nextTourStep = () => {
    if (tourStep < 6) {
      setTourStep((prev) => prev + 1);
    } else {
      closeTour();
    }
  };

  const prevTourStep = () => {
    if (tourStep > 1) {
      setTourStep((prev) => prev - 1);
    }
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const promptLogout = () => setIsLogoutConfirmOpen(true);
  const cancelLogout = () => setIsLogoutConfirmOpen(false);

  const logout = () => {
    localStorage.removeItem('careerpilot_profile');
    localStorage.removeItem('careerpilot_is_demo');
    setProfileState(null);
    setIsDemoProfile(false);
    setSelectedCareer(null);
    setRecommendations([]);
    setSkillGap(null);
    setRoadmap(null);
    setProjects([]);
    setReadiness(null);
    setOrchestratorSummary('');
    setCompletedSkills([]);
    setCompletedMilestones([]);
    setCompletedProjects([]);
    setIsLogoutConfirmOpen(false);
    setActiveTab('landing');
  };

  const confirmLogout = () => {
    logout();
  };

  const saveProfileToStorage = (p: StudentProfile, isDemo = false) => {
    setProfileState(p);
    setIsDemoProfile(isDemo);
    localStorage.setItem('careerpilot_profile', JSON.stringify(p));
    localStorage.setItem('careerpilot_is_demo', isDemo ? 'true' : 'false');
  };

  const login = async (email: string, name?: string) => {
    setIsLoading(true);
    try {
      const student = await api.login(email, name);
      saveProfileToStorage(student, false);
      setIsAuthModalOpen(false);
      // If student already has skills or target roles, run analysis
      if (student.current_skills && student.current_skills.length > 0) {
        await runAnalysis(student);
      }
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Failed to log in:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const runAnalysis = async (prof: StudentProfile, careerId?: string) => {
    setIsLoading(true);
    try {
      const res = await api.analyzeProfile(prof, careerId);
      setRecommendations(res.top_recommendations);
      setSelectedCareer(res.selected_career);
      setSkillGap(res.skill_gap);
      setRoadmap(res.roadmap);
      setProjects(res.projects);
      setReadiness(res.readiness);
      setOrchestratorSummary(res.orchestrator_summary);

      // Load progress
      try {
        const prog = await api.getProgress(prof.id, res.selected_career.id);
        setCompletedSkills(prog.completed_skills || []);
        setCompletedMilestones(prog.completed_milestones || []);
        setCompletedProjects(prog.completed_projects || []);
        if (prog.readiness) {
          setReadiness(prog.readiness);
        }
      } catch {
        // Fallback to default
      }
    } catch (err) {
      console.error('Error during multi-agent analysis:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDemoProfile = async () => {
    setIsLoading(true);
    try {
      let demo: StudentProfile;
      try {
        demo = await api.getDemoProfile();
      } catch (err) {
        console.warn('Backend demo endpoint unavailable, using offline demo profile:', err);
        demo = DEFAULT_DEMO_PROFILE;
      }
      saveProfileToStorage(demo, true);
      try {
        await runAnalysis(demo);
      } catch {
        // Analysis error handled
      }
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Failed to load demo profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<StudentProfile>) => {
    setIsLoading(true);
    try {
      const saved = await api.saveProfile(profileData);
      saveProfileToStorage(saved, false);
      await runAnalysis(saved);
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectCareerAndAnalyze = async (careerId: string) => {
    if (!profile) return;
    setIsLoading(true);
    try {
      await runAnalysis(profile, careerId);
    } catch (err) {
      console.error('Failed to switch career track:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSkillCompletion = async (skill: string) => {
    if (!profile || !selectedCareer) return;
    const nextSkills = completedSkills.includes(skill)
      ? completedSkills.filter((s) => s !== skill)
      : [...completedSkills, skill];

    setCompletedSkills(nextSkills);
    try {
      const updated = await api.updateProgress({
        profile_id: profile.id,
        career_id: selectedCareer.id,
        completed_skills: nextSkills,
        completed_milestones: completedMilestones,
        completed_projects: completedProjects
      });
      if (updated.readiness) setReadiness(updated.readiness);
    } catch (err) {
      console.error('Failed to update skill completion:', err);
    }
  };

  const toggleMilestoneCompletion = async (week: number) => {
    if (!profile || !selectedCareer) return;
    const nextMilestones = completedMilestones.includes(week)
      ? completedMilestones.filter((w) => w !== week)
      : [...completedMilestones, week];

    setCompletedMilestones(nextMilestones);
    try {
      const updated = await api.updateProgress({
        profile_id: profile.id,
        career_id: selectedCareer.id,
        completed_skills: completedSkills,
        completed_milestones: nextMilestones,
        completed_projects: completedProjects
      });
      if (updated.readiness) setReadiness(updated.readiness);
    } catch (err) {
      console.error('Failed to update milestone completion:', err);
    }
  };

  const toggleProjectCompletion = async (projectTitle: string) => {
    if (!profile || !selectedCareer) return;
    const nextProjects = completedProjects.includes(projectTitle)
      ? completedProjects.filter((p) => p !== projectTitle)
      : [...completedProjects, projectTitle];

    setCompletedProjects(nextProjects);
    try {
      const updated = await api.updateProgress({
        profile_id: profile.id,
        career_id: selectedCareer.id,
        completed_skills: completedSkills,
        completed_milestones: completedMilestones,
        completed_projects: nextProjects
      });
      if (updated.readiness) setReadiness(updated.readiness);
    } catch (err) {
      console.error('Failed to update project completion:', err);
    }
  };

  const refreshAnalysis = async () => {
    if (profile) {
      await runAnalysis(profile, selectedCareer?.id);
    }
  };

  // Auto-analyze saved profile on initial load if available
  useEffect(() => {
    if (profile && !recommendations.length) {
      runAnalysis(profile);
    }
  }, []);

  return (
    <CareerPilotContext.Provider
      value={{
        profile,
        selectedCareer,
        recommendations,
        skillGap,
        roadmap,
        projects,
        readiness,
        orchestratorSummary,
        completedSkills,
        completedMilestones,
        completedProjects,
        isLoading,
        activeTab,
        theme,
        isDemoProfile,
        isAuthModalOpen,
        isLogoutConfirmOpen,
        toggleTheme,
        setActiveTab,
        openAuthModal,
        closeAuthModal,
        login,
        promptLogout,
        cancelLogout,
        confirmLogout,
        logout,
        loadDemoProfile,
        updateProfile,
        selectCareerAndAnalyze,
        toggleSkillCompletion,
        toggleMilestoneCompletion,
        toggleProjectCompletion,
        refreshAnalysis,
        isTourOpen,
        tourStep,
        startTour,
        closeTour,
        nextTourStep,
        prevTourStep
      }}
    >
      {children}
    </CareerPilotContext.Provider>
  );
};

export const useCareerPilot = () => {
  const context = useContext(CareerPilotContext);
  if (!context) throw new Error('useCareerPilot must be used within CareerPilotProvider');
  return context;
};
