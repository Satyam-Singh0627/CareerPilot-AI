import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Compass,
  LayoutDashboard,
  Sparkles,
  GitPullRequest,
  Calendar,
  FolderGit2,
  Bot,
  TrendingUp,
  Settings,
  UserCheck,
  Globe2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, profile, loadDemoProfile, isLoading } = useCareerPilot();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'recommendations', label: 'Careers', icon: Sparkles },
    { id: 'skillgap', label: 'Skill Gaps', icon: GitPullRequest },
    { id: 'roadmap', label: 'Roadmap', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'assistant', label: 'AI Advisor', icon: Bot },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab(profile ? 'dashboard' : 'landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  CareerPilot AI
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Agentic
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <Globe2 className="w-3 h-3 text-emerald-400" />
                <span>SDG 8 · Decent Work</span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {!profile ? (
              <>
                <button
                  onClick={loadDemoProfile}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Try Demo Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('onboarding')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/30 transition-all"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                    {profile.name.charAt(0)}
                  </div>
                  <div className="text-[11px] leading-tight">
                    <p className="font-medium text-slate-200 truncate max-w-[100px]">{profile.name}</p>
                    <p className="text-slate-400">{profile.field_of_study}</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  title="Settings & System Status"
                  className={`p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800 transition-all ${
                    activeTab === 'settings' ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30' : ''
                  }`}
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/90 px-3 py-2 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
