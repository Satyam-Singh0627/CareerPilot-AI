import React from 'react';
import { Globe2, ShieldCheck, BookOpen, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/70 dark:border-slate-800 bg-white/60 dark:bg-slate-950/70 text-slate-500 dark:text-slate-400 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand & SDG Column */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white text-base">CareerPilot AI</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              UN SDG 8 Initiative
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
            Empowering university students and early-career jobseekers with transparent AI career matching,
            explainable skill diagnostics, and adaptive weekly milestones.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 p-2.5 rounded-xl max-w-md">
            <Globe2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              <strong>UN SDG Goal 8 Target 8.6:</strong> Substantially reduce the proportion of youth not in employment, education or training.
            </span>
          </div>
        </div>

        {/* Multi-Agent Architecture */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Agent Ecosystem
          </h4>
          <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Career Analysis Agent</li>
            <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" /> Skill Gap Analysis Agent</li>
            <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-sky-600 dark:text-sky-400" /> Learning Planner Agent</li>
            <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" /> Project Recommendation Agent</li>
            <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Career Readiness Agent</li>
            <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Orchestrator Agent</li>
          </ul>
        </div>

        {/* Academic / Internship Disclaimer */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Project Integrity
          </h4>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
            <p className="flex items-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>100% explainable matching using Scikit-Learn TF-IDF and weighted criteria.</span>
            </p>
            <p className="flex items-start gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Deterministic local fallback — runs reliably without external API keys.</span>
            </p>
            <p className="text-[11px] text-slate-400 italic pt-1">
              * Educational project advisory tool. Does not claim to predict actual employer hiring outcomes.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200/60 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <p>© 2026 CareerPilot AI — Final Internship Project.</p>
        <p className="flex items-center gap-1">
          Built with React 19, FastAPI & SQLite for Decent Work & Economic Growth
        </p>
      </div>
    </footer>
  );
};
