import React, { useState, useEffect } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { api } from '../services/api';
import {
  Server,
  Key,
  Globe2,
  ShieldCheck,
  Database,
  Sun,
  Moon,
  Sparkles,
  LogOut
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    profile,
    isDemoProfile,
    loadDemoProfile,
    setActiveTab,
    isLoading,
    theme,
    toggleTheme,
    startTour,
    promptLogout
  } = useCareerPilot();
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    api.getHealth().then(setHealth).catch(console.error);
  }, []);

  return (
    <div className="space-y-7 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Preferences & Diagnostics
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Settings & Environment Telemetry
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
          Manage your theme, replay the interactive product tour, view live backend telemetry, and manage your account session.
        </p>
      </div>

      {/* Account Session & Sign Out Card */}
      <div className="glass-panel p-7 rounded-3xl bg-white/80 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Account Session</h3>

        {profile ? (
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {profile.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{profile.name}</p>
                  {isDemoProfile ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      Sample Demo
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      Active Account
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {profile.email || `${profile.field_of_study} (Class of ${profile.graduation_year})`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('onboarding')}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={promptLogout}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">No active student profile loaded.</span>
            <button
              onClick={loadDemoProfile}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
            >
              Load Demo Profile
            </button>
          </div>
        )}
      </div>

      {/* Theme & Product Tour Panel */}
      <div className="glass-panel p-7 rounded-3xl bg-white/80 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Appearance & Interactive Guidance</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Theme Preference</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Current: <span className="capitalize font-semibold text-emerald-600 dark:text-emerald-400">{theme} Mode</span>
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>Switch to Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Switch to Light</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Interactive Tour</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Replay the 6-step guided walkthrough</p>
            </div>
            <button
              onClick={startTour}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* Backend & AI Infrastructure Status */}
      <div className="glass-panel p-7 rounded-3xl bg-white/80 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Backend & Multi-Agent Telemetry</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
            <span className="text-slate-500 dark:text-slate-400 block mb-1">FastAPI Backend</span>
            <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{health ? 'Healthy & Connected' : 'Checking...'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
            <span className="text-slate-500 dark:text-slate-400 block mb-1">Career Catalog Size</span>
            <div className="flex items-center gap-1.5 font-bold text-teal-700 dark:text-teal-400 text-sm">
              <Database className="w-4 h-4" />
              <span>{health?.career_catalog_size || 22} Registered Tracks</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700">
            <span className="text-slate-500 dark:text-slate-400 block mb-1">AI Mode</span>
            <div className="flex items-center gap-1.5 font-bold text-purple-700 dark:text-purple-400 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span className="truncate">{health?.llm_status || 'Deterministic Fallback'}</span>
            </div>
          </div>
        </div>

        {/* LLM Key Guide */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 text-xs sm:text-sm space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
            <Key className="w-4 h-4" />
            <span>Deterministic ML vs Optional External LLM</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
            CareerPilot AI operates autonomously with <strong>zero external API keys required</strong> using scikit-learn TF-IDF vectorization and multi-factor rule bases.
            To optionally test live Google Gemini summaries, configure <code className="bg-white/80 dark:bg-slate-900 px-1.5 py-0.5 rounded text-emerald-700 dark:text-emerald-400">GEMINI_API_KEY</code> in <code className="bg-white/80 dark:bg-slate-900 px-1.5 py-0.5 rounded text-emerald-700 dark:text-emerald-400">backend/.env</code> and restart the server.
          </p>
        </div>
      </div>

      {/* UN SDG 8 Framework Alignment */}
      <div className="glass-panel p-6 rounded-3xl bg-white/80 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400">
          <Globe2 className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">United Nations SDG 8 Alignment</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Goal 8: Decent Work and Economic Growth.</strong> CareerPilot AI supports Target 8.6 (reducing youth NEET rates) and Target 8.2 (technological productivity) by equipping university students with transparent skill-gap diagnostics and verified roadmaps.
        </p>
      </div>
    </div>
  );
};
