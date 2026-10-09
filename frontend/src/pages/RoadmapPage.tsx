import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { RoadmapTimeline } from '../components/RoadmapTimeline';
import {
  Calendar,
  Clock,
  Award,
  RotateCcw
} from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const {
    roadmap,
    selectedCareer,
    profile,
    refreshAnalysis,
    setActiveTab,
    isLoading
  } = useCareerPilot();

  if (!roadmap || !selectedCareer) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <Calendar className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto mb-4 animate-pulse" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Active Roadmap</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Choose a career track to generate your personalized 12-week milestone schedule.
        </p>
        <button
          onClick={() => setActiveTab('recommendations')}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all"
        >
          Select Career Track
        </button>
      </div>
    );
  }

  const weeklyHours = profile?.weekly_hours_available || 15;
  const totalHours = weeklyHours * 12;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20">
              Personalized Learning Planner
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Track: {selectedCareer.title}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            12-Week Progressive Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Structured weekly milestones calibrated to your existing skills and weekly study commitment.
            Complete tasks and mark off milestones to improve your employability score.
          </p>
        </div>

        <button
          onClick={refreshAnalysis}
          disabled={isLoading}
          className="px-4 py-2 rounded-xl glass-card bg-white/75 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-bold flex items-center gap-2 self-start sm:self-auto transition-colors shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Regenerate Roadmap</span>
        </button>
      </div>

      {/* Pacing Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            <Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Weekly Dedication</span>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">{weeklyHours} Hours / Week</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">Adaptable via profile settings</p>
        </div>

        <div className="glass-card p-4 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            <Calendar className="w-4 h-4 text-purple-700 dark:text-purple-400" />
            <span>Total Learning Span</span>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">12 Weeks (~3 Months)</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">3 progressive milestone phases</p>
        </div>

        <div className="glass-card p-4 rounded-3xl bg-white/85 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            <Award className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            <span>Target Capstone Hours</span>
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">{totalHours} Focused Hours</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">Yields 2 verified portfolio assets</p>
        </div>
      </div>

      {/* Interactive Timeline Component */}
      <RoadmapTimeline roadmap={roadmap} />
    </div>
  );
};
