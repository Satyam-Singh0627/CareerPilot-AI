import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Compass,
  Sparkles,
  GitPullRequest,
  Calendar,
  FolderGit2,
  Bot,
  Globe2,
  ArrowRight,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    openAuthModal,
    loadDemoProfile,
    startTour,
    setActiveTab,
    theme,
    toggleTheme,
    isLoading
  } = useCareerPilot();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Personalised Career Matches',
      desc: 'Transparent 0–100 alignment scores across 22+ technology tracks evaluated using deterministic ML matching.',
      accent: 'text-emerald-800 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
    },
    {
      icon: GitPullRequest,
      title: 'Skill-Gap Analysis',
      desc: 'Categorizes critical core prerequisites and supplementary tools with verified, free learning resources.',
      accent: 'text-teal-800 dark:text-teal-400 bg-teal-500/10 border-teal-500/25'
    },
    {
      icon: Calendar,
      title: 'Guided Learning Roadmap',
      desc: 'Structured 12-week weekly milestone curricula tailored to your study hours with persistent progress tracking.',
      accent: 'text-sky-800 dark:text-sky-400 bg-sky-500/10 border-sky-500/25'
    },
    {
      icon: FolderGit2,
      title: 'Portfolio Project Suggestions',
      desc: 'Recruiter-ready capstone project ideas with concrete tech stacks and deliverables to prove hands-on mastery.',
      accent: 'text-purple-800 dark:text-purple-400 bg-purple-500/10 border-purple-500/25'
    },
    {
      icon: Bot,
      title: 'AI Career Assistant',
      desc: 'Autonomous multi-agent advisory team providing instant guidance, curriculum pacing, and readiness audits.',
      accent: 'text-amber-800 dark:text-amber-400 bg-amber-500/10 border-amber-500/25'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Tell Us About Your Background',
      desc: 'Share your academic major, technical skills, interests, and available weekly study hours.'
    },
    {
      number: '02',
      title: 'Discover Suitable Career Options',
      desc: 'Receive mathematically explainable fit scores matching your profile to current tech roles.'
    },
    {
      number: '03',
      title: 'Identify Your Missing Skills',
      desc: 'Review high-priority gaps and explore curated documentation to bridge your knowledge deficits.'
    },
    {
      number: '04',
      title: 'Follow Your Personalised Roadmap',
      desc: 'Complete weekly milestones and build portfolio projects to boost your verified employability.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F7] dark:bg-[#141A18] text-[#1F2923] dark:text-[#F3F4F6] selection:bg-emerald-500 selection:text-white">
      {/* Public Landing Navbar */}
      <header className="sticky top-0 z-40 h-20 glass-panel bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between px-6 sm:px-12 transition-all">
        {/* Brand */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform text-white">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                CareerPilot
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/25">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 font-semibold">
              <Globe2 className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
              <span>SDG 8 · Decent Work</span>
            </p>
          </div>
        </div>

        {/* Navigation Links (Readable Charcoal Text) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-800 dark:text-slate-200">
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('impact')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            SDG 8 Mission
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            User Guide
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={openAuthModal}
            className="hidden sm:inline-flex px-4 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-300 dark:border-slate-700 hover:bg-slate-100/90 dark:hover:bg-slate-800 transition-colors"
          >
            Sign In
          </button>

          <button
            onClick={openAuthModal}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 transition-all flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section: Soft light surface with ambient gradients */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-14 pb-16 text-center">
        {/* SDG Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 text-xs sm:text-sm font-bold mb-6 shadow-xs">
          <Globe2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>Supporting UN SDG 8: Decent Work & Economic Growth</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Find Your Career Direction.{' '}
          <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-600 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
            Build the Skills to Get There.
          </span>
        </h1>

        {/* Short, simple, high-contrast explanation */}
        <p className="mt-5 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          CareerPilot AI helps university students discover high-fit tech careers, identify exact skill gaps with mathematical transparency, and complete personalized 12-week roadmaps.
        </p>

        {/* Call to Actions (Clearly differentiated secondary actions) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={openAuthModal}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-base text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => scrollToSection('features')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-base text-slate-800 dark:text-slate-100 bg-white/90 dark:bg-slate-800/90 border-2 border-slate-300 dark:border-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Explore Features</span>
          </button>

          <button
            onClick={loadDemoProfile}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 border-2 border-emerald-400/80 dark:border-emerald-700/80 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <UserCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Try Instant Demo (Alex Rivera)</span>
          </button>
        </div>

        {/* Interactive Tour CTA */}
        <div className="mt-5">
          <button
            onClick={startTour}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-800 dark:text-slate-300 dark:hover:text-emerald-300 bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 transition-colors shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Take the Interactive 6-Step Tour</span>
          </button>
        </div>

        {/* Clean, Readable Glass Dashboard Preview Panel (No grey overlay) */}
        <div className="mt-12 max-w-5xl mx-auto rounded-3xl glass-panel bg-white/85 dark:bg-slate-900/85 border border-slate-300/80 dark:border-slate-700/80 p-5 sm:p-7 shadow-xl relative overflow-hidden text-left">
          {/* Subtle ambient mint refraction */}
          <div className="absolute top-0 right-1/4 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Mini Top Bar Preview */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-3 font-bold text-slate-700 dark:text-slate-300">
                CareerPilot AI Dashboard · Live Simulation
              </span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/25">
              Deterministic Matching
            </span>
          </div>

          {/* Cards Grid Simulation with High-Contrast Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {/* Top Match Preview */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/85 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Top Career Match
                </span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                  92% Fit
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                AI & Machine Learning Engineer
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                High alignment with Python, Statistics, and Data Modeling coursework.
              </p>
            </div>

            {/* Skill Gap Preview */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/85 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-800 dark:text-teal-400 flex items-center gap-1">
                  <GitPullRequest className="w-3.5 h-3.5" />
                  Prioritized Skill Gaps
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  2 Core to Learn
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                PyTorch & Vector Databases
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Estimated 4 weeks with verified free official documentation links.
              </p>
            </div>

            {/* Learning Progress Preview */}
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/85 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-sky-800 dark:text-sky-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Roadmap Milestone
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  Week 1 of 12
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                Deep Learning Foundations
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Neural network architectures, tensor math, and gradient descent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25">
            Core Platform Modules
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            Everything You Need to Plan Your Career
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-2 font-medium">
            Engineered with explainable machine learning and deterministic domain expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-4 shadow-sm ${feat.accent}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/25">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            How CareerPilot AI Works
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mt-2 font-medium">
            From university coursework to confident career decisions in four clear steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div
              key={i}
              className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800"
            >
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mb-3 block">
                {st.number}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
                {st.title}
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section: UN SDG 8 */}
      <section id="impact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/85 border border-emerald-500/35 shadow-lg text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 text-xs font-bold">
                <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>UN SDG 8 · Decent Work and Economic Growth</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Addressing Youth Skill-Job Mismatch
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Every year, millions of college graduates encounter uncertainty due to misalignment between university curricula and industry demands. CareerPilot AI supports <strong>SDG Target 8.6</strong> (reducing youth NEET rates) and <strong>SDG Target 8.2</strong> (economic productivity through technological innovation) by providing transparent, actionable career guidance.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                * Note: Fit scores represent educational alignment diagnostics, not a guarantee of employer hiring outcomes.
              </p>
            </div>

            <button
              onClick={openAuthModal}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 transition-all shrink-0 hover:scale-[1.02]"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="mt-auto border-t border-slate-200/90 dark:border-slate-800 glass-panel bg-white/80 dark:bg-slate-900/80 py-12 px-6 sm:px-12 text-sm text-slate-700 dark:text-slate-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white">CareerPilot AI</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Agentic Career Navigation Partner</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold">
            <button onClick={() => scrollToSection('features')} className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors">
              How It Works
            </button>
            <button onClick={() => setActiveTab('help')} className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors">
              Help & Documentation
            </button>
            <button onClick={openAuthModal} className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 transition-colors">
              Sign In
            </button>
            <button onClick={openAuthModal} className="font-extrabold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800">
              Get Started
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
          © {new Date().getFullYear()} CareerPilot AI. Built for university student empowerment under UN SDG 8.
        </div>
      </footer>
    </div>
  );
};
