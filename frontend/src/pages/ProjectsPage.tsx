import React, { useState } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  FolderGit2,
  CheckCircle2,
  Terminal,
  Layers,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const {
    projects,
    selectedCareer,
    completedProjects,
    toggleProjectCompletion,
    setActiveTab
  } = useCareerPilot();

  const [levelFilter, setLevelFilter] = useState<string>('All');

  if (!projects.length || !selectedCareer) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4 text-purple-600">
          <FolderGit2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Select a Career Track</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Choose a career track to view curated portfolio projects recommended by our Project Agent.
        </p>
        <button
          onClick={() => setActiveTab('recommendations')}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all"
        >
          Browse Careers
        </button>
      </div>
    );
  }

  const filteredProjects = projects.filter((p) => {
    if (levelFilter === 'All') return true;
    return p.level.toLowerCase() === levelFilter.toLowerCase();
  });

  return (
    <div className="space-y-7 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-800 dark:text-purple-300 border border-purple-500/20">
            Portfolio Recommendation Agent
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Track: {selectedCareer.title}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Recruiter-Ready Portfolio Projects
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
          High-signal capstone projects strategically designed to demonstrate hands-on competency to internship recruiters.
          Mark completed projects to directly enhance your employability score.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                levelFilter === lvl
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white/90 dark:bg-slate-900 text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-2 border-slate-300 dark:border-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold">
          Showing {filteredProjects.length} Project Recommendations
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj, idx) => {
          const isDone = completedProjects.includes(proj.title);
          return (
            <div
              key={idx}
              className={`glass-card rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 ${
                isDone
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                  : 'bg-white/80 dark:bg-slate-900/75 border-white/90 dark:border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div>
                {/* Level badge & Completion status */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs uppercase font-bold px-3 py-1 rounded-full border ${
                      proj.level === 'Advanced'
                        ? 'bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/20'
                        : proj.level === 'Intermediate'
                        ? 'bg-teal-500/10 text-teal-800 dark:text-teal-300 border-teal-500/20'
                        : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20'
                    }`}
                  >
                    {proj.level} Tier
                  </span>

                  {isDone && (
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 fill-emerald-500/20" /> Added to Portfolio
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {proj.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tech Stack & Tools:</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech_stack.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200/80 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="mb-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-teal-600" />
                    <span>Recruiter Deliverable:</span>
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.deliverable || 'Production-ready code repository with comprehensive README, unit tests, and CI/CD demonstration.'}
                  </p>
                </div>
              </div>

              {/* Action Toggle */}
              <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {isDone ? 'Marked in portfolio' : 'Ready for implementation'}
                </span>

                <button
                  onClick={() => toggleProjectCompletion(proj.title)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDone ? 'Completed' : 'Mark Completed'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
