import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Compass,
  LayoutDashboard,
  User,
  Sparkles,
  GitPullRequest,
  Calendar,
  FolderGit2,
  Bot,
  TrendingUp,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Globe2,
  X,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const {
    activeTab,
    setActiveTab,
    profile,
    isDemoProfile,
    loadDemoProfile,
    promptLogout,
    isLoading
  } = useCareerPilot();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'onboarding', label: 'My Profile', icon: User },
    { id: 'recommendations', label: 'Career Matches', icon: Sparkles },
    { id: 'skillgap', label: 'Skill Gap Analysis', icon: GitPullRequest },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'assistant', label: 'AI Career Assistant', icon: Bot },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'help', label: 'Help & Guide', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobileOpen) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col glass-panel bg-white/90 dark:bg-slate-900/90 border-r border-slate-200/90 dark:border-slate-800 transition-all duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Brand Header */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800">
          <div
            onClick={() => handleNavClick(profile ? 'dashboard' : 'landing')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0 text-white">
              <Compass className="w-5 h-5" />
            </div>

            {!isCollapsed && (
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base text-slate-900 dark:text-white truncate">
                    CareerPilot
                  </span>
                  <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/25">
                    AI
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 truncate font-semibold">
                  <Globe2 className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
                  <span>SDG 8 · Decent Work</span>
                </p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:flex p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Toggle */}
          <button
            onClick={onCloseMobile}
            aria-label="Close sidebar menu"
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 font-extrabold shadow-xs border border-emerald-500/30'
                    : 'text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800/70'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Student Profile Summary */}
        <div className="p-3.5 border-t border-slate-200/80 dark:border-slate-800">
          {!profile ? (
            <button
              onClick={loadDemoProfile}
              disabled={isLoading}
              title={isCollapsed ? 'Load Demo Student' : undefined}
              className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all flex items-center gap-2 justify-center ${
                isCollapsed ? 'px-0' : ''
              }`}
            >
              <UserCheck className="w-4 h-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
              {!isCollapsed && <span>Try Demo Profile</span>}
            </button>
          ) : (
            <div className="space-y-2">
              <div
                onClick={() => handleNavClick('onboarding')}
                className={`flex items-center gap-3 p-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-emerald-500/50 transition-all ${
                  isCollapsed ? 'justify-center p-2' : ''
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-xs">
                  {profile.name.charAt(0)}
                </div>
                {!isCollapsed && (
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                      {profile.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate">
                      {isDemoProfile ? 'Demo Student (Alex Rivera)' : profile.field_of_study || 'Student'}
                    </p>
                  </div>
                )}
              </div>

              {!isCollapsed && (
                <button
                  onClick={promptLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-300 dark:border-rose-900/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
