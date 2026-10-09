import React, { useState } from 'react';
import { LearningRoadmap } from '../types';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Terminal,
  Layers
} from 'lucide-react';

interface RoadmapTimelineProps {
  roadmap: LearningRoadmap | null;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ roadmap }) => {
  const { completedMilestones, toggleMilestoneCompletion } = useCareerPilot();
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1, 2]);

  if (!roadmap || !roadmap.milestones.length) {
    return (
      <div className="p-8 text-center text-slate-500 dark:text-slate-400 glass-card rounded-3xl">
        <Sparkles className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2 opacity-60" />
        <p className="text-sm font-medium">Select a career track to generate your personalized 12-week roadmap.</p>
      </div>
    );
  }

  const milestones = roadmap.milestones;
  const completedCount = milestones.filter((m) => completedMilestones.includes(m.week)).length;
  const progressPct = Math.round((completedCount / milestones.length) * 100);

  const toggleExpand = (week: number) => {
    if (expandedWeeks.includes(week)) {
      setExpandedWeeks(expandedWeeks.filter((w) => w !== week));
    } else {
      setExpandedWeeks([...expandedWeeks, week]);
    }
  };

  const getPhaseHeader = (week: number) => {
    if (week === 1) {
      return {
        title: 'Phase 1: Foundations & Core Prerequisites (Weeks 1–4)',
        desc: 'Bridge high-priority technical gaps and build small proof-of-concept scripts.',
        badge: 'Core Foundations',
        color: 'text-emerald-800 dark:text-emerald-300 border-emerald-500/20 bg-emerald-500/10'
      };
    }
    if (week === 5) {
      return {
        title: 'Phase 2: Systems Integration & Frameworks (Weeks 5–8)',
        desc: 'Connect databases, develop reliable APIs, and implement automated testing.',
        badge: 'Intermediate Engineering',
        color: 'text-purple-800 dark:text-purple-300 border-purple-500/20 bg-purple-500/10'
      };
    }
    if (week === 9) {
      return {
        title: 'Phase 3: Production Readiness & Portfolio Capstone (Weeks 9–12)',
        desc: 'Deploy containers to live cloud infrastructure and prepare recruiter deliverables.',
        badge: 'Capstone Polish',
        color: 'text-teal-800 dark:text-teal-300 border-teal-500/20 bg-teal-500/10'
      };
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Roadmap Header & Progress Bar */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                12-Week Adaptive Curriculum
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Track: {roadmap.career_title}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              Milestone Progress Tracker
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <div className="flex items-baseline sm:justify-end gap-1.5">
              <span className="text-3xl font-black text-slate-900 dark:text-white">{completedCount}</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm">/ {milestones.length} Weeks Complete</span>
            </div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">{progressPct}% Completed</p>
          </div>
        </div>

        {/* Progress track */}
        <div className="w-full bg-slate-200/80 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {milestones.map((m) => {
          const phase = getPhaseHeader(m.week);
          const isCompleted = completedMilestones.includes(m.week);
          const isExpanded = expandedWeeks.includes(m.week);

          return (
            <React.Fragment key={m.week}>
              {/* Phase Banner */}
              {phase && (
                <div className="pt-4 pb-1">
                  <div className="glass-panel p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                    <div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${phase.color}`}>
                        {phase.badge}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {phase.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Milestone Card */}
              <div
                className={`glass-card rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-white/80 dark:bg-slate-900/75 border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => toggleMilestoneCompletion(m.week)}
                      aria-label={`Mark week ${m.week} as ${isCompleted ? 'incomplete' : 'complete'}`}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Week {m.week}</span>
                        {isCompleted && (
                          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            Completed
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-base font-bold cursor-pointer ${
                          isCompleted
                            ? 'text-slate-500 dark:text-slate-400 line-through'
                            : 'text-slate-900 dark:text-white'
                        }`}
                        onClick={() => toggleExpand(m.week)}
                      >
                        {m.title.replace(/^Week \d+:\s*/, '')}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                        <span className="flex items-center gap-1 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {m.estimated_hours} hrs/week
                        </span>
                        <div className="flex items-center gap-1 font-medium">
                          <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Focus: {m.focus_skills.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(m.week)}
                    aria-label={isExpanded ? "Collapse week details" : "Expand week details"}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Collapsible details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-200/70 dark:border-slate-800 mt-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Learning Objectives
                      </p>
                      <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                        {m.learning_objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                        <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Recommended Action Items
                      </p>
                      <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                        {m.recommended_activities.map((act, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
