import React, { useState, useEffect, useRef } from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { api } from '../services/api';
import { ChatMessage } from '../types';
import {
  Send,
  Bot,
  Sparkles,
  GitPullRequest,
  Calendar,
  FolderGit2,
  TrendingUp,
  BrainCircuit,
  Loader2,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const AgentChatWidget: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { profile, selectedCareer } = useCareerPilot();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [health, setHealth] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getHealth().then(setHealth).catch(console.error);
  }, []);

  // Initialize greeting
  useEffect(() => {
    const greetingText = profile
      ? `Hello ${profile.name}! I am your CareerPilot AI Orchestrator. I coordinate our specialized agents to help you evaluate paths, resolve skill gaps, plan milestones, and build recruiter-ready projects for ${selectedCareer?.title || 'your career'}. What would you like to explore today?`
      : `Welcome to CareerPilot AI! I am your agentic career coordinator. Once you setup your student profile or try our demo, I can route your questions to specialized agents for skill gaps, roadmaps, and portfolio advice.`;

    const initialGreeting: ChatMessage = {
      id: 'init-1',
      sender: 'agent',
      agent_name: 'Orchestrator Agent',
      content: greetingText,
      timestamp: 'Just now',
      suggestions: [
        'What are my highest priority skill gaps?',
        'Recommend 2 portfolio projects recruiters want to see',
        'How does my profile align with UN SDG 8?',
        'How many hours/week should I study?'
      ]
    };
    setMessages([initialGreeting]);
  }, [profile?.id, profile?.name, selectedCareer?.id, selectedCareer?.title]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsSending(true);

    try {
      const res = await api.sendChatMessage(
        profile?.id || 'guest',
        query,
        selectedCareer?.id,
        profile
      );

      const agentReply: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        agent_name: res.agent_name || 'Orchestrator Agent',
        content: res.reply,
        timestamp: 'Just now',
        suggestions: res.suggestions || []
      };

      setMessages((prev) => [...prev, agentReply]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'agent',
        agent_name: 'Orchestrator Agent',
        content: 'I encountered a temporary connection issue. Please verify your backend server is running.',
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const getAgentBadge = (agentName?: string) => {
    switch (agentName) {
      case 'Skill Gap Analysis Agent':
        return { icon: GitPullRequest, color: 'text-purple-800 dark:text-purple-300 bg-purple-500/10 border-purple-500/20' };
      case 'Learning Planner Agent':
        return { icon: Calendar, color: 'text-sky-800 dark:text-sky-300 bg-sky-500/10 border-sky-500/20' };
      case 'Project Recommendation Agent':
        return { icon: FolderGit2, color: 'text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20' };
      case 'Career Readiness Agent':
        return { icon: TrendingUp, color: 'text-amber-800 dark:text-amber-300 bg-amber-500/10 border-amber-500/20' };
      case 'Career Analysis Agent':
        return { icon: Sparkles, color: 'text-indigo-800 dark:text-indigo-300 bg-indigo-500/10 border-indigo-500/20' };
      default:
        return { icon: BrainCircuit, color: 'text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/20' };
    }
  };

  const isLLMActive = health?.llm_status === 'enabled';

  return (
    <div
      className={`glass-card rounded-3xl flex flex-col bg-white/80 dark:bg-slate-900/85 border border-white/90 dark:border-slate-800 shadow-md ${
        compact ? 'h-[500px]' : 'h-[640px]'
      }`}
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>AI Career Assistant</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium mt-0.5">
              {isLLMActive ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Live Generative LLM Engine Active</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Deterministic Local Agent Engine (Zero Hallucination)</span>
                </>
              )}
            </p>
          </div>
        </div>

        {selectedCareer && (
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hidden sm:inline-block">
            Track: {selectedCareer.title}
          </span>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          const badge = getAgentBadge(m.agent_name);
          const AgentIcon = badge.icon;

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
            >
              {!isUser && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 mb-1.5 rounded-full border text-xs font-bold ${badge.color}`}
                >
                  <AgentIcon className="w-3.5 h-3.5" />
                  <span>{m.agent_name || 'Agent Advisor'}</span>
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                  isUser
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-xs shadow-sm font-medium'
                    : 'bg-white/95 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-bl-xs shadow-xs'
                }`}
              >
                <p className="whitespace-pre-line">{m.content}</p>
              </div>

              {/* Suggestions chips */}
              {!isUser && m.suggestions && m.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 max-w-[95%]">
                  {m.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      className="text-xs font-bold px-3.5 py-2 rounded-xl bg-white/95 hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors text-left shadow-xs"
                    >
                      💬 {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Cooperating agents are formulating guidance...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-200/70 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about roadmap pacing, portfolio ideas, or skill gaps..."
            disabled={isSending}
            className="flex-1 h-12 px-4 rounded-xl glass-input text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="w-12 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white flex items-center justify-center shadow-md shadow-emerald-600/25 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
