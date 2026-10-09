import React, { useState, useEffect } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { CareerCard } from '../components/CareerCard';
import { api } from '../services/api';
import {
  Search,
  Info,
  ShieldAlert
} from 'lucide-react';

export const CareerRecommendationsPage: React.FC = () => {
  const { recommendations, selectedCareer } = useCareerPilot();
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    api.getDomains().then(setDomains).catch(console.error);
  }, []);

  // Filter recommendations based on domain and search query
  const filteredRecs = recommendations.filter((rec) => {
    const matchesDomain =
      selectedDomain === 'All' || rec.domain.toLowerCase() === selectedDomain.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !query ||
      rec.title.toLowerCase().includes(query) ||
      rec.domain.toLowerCase().includes(query) ||
      rec.matched_skills.some((s) => s.toLowerCase().includes(query)) ||
      rec.missing_skills.some((s) => s.toLowerCase().includes(query));
    return matchesDomain && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
            Explainable Fit Scoring · 0 to 100
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Scikit-Learn TF-IDF + Multi-Factor Matching
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Career Pathways & Suitability Index
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Evaluated against 22+ professional tech tracks. Compare matching skills, identify missing tools, and explore personalized 12-week roadmaps.
        </p>
      </div>

      {/* Prominent Alignment Measurement Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-white">Important Interpretation Note: </span>
          Fit scores measure the mathematical alignment between your student background and current industry prerequisites. They do
          <strong className="text-slate-800 dark:text-slate-100"> not </strong>predict the probability of receiving an internship or job offer.
        </div>
      </div>

      {/* Search and Domain Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, domain, or skill (e.g. Python, Docker, AI)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Domain selection chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedDomain('All')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              selectedDomain === 'All'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white/90 dark:bg-slate-900 text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-2 border-slate-300 dark:border-slate-800 font-bold'
            }`}
          >
            All Tracks ({recommendations.length})
          </button>
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedDomain === dom
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white/90 dark:bg-slate-900 text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border-2 border-slate-300 dark:border-slate-800 font-bold'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {filteredRecs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecs.map((rec) => (
            <CareerCard
              key={rec.career_id}
              recommendation={rec}
              isSelected={selectedCareer?.id === rec.career_id}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">No career pathways match your query</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try resetting your filters or search terms.</p>
          <button
            onClick={() => {
              setSelectedDomain('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
