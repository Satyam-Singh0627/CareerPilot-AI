import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  HelpCircle,
  Sparkles,
  Compass,
  GitPullRequest,
  Calendar,
  FolderGit2,
  Bot,
  TrendingUp,
  ShieldCheck,
  Globe2,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { startTour } = useCareerPilot();

  const faqs = [
    {
      q: 'Does a 95% fit score mean I am guaranteed to be hired?',
      a: 'No. The fit score measures profile-to-role alignment based on your current technical coursework, skills, and declared interests relative to market prerequisites. It is an educational diagnostic tool to guide study, not an empirical predictor of employer hiring outcomes.'
    },
    {
      q: 'Can I use CareerPilot AI completely offline or without an API key?',
      a: 'Yes, 100%. CareerPilot AI is built with an autonomous deterministic engine using scikit-learn TF-IDF vectorization, cosine similarity, and structured rule bases. External LLM API keys are strictly optional.'
    },
    {
      q: 'How are my roadmap milestones and progress saved?',
      a: 'All data is persisted in a local SQLite database (careerpilot.db) through FastAPI. Every time you mark a milestone complete or add a project, your employability readiness score dynamically updates.'
    },
    {
      q: 'How does this project support UN Sustainable Development Goal 8?',
      a: 'CareerPilot AI supports SDG 8 (Decent Work & Economic Growth) by addressing Target 8.6 (reducing youth NEET rates) and Target 8.2 (technological productivity), equipping university students with verified digital competencies.'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25">
            User Documentation & FAQ
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">CareerPilot AI System Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Help, Guidance & Feature Documentation
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed font-medium">
          Learn how CareerPilot AI's multi-agent workflow operates, understand explainable fit scoring, and replay the interactive product tour anytime.
        </p>
      </div>

      {/* Tour Replay Callout */}
      <div className="glass-panel p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-emerald-500/35 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center shrink-0 text-emerald-700 dark:text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Interactive 6-Step Product Tour
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Need a refresher on navigating the platform? Take the guided walkthrough.
            </p>
          </div>
        </div>

        <button
          onClick={startTour}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 shrink-0 hover:scale-[1.02]"
        >
          <span>Launch Product Tour</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Feature Architecture Matrix */}
      <div className="glass-panel p-6 rounded-3xl bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Platform Capabilities & Core Modules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Career Matching & Fit Scoring</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Matches your student profile across 22+ professional tech careers. Every score is explainable:
              40% Core Skills, 20% Supplementary Tools, 20% Interest/Major Alignment, and 20% TF-IDF Cosine Similarity.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold mb-1.5">
              <GitPullRequest className="w-4 h-4" />
              <span>Skill Gap Analysis & Vetted Resources</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Clearly separates existing skills from missing gaps. Prioritizes critical prerequisites over supplementary frameworks
              and provides direct links to verified, free learning documentation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold mb-1.5">
              <Calendar className="w-4 h-4" />
              <span>Adaptive 12-Week Roadmap</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Synthesizes a 3-phase curriculum (Foundations, Systems Integration, Capstone Polish) calibrated to your weekly study hours.
              Toggling completed weeks updates persistent SQLite progress.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold mb-1.5">
              <Bot className="w-4 h-4" />
              <span>Cooperating 6-Agent Ecosystem</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Career Analysis, Skill Gap, Learning Planner, Project Recommendation, and Career Readiness Agents communicate
              under the Orchestrator Agent to provide unified, reliable career advice.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="glass-panel p-6 rounded-3xl bg-white/70 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5"
            >
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{faq.q}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
