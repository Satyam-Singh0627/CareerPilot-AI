import React, { useState } from 'react';
import { CareerRecommendation } from '../types';
import { FitScoreGauge } from './FitScoreGauge';
import { ScoreBreakdownModal } from './ScoreBreakdownModal';
import { useCareerPilot } from '../context/CareerPilotContext';
import {
  TrendingUp,
  DollarSign,
  ArrowRight,
  GitPullRequest,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Globe2
} from 'lucide-react';

interface CareerCardProps {
  recommendation: CareerRecommendation;
  isSelected?: boolean;
}

export const CareerCard: React.FC<CareerCardProps> = ({
  recommendation,
  isSelected = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { selectCareerAndAnalyze, setActiveTab } = useCareerPilot();

  const {
    career_id,
    title,
    domain,
    fit_score,
    industry_demand,
    avg_salary_usd,
    sdg_impact,
    matched_skills,
    missing_skills,
    readiness_level,
  } = recommendation;

  const handleSelectTrack = async () => {
    await selectCareerAndAnalyze(career_id);
    setActiveTab('roadmap');
  };

  const handleViewGaps = async () => {
    await selectCareerAndAnalyze(career_id);
    setActiveTab('skillgap');
  };

  return (
    <>
      <div
        className={`glass-card rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
          isSelected
            ? 'ring-2 ring-emerald-500 bg-white/90 dark:bg-slate-900/90 shadow-lg shadow-emerald-500/10'
            : 'bg-white/85 dark:bg-slate-900/80 hover:bg-white/95 dark:hover:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800'
        }`}
      >
        {/* Top bar with Domain, Title, and Gauge */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                  {domain}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    industry_demand === 'Very High'
                      ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/25'
                      : 'bg-teal-500/10 text-teal-800 dark:text-teal-300 border-teal-500/25'
                  }`}
                >
                  {industry_demand} Demand
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug">
                {title}
              </h3>
            </div>
            <FitScoreGauge score={fit_score} size="md" />
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 text-sm my-3 py-2.5 border-y border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span className="truncate font-bold text-slate-800 dark:text-slate-200">{avg_salary_usd}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span className="truncate text-slate-700 dark:text-slate-300 font-bold">
                {readiness_level.split('/')[0]}
              </span>
            </div>
          </div>

          {/* SDG Impact snippet */}
          <div className="mb-4 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 bg-slate-50/90 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 font-medium">
            <Globe2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-relaxed">{sdg_impact}</p>
          </div>

          {/* Skills Breakdown Tags */}
          <div className="space-y-3 mb-4">
            <div>
              <p className="text-xs uppercase font-extrabold text-emerald-800 dark:text-emerald-400 flex items-center gap-1 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Matched Skills ({matched_skills.length})</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {matched_skills.length > 0 ? (
                  matched_skills.slice(0, 3).map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/25"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-xs italic font-medium">Foundational start</span>
                )}
                {matched_skills.length > 3 && (
                  <span className="px-2 py-1 text-xs text-slate-600 dark:text-slate-400 font-bold">
                    +{matched_skills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase font-extrabold text-rose-800 dark:text-rose-400 flex items-center gap-1 mb-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
                <span>Key Skill Gaps ({missing_skills.length})</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {missing_skills.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-800 dark:text-rose-300 text-xs font-bold border border-rose-500/25"
                  >
                    {s}
                  </span>
                ))}
                {missing_skills.length > 3 && (
                  <span className="px-2 py-1 text-xs text-slate-600 dark:text-slate-400 font-bold">
                    +{missing_skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>Audit Score</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleViewGaps}
              className="px-3 py-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <GitPullRequest className="w-3.5 h-3.5 text-slate-600" />
              <span>Gaps</span>
            </button>
            <button
              onClick={handleSelectTrack}
              className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm shadow-emerald-600/25 transition-all flex items-center gap-1 hover:scale-[1.02]"
            >
              <span>Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ScoreBreakdownModal
          recommendation={recommendation}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
