import React, { useState, useRef, useEffect } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Menu,
  Sun,
  Moon,
  HelpCircle,
  Sparkles,
  UserCheck,
  User,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface TopBarProps {
  onOpenMobile: () => void;
  isCollapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMobile }) => {
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    startTour,
    profile,
    isDemoProfile,
    loadDemoProfile,
    promptLogout,
    isLoading
  } = useCareerPilot();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageMeta = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Student Dashboard',
          subtitle: 'Holistic career trajectory, active recommendations & readiness audit'
        };
      case 'onboarding':
        return {
          title: 'My Profile & Preferences',
          subtitle: 'Update your degree, technical competencies, target roles & study dedication'
        };
      case 'recommendations':
        return {
          title: 'Career Matches',
          subtitle: '22+ tech pathways evaluated using explainable profile-to-role alignment'
        };
      case 'skillgap':
        return {
          title: 'Skill Gap Analysis',
          subtitle: 'Compare existing competencies against market prerequisites with verified resources'
        };
      case 'roadmap':
        return {
          title: 'Learning Roadmap',
          subtitle: 'Personalized 12-week progressive curriculum with persistent milestone tracking'
        };
      case 'projects':
        return {
          title: 'Portfolio Projects',
          subtitle: 'Recruiter-ready capstone solutions with production tech stacks and deliverables'
        };
      case 'assistant':
        return {
          title: 'AI Career Assistant',
          subtitle: 'Cooperating 6-agent ecosystem with transparent routing & deterministic fallback'
        };
      case 'progress':
        return {
          title: 'Employability Progress',
          subtitle: 'Dynamic readiness scoring and SDG 8 empowerment tracking'
        };
      case 'help':
        return {
          title: 'Help & User Guide',
          subtitle: 'Documentation of all application features, multi-agent logic & tour replay'
        };
      case 'settings':
        return {
          title: 'Settings & Telemetry',
          subtitle: 'System configurations, SQLite ID management & optional API key integration'
        };
      default:
        return {
          title: 'CareerPilot AI',
          subtitle: 'Agentic AI Career Advisor for University Students'
        };
    }
  };

  const meta = getPageMeta(activeTab);

  return (
    <header className="sticky top-0 z-30 h-20 glass-panel bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between px-5 sm:px-8 transition-all">
      {/* Left: Mobile hamburger & Contextual Page Title */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onOpenMobile}
          aria-label="Open mobile menu"
          className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white truncate leading-tight">
            {meta.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate hidden sm:block font-medium">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Actions (Tour, Theme, Help, Profile Menu) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Interactive Tour Button */}
        <button
          onClick={startTour}
          className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all flex items-center gap-1.5 shadow-xs"
          title="Start interactive 6-step product tour"
        >
          <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span className="hidden md:inline">Product Tour</span>
        </button>

        {/* Help Link */}
        <button
          onClick={() => setActiveTab('help')}
          aria-label="Open Help & User Guide"
          className={`p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-colors ${
            activeTab === 'help' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-700' : ''
          }`}
          title="Help & User Guide"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
          className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-colors"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-slate-700" />
          ) : (
            <Sun className="w-5 h-5 text-amber-400" />
          )}
        </button>

        {/* Profile Dropdown Menu */}
        {profile ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-all shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                {profile.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate max-w-[110px]">
                  {profile.name}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate">
                  {isDemoProfile ? 'Sample Demo' : 'Student Account'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
            </button>

            {/* Dropdown Card */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 shadow-xl p-2 z-50 animate-fade-in text-sm">
                <div className="px-3 py-2 border-b border-slate-200/80 dark:border-slate-800">
                  <p className="font-extrabold text-slate-900 dark:text-white truncate">
                    {profile.name}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate">
                    {profile.email || 'Student Profile'}
                  </p>
                  {isDemoProfile && (
                    <span className="inline-block mt-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-400 border border-amber-500/30">
                      Demo Mode Active
                    </span>
                  )}
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveTab('onboarding');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold"
                  >
                    <User className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveTab('settings');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold"
                  >
                    <Settings className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                    <span>Settings & Preferences</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveTab('help');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold"
                  >
                    <HelpCircle className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                    <span>Help & Guide</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-200/80 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      promptLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={loadDemoProfile}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xs transition-all"
          >
            <UserCheck className="w-4 h-4" />
            <span>Load Demo</span>
          </button>
        )}
      </div>
    </header>
  );
};
