import React from 'react';
import { useCareerPilot } from '../context/CareerPilotContext';
import { LogOut, X, AlertTriangle } from 'lucide-react';

export const LogoutConfirmModal: React.FC = () => {
  const { isLogoutConfirmOpen, cancelLogout, confirmLogout } = useCareerPilot();

  if (!isLogoutConfirmOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-sm glass-panel bg-white/95 dark:bg-slate-900/95 border border-white/90 dark:border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl text-center">
        <button
          onClick={cancelLogout}
          aria-label="Close logout modal"
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <LogOut className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
          Sign Out of CareerPilot AI?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          You will exit your session and return to the public landing page. Your saved roadmap and progress remain stored safely in the database.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={cancelLogout}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmLogout}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20 transition-all"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
