import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
  ArrowRight,
  Layers
} from 'lucide-react';

export const SkillGapPage: React.FC = () => {
  const {
    skillGap,
    selectedCareer,
    completedSkills,
    toggleSkillCompletion,
    setActiveTab
  } = useCareerPilot();

  if (!skillGap || !selectedCareer) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="w-16 h-16 rounded-3xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4 text-teal-600">
          <GitPullRequest className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Select a Career Track</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Choose a career pathway to run comprehensive, mathematical skill-gap diagnostics.
        </p>
        <button
          onClick={() => setActiveTab('recommendations')}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white shadow-md shadow-emerald-600/25 transition-all"
        >
          Browse Career Matches
        </button>
      </div>
    );
  }

  const {
    career_title,
    matched_skills,
    missing_core_skills,
    missing_supplementary_skills,
    skill_match_percentage,
    gap_summary,
    prioritized_gaps
  } = skillGap;

  return (
    <div className="space-y-7 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/25">
            Competency Gap Diagnostic
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Track: {career_title}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Skill-Gap Analysis & Action Plan
        </h1>
        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed font-medium">
          Separates your mastered competencies from missing requirements, explains why each skill matters, and maps verified free documentation.
        </p>
      </div>

      {/* Match Percentage Banner */}
      <div className="glass-panel p-7 rounded-3xl bg-white/85 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs text-slate-600 dark:text-slate-400 uppercase font-bold tracking-wider">
              Technical Prerequisites Overlap
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{skill_match_percentage}%</span>
              <span className="text-sm text-slate-700 dark:text-slate-400 font-semibold">
                of required track competencies acquired
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 self-start sm:self-auto hover:scale-[1.02]"
          >
            <span>View 12-Week Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${skill_match_percentage}%` }}
          />
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 leading-relaxed">
          {gap_summary}
        </p>
      </div>

      {/* Three Comparison Containers: Matched, Critical Gaps, Supplementary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Mastered Skills */}
        <div className="glass-panel p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Mastered Skills ({matched_skills.length})</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Competencies you already have from coursework and past projects.
          </p>
          <div className="flex flex-wrap gap-2">
            {matched_skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 text-xs sm:text-sm font-semibold"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Column 2: Missing Core Skills */}
        <div className="glass-panel p-6 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-rose-800 dark:text-rose-300 font-bold text-base">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span>Critical Core Gaps ({missing_core_skills.length})</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Essential prerequisites needed for internship screening evaluations.
          </p>
          <div className="flex flex-wrap gap-2">
            {missing_core_skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/25 text-xs sm:text-sm font-semibold"
              >
                ! {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Column 3: Missing Supplementary Tools */}
        <div className="glass-panel p-6 rounded-3xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/40 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-sky-800 dark:text-sky-300 font-bold text-base">
            <Layers className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <span>Supplementary Tools ({missing_supplementary_skills.length})</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Productivity tools, cloud environments, and secondary frameworks.
          </p>
          <div className="flex flex-wrap gap-2">
            {missing_supplementary_skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-sky-500/15 text-sky-800 dark:text-sky-300 border border-sky-500/25 text-xs sm:text-sm font-semibold"
              >
                + {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Prioritized Action Plan & Explanations */}
      <div className="glass-panel p-7 rounded-3xl bg-white/80 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Prioritized Action Curriculum & Free Learning Resources
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Detailed breakdown explaining why each competency matters for {career_title}, with vetted learning links and completion checkboxes.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {prioritized_gaps.map((item, idx) => {
            const isCompleted = completedSkills.includes(item.skill);
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-white/85 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleSkillCompletion(item.skill)}
                      className="text-slate-400 hover:text-emerald-600 transition-colors"
                      title={isCompleted ? 'Mark unlearned' : 'Mark skill mastered'}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          isCompleted ? 'text-emerald-600 fill-emerald-500/20' : 'text-slate-400'
                        }`}
                      />
                    </button>
                    <div>
                      <h4
                        className={`text-base font-bold ${
                          isCompleted ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {item.skill}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-xs uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                            item.priority === 'high'
                              ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                              : 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20'
                          }`}
                        >
                          {item.priority} Priority
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> ~{item.learning_effort_weeks} Weeks to master
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSkillCompletion(item.skill)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {isCompleted ? '✓ Marked Mastered' : 'Mark as Mastered'}
                  </button>
                </div>

                {/* Vetted Resources Links */}
                <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Vetted Free Learning Documentation:</span>
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    {item.recommended_resources.map((res, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
