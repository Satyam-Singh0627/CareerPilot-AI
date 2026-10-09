import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  TrendingUp,
  CheckCircle2,
  Globe2,
  Sparkles,
  Calendar,
  FolderGit2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

export const ProgressPage: React.FC = () => {
  const {
    readiness,
    selectedCareer,
    completedSkills,
    completedMilestones,
    completedProjects,
    roadmap,
    toggleSkillCompletion,
    profile,
    theme
  } = useCareerPilot();

  if (!readiness || !selectedCareer) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <TrendingUp className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4 animate-pulse" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Active Trajectory</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Set up your profile to review your employability readiness evaluation.
        </p>
      </div>
    );
  }

  const {
    overall_readiness_score,
    technical_skills_readiness,
    portfolio_readiness,
    learning_pace_readiness,
    status,
    strengths,
    priority_action_items,
    sdg_empowerment_note
  } = readiness;

  const chartData = [
    { name: 'Technical Skills', score: technical_skills_readiness, color: '#10B981' },
    { name: 'Portfolio Proof', score: portfolio_readiness, color: '#14B8A6' },
    { name: 'Learning Pace', score: learning_pace_readiness, color: '#0EA5E9' },
    { name: 'Overall Score', score: overall_readiness_score, color: '#8B5CF6' }
  ];

  const isDark = theme === 'dark';
  const tickColor = isDark ? '#D1D5DB' : '#374151';
  const tooltipBg = isDark ? '#0F172A' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#D1D5DB';
  const tooltipText = isDark ? '#F8FAFC' : '#1F2923';

  const totalMilestones = roadmap?.total_weeks || 12;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
            Employability Readiness Audit
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Target Track: {selectedCareer.title}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Progress Tracking & Readiness Benchmark
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Monitors your cumulative acquisition of technical competencies, weekly milestones, and verified portfolio capstones.
        </p>
      </div>

      {/* Main Readiness Gauge & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Score Card */}
        <div className="glass-panel p-6 rounded-3xl bg-white/80 dark:bg-slate-900/85 border border-emerald-500/25 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Overall Employability Score
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-5xl font-black text-slate-900 dark:text-white">{Math.round(overall_readiness_score)}</span>
              <span className="text-lg text-emerald-600 dark:text-emerald-400 font-bold">/ 100</span>
            </div>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1">{status}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Calculated dynamically from verified technical competencies (50%), portfolio project depth (30%),
              and weekly learning dedication (20%).
            </p>
          </div>

          <div className="pt-5 border-t border-slate-200/70 dark:border-slate-800 mt-6 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-700 dark:text-slate-300">Technical Skills Coverage</span>
                <span className="font-bold text-slate-900 dark:text-white">{Math.round(technical_skills_readiness)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${technical_skills_readiness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-700 dark:text-slate-300">Portfolio Proof</span>
                <span className="font-bold text-slate-900 dark:text-white">{Math.round(portfolio_readiness)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-teal-500"
                  style={{ width: `${portfolio_readiness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span className="text-slate-700 dark:text-slate-300">Learning Dedication Pace</span>
                <span className="font-bold text-slate-900 dark:text-white">{Math.round(learning_pace_readiness)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{ width: `${learning_pace_readiness}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visual Pillars Recharts Bar */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Readiness Dimensions</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Comparison across core evaluation pillars for competitive internship applications.
            </p>
            <div className="w-full h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 11, fontWeight: 500 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: tickColor, fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      borderColor: tooltipBorder,
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: tooltipText,
                      boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.08)'
                    }}
                  />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SDG Alignment Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 text-xs text-slate-700 dark:text-slate-300 mt-4">
            <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold mb-1">
              <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>UN SDG 8 · Decent Work & Economic Growth Impact</span>
            </div>
            <p className="leading-relaxed text-[11px]">{sdg_empowerment_note}</p>
          </div>
        </div>
      </div>

      {/* Real Accomplishments Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-3xl bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Roadmap Milestones ({completedMilestones.length} / {totalMilestones})
            </h4>
          </div>
          {completedMilestones.length > 0 ? (
            <p className="text-xs text-slate-600 dark:text-slate-300">
              You have completed {completedMilestones.length} of {totalMilestones} weekly milestones ({Math.round((completedMilestones.length / totalMilestones) * 100)}%).
            </p>
          ) : (
            <p className="text-xs text-slate-400 italic">
              No roadmap milestones marked completed yet. Visit your Learning Roadmap to track weekly progress.
            </p>
          )}
        </div>

        <div className="glass-panel p-5 rounded-3xl bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <FolderGit2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Portfolio Projects ({completedProjects.length})
            </h4>
          </div>
          {completedProjects.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {completedProjects.map((p, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-500/25 text-xs font-semibold"
                >
                  ✓ {p}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              No capstone projects built yet. Check the Projects tab for suggested recruiter deliverables.
            </p>
          )}
        </div>
      </div>

      {/* Strengths and Priority Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identified Strengths */}
        <div className="glass-panel p-6 rounded-3xl bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Demonstrated Competitive Strengths</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-50/80 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Priority Action Items */}
        <div className="glass-panel p-6 rounded-3xl bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>High-Impact Next Steps</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {priority_action_items.map((act, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-50/80 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skills Mastered Checklist */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Skills Mastered Tracker</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Toggle any skill to simulate or register learning. Your readiness score automatically recalibrates.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 self-start sm:self-auto">
            {profile?.current_skills.length || 0} Initial + {completedSkills.length} Completed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          {selectedCareer.core_skills.map((skill, i) => {
            const isDone = completedSkills.includes(skill) || profile?.current_skills.includes(skill);
            return (
              <button
                key={i}
                onClick={() => toggleSkillCompletion(skill)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isDone
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-semibold'
                    : 'bg-white/70 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <span className="truncate">{skill}</span>
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${isDone ? 'text-emerald-600 fill-emerald-500/20' : 'text-slate-400'}`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
