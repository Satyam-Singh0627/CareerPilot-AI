import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { AgentChatWidget } from '../components/AgentChatWidget';
import {
  Bot,
  BrainCircuit,
  Sparkles,
  GitPullRequest,
  Calendar,
  FolderGit2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export const AssistantPage: React.FC = () => {
  const { selectedCareer, profile } = useCareerPilot();

  const agents = [
    {
      name: 'Career Analysis Agent',
      desc: 'Scores suitability across 22+ domains with TF-IDF cosine similarity.',
      icon: Sparkles,
      color: 'text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      name: 'Skill Gap Analysis Agent',
      desc: 'Pinpoints missing technical requirements & prioritizes urgency.',
      icon: GitPullRequest,
      color: 'text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-500/20'
    },
    {
      name: 'Learning Planner Agent',
      desc: 'Synthesizes weekly milestone curricula calibrated to your hours.',
      icon: Calendar,
      color: 'text-sky-700 dark:text-sky-300 bg-sky-500/10 border-sky-500/20'
    },
    {
      name: 'Project Recommendation Agent',
      desc: 'Recommends high-signal portfolio projects for recruiters.',
      icon: FolderGit2,
      color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      name: 'Career Readiness Agent',
      desc: 'Evaluates holistic employability readiness and SDG 8 empowerment.',
      icon: TrendingUp,
      color: 'text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-500/20'
    },
    {
      name: 'Orchestrator Agent',
      desc: 'Routes queries dynamically and coordinates cross-agent workflow.',
      icon: BrainCircuit,
      color: 'text-teal-700 dark:text-teal-300 bg-teal-500/10 border-teal-500/20'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
            Multi-Agent Cooperative System
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Context: {profile?.name || 'Guest'} · {selectedCareer?.title}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          AI Career Assistant & Multi-Agent Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Interact directly with our cooperating agents. Ask specific questions about curriculum pacing,
          architectural design for portfolio projects, interview preparedness, or career fit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Dedicated Chat Widget */}
        <div className="lg:col-span-2">
          <AgentChatWidget compact={false} />
        </div>

        {/* Right Column (1 Col): Agent Roster & System Architecture */}
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-3xl bg-white/75 dark:bg-slate-900/80 border border-white/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Active Agent Roster</span>
            </h3>

            <div className="space-y-2.5">
              {agents.map((ag, i) => {
                const Icon = ag.icon;
                return (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3 shadow-2xs"
                  >
                    <div className={`p-1.5 rounded-xl border shrink-0 ${ag.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{ag.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{ag.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy & Fallback Note */}
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Zero-Hallucination Fallback Architecture</span>
            </div>
            <p className="leading-relaxed">
              When an LLM API key is not configured, our agents execute deterministic algorithms with validated
              pedagogical responses, ensuring high reliability and zero downtime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
