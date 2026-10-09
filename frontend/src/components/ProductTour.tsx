import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Compass,
  UserCheck,
  Sparkles,
  GitPullRequest,
  Calendar,
  Bot,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Globe2
} from 'lucide-react';

interface TourStepData {
  step: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tip: string;
  actionTab?: string;
}

const TOUR_STEPS: TourStepData[] = [
  {
    step: 1,
    title: 'Welcome to CareerPilot AI',
    subtitle: 'Step 1 of 6: Your Agentic Career Navigation Partner',
    icon: Compass,
    description:
      'CareerPilot AI helps university students and early jobseekers discover high-growth tech careers, bridge skill gaps with mathematical transparency, and complete structured 12-week roadmaps aligned with UN SDG 8.',
    tip: 'Everything is computed with deterministic algorithms and real Python logic — no black-box guesses.',
    actionTab: 'dashboard'
  },
  {
    step: 2,
    title: 'Your Student Profile & Background',
    subtitle: 'Step 2 of 6: The Foundation',
    icon: UserCheck,
    description:
      'Set up your academic major, existing coursework skills, target job aspirations, and dedicated weekly study hours. You can also load our prefilled sample student profile in 1 click.',
    tip: 'Your profile stays safely stored in local SQLite database on your computer.',
    actionTab: 'onboarding'
  },
  {
    step: 3,
    title: 'Career Matches & Explainable Fit Scores',
    subtitle: 'Step 3 of 6: 22+ Tech Tracks',
    icon: Sparkles,
    description:
      'Explore 22+ professional tech tracks across AI/ML, Cloud, Cybersecurity, Full Stack, Data, and Product. Fit scores (0–100) are explainable with exact core skill overlap, domain affinity, and TF-IDF cosine similarity.',
    tip: 'Fit scores measure educational alignment, not probability of employer hiring.',
    actionTab: 'recommendations'
  },
  {
    step: 4,
    title: 'Precision Skill-Gap Diagnostics',
    subtitle: 'Step 4 of 6: Know What to Learn',
    icon: GitPullRequest,
    description:
      'We separate your existing capabilities from missing requirements into High-Priority core prerequisites and supplementary tools. Each missing skill includes vetted free learning resources and estimated weeks to master.',
    tip: 'Toggle "Mark as Mastered" as you study to watch your employability readiness increase.',
    actionTab: 'skillgap'
  },
  {
    step: 5,
    title: 'Adaptive Roadmap & Portfolio Projects',
    subtitle: 'Step 5 of 6: Proof of Work',
    icon: Calendar,
    description:
      'Follow an adaptive 12-week weekly milestone schedule broken into Foundations, Systems Integration, and Capstone Polish. Build recruiter-ready portfolio projects designed to demonstrate verifiable competence.',
    tip: 'Marking weekly milestones complete updates your persistent SQLite progress.',
    actionTab: 'roadmap'
  },
  {
    step: 6,
    title: 'AI Career Assistant & Progress Audit',
    subtitle: 'Step 6 of 6: 6-Agent Ecosystem',
    icon: Bot,
    description:
      'Consult directly with our 6 cooperating agents: Career Analysis, Skill Gap, Learning Planner, Project, Readiness, and Orchestrator. View your comprehensive employability readiness benchmark across technical skills, portfolio, and learning pace.',
    tip: 'The AI assistant works 100% locally with deterministic expert rules or connects to your Gemini API key.',
    actionTab: 'assistant'
  }
];

export const ProductTour: React.FC = () => {
  const {
    isTourOpen,
    tourStep,
    nextTourStep,
    prevTourStep,
    closeTour,
    setActiveTab
  } = useCareerPilot();

  if (!isTourOpen) return null;

  const current = TOUR_STEPS[tourStep - 1] || TOUR_STEPS[0];
  const Icon = current.icon;

  const handleNext = () => {
    if (current.actionTab && tourStep < 6) {
      setActiveTab(current.actionTab);
    }
    nextTourStep();
  };

  const handlePrev = () => {
    prevTourStep();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
    >
      {/* Light Glassmorphic Modal Card */}
      <div className="relative w-full max-w-lg glass-panel bg-white/95 dark:bg-slate-900/95 border border-white/90 dark:border-slate-700/80 rounded-3xl p-7 sm:p-8 shadow-2xl overflow-hidden">
        {/* Subtle Ambient Refraction inside modal */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header with Step Counter & Close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
              Interactive Tour · Step {tourStep} of 6
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Globe2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>SDG 8</span>
            </div>
          </div>
          <button
            onClick={closeTour}
            aria-label="Close tour"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="my-6 space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-sm text-emerald-600 dark:text-emerald-400">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                {current.subtitle}
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
            {current.description}
          </p>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <span className="font-bold text-emerald-800 dark:text-emerald-400">💡 Pro Tip: </span>
            <span>{current.tip}</span>
          </div>
        </div>

        {/* Stepper Dots & Action Buttons */}
        <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
          {/* Progress Indicator Dots */}
          <div className="flex items-center gap-2">
            {TOUR_STEPS.map((s) => (
              <span
                key={s.step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s.step === tourStep
                    ? 'w-7 bg-emerald-600'
                    : s.step < tourStep
                    ? 'w-2 bg-emerald-400/70'
                    : 'w-2 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={closeTour}
              className="px-3.5 py-2 text-xs sm:text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors"
            >
              Skip Tour
            </button>

            {tourStep > 1 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/25 transition-all flex items-center gap-1.5 hover:scale-[1.02]"
            >
              <span>{tourStep === 6 ? 'Get Started' : 'Next'}</span>
              {tourStep === 6 ? (
                <Check className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
