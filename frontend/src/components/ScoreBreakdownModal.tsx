import React from 'react';
import { CareerRecommendation } from '../types';
import { X, Sparkles, CheckCircle2, AlertCircle, BrainCircuit, ShieldAlert } from 'lucide-react';

interface ScoreBreakdownModalProps {
  recommendation: CareerRecommendation | null;
  onClose: () => void;
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({
  recommendation,
  onClose,
}) => {
  if (!recommendation) return null;

  const { breakdown, title, fit_score, matched_skills, missing_skills, domain } = recommendation;

  const metrics = [
    {
      label: 'Core Skills Overlap',
      weight: '40% weight',
      value: breakdown.core_skill_match_pct,
      desc: 'Direct match with essential prerequisites required in the field.',
      barColor: 'bg-emerald-500',
    },
    {
      label: 'Supplementary Tools & Frameworks',
      weight: '20% weight',
      value: breakdown.supplementary_skill_match_pct,
      desc: 'Secondary tooling, deployment tools, and adjacent libraries.',
      barColor: 'bg-teal-500',
    },
    {
      label: 'Interest & Target Role Alignment',
      weight: '20% weight',
      value: breakdown.interest_alignment_pct,
      desc: 'Keyword affinity with your target job roles, academic major, and topic interests.',
      barColor: 'bg-purple-500',
    },
    {
      label: 'TF-IDF Semantic Cosine Similarity',
      weight: '20% weight',
      value: breakdown.semantic_similarity_pct,
      desc: 'Algorithmic vector similarity between your profile corpus and the career ontology.',
      barColor: 'bg-sky-500',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-xl glass-panel bg-white/90 dark:bg-slate-900/90 border border-white/80 dark:border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                {domain}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Explainable AI Audit</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Fit Banner */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-white/60 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border border-emerald-500/20 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold">
              Profile-to-Role Alignment
            </p>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {Math.round(fit_score)}%
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                ({recommendation.readiness_level})
              </span>
            </div>
          </div>
          <BrainCircuit className="w-9 h-9 text-emerald-600 dark:text-emerald-400 opacity-80" />
        </div>

        {/* Alignment Disclaimer */}
        <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <strong>Measurement Note:</strong> This fit score measures mathematical alignment between your background and current role requirements. It is a guide to prioritize study, not a guarantee of employer hiring outcomes.
          </p>
        </div>

        {/* Breakdown Factors */}
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Weighted Score Components
          </h4>
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{m.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">({m.weight})</span>
                  <span className="font-bold text-slate-900 dark:text-white">{Math.round(m.value)}%</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full ${m.barColor} transition-all duration-500`}
                  style={{ width: `${Math.min(100, Math.max(0, m.value))}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Agent Rationale */}
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Analysis Agent Rationale</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{breakdown.rationale}</p>
        </div>

        {/* Skills Matched & Missing */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30">
            <p className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1 mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Matched Skills ({matched_skills.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {matched_skills.length > 0 ? (
                matched_skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 italic">None recorded</span>
              )}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30">
            <p className="font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1 mb-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> Key Skill Gaps ({missing_skills.length})
            </p>
            <div className="flex flex-wrap gap-1">
              {missing_skills.length > 0 ? (
                missing_skills.slice(0, 4).map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-rose-500/15 text-rose-800 dark:text-rose-300 text-[11px] font-medium"
                  >
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-slate-400 italic">No significant gaps</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
