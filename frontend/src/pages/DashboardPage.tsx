import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  Sparkles,
  GitPullRequest,
  Calendar,
  FolderGit2,
  Bot,
  ArrowRight,
  User,
  UserCheck,
  Compass
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    profile,
    selectedCareer,
    recommendations,
    skillGap,
    roadmap,
    completedMilestones,
    completedProjects,
    setActiveTab,
    loadDemoProfile,
    isLoading
  } = useCareerPilot();

  // Empty state for unauthenticated / new visitor
  if (!profile) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 px-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto mb-5 text-emerald-700 dark:text-emerald-400 shadow-sm">
          <Compass className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
          No Student Profile Found
        </h2>
        <p className="text-base text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
          Create your student profile or explore our sample university student profile to view your personalized dashboard and career plan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('onboarding')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white shadow-md shadow-emerald-600/25 transition-all"
          >
            Start Student Onboarding
          </button>
          <button
            onClick={loadDemoProfile}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-card bg-white/90 dark:bg-slate-800/90 border-2 border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-slate-100 hover:border-emerald-600 transition-all flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Try Sample Demo (Alex Rivera)</span>
          </button>
        </div>
      </div>
    );
  }

  // Active top career match
  const topCareer = selectedCareer || (recommendations.length > 0 ? recommendations[0] : null);
  const topFitScore = topCareer && 'fit_score' in topCareer ? Math.round(topCareer.fit_score) : 85;

  const totalWeeks = roadmap?.total_weeks || 12;
  const milestonesDone = completedMilestones.length;
  const missingCoreCount = skillGap?.missing_core_skills?.length || 0;
  const topMissingSkill = skillGap?.missing_core_skills?.[0] || 'Foundations';

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* ============================================================== */}
      {/* SECTION A: Welcome Section                                     */}
      {/* ============================================================== */}
      <section className="glass-panel p-7 sm:p-9 rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 text-xs font-bold">
              <span>{profile.education_level || 'Student'}</span>
              <span>·</span>
              <span>Class of {profile.graduation_year || 2027}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {profile.name}! 👋
            </h1>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {topCareer ? (
                <>
                  Your current roadmap focuses on becoming a{' '}
                  <strong className="text-emerald-800 dark:text-emerald-300 font-extrabold">
                    {topCareer.title}
                  </strong>
                  . Continue following your weekly milestones to bridge remaining skill gaps.
                </>
              ) : (
                <>
                  Next recommended step: discover your top career matches and identify your technical skill gaps.
                </>
              )}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {topCareer ? (
              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Continue Your Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('recommendations')}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Find My Career Matches</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION B: Four Summary Cards (No Text Clipping)               */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Top Career Match */}
        <div className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-h-[170px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Top Match
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
              {topCareer?.title || 'No Role Selected'}
            </h3>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Alignment:</span>
            <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
              {topCareer ? `${topFitScore}% Fit` : 'Not computed'}
            </span>
          </div>
        </div>

        {/* Card 2: Skills to Improve (No Truncation) */}
        <div className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-h-[170px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Skills to Improve
              </span>
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                <GitPullRequest className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
              {missingCoreCount > 0 ? `${missingCoreCount} Core Skills` : 'All Gaps Clear'}
            </h3>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 shrink-0">Priority:</span>
            <span className="text-sm font-bold text-teal-700 dark:text-teal-400 text-right leading-tight break-words">
              {missingCoreCount > 0 ? topMissingSkill : 'On Track'}
            </span>
          </div>
        </div>

        {/* Card 3: Learning Progress */}
        <div className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-h-[170px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Learning Progress
              </span>
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
              {milestonesDone} of {totalWeeks} Weeks
            </h3>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/80">
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (milestonesDone / totalWeeks) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 4: Portfolio Projects */}
        <div className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between min-h-[170px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Portfolio Projects
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                <FolderGit2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
              {completedProjects.length > 0
                ? `${completedProjects.length} Completed`
                : 'Ready to Build'}
            </h3>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Status:</span>
            <span className="text-sm font-bold text-purple-700 dark:text-purple-400">
              {completedProjects.length > 0 ? 'Verified Work' : 'Ideas Ready'}
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION C: Recommended Career Focus (High-Contrast Action)     */}
      {/* ============================================================== */}
      {topCareer && (
        <section className="glass-panel p-7 sm:p-8 rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25">
                  Recommended Career Focus
                </span>
                <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                  {topFitScore}% Alignment
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {topCareer.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                This track directly matches your reported technical coursework and career aspirations. Fit scores represent profile-to-role educational synergy to help you prioritize study time.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => setActiveTab('recommendations')}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>View Career Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* SECTION D: Next Steps                                          */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Next Steps for Your Career Plan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1: Complete Profile */}
          <div
            onClick={() => setActiveTab('onboarding')}
            className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-emerald-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Complete Profile
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Keep your degree, coursework, and technical skills updated.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-4">
              <span>Edit Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 2: Review Skill Gaps */}
          <div
            onClick={() => setActiveTab('skillgap')}
            className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-teal-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <GitPullRequest className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Review Skill Gaps
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Explore high-priority prerequisites and verified documentation.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1 mt-4">
              <span>Diagnose Gaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 3: Continue Roadmap */}
          <div
            onClick={() => setActiveTab('roadmap')}
            className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-sky-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-700 dark:text-sky-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Continue Roadmap
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Follow your structured 12-week schedule milestone by milestone.
              </p>
            </div>
            <span className="text-xs font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1 mt-4">
              <span>View Milestones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 4: Explore Projects */}
          <div
            onClick={() => setActiveTab('projects')}
            className="glass-card p-6 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-purple-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-700 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                Explore Projects
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Build recruiter-ready capstones with defined deliverables.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1 mt-4">
              <span>Browse Capstones</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION E: AI Career Advisor Summary                           */}
      {/* ============================================================== */}
      <section className="glass-panel p-6 sm:p-7 rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              AI Career Advisor
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              Get immediate guidance on pacing your roadmap, preparing for interviews, or selecting capstones.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('assistant')}
          className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 shrink-0 hover:scale-[1.02]"
        >
          <span>Ask AI Advisor</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
