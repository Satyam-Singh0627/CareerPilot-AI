import React from 'react';

interface FitScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const FitScoreGauge: React.FC<FitScoreGaugeProps> = ({
  score,
  size = 'md',
  showLabel = true,
}) => {
  const getBadgeColor = (val: number) => {
    if (val >= 80) return 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/30';
    if (val >= 65) return 'text-teal-700 dark:text-teal-300 bg-teal-500/15 border-teal-500/30';
    if (val >= 45) return 'text-sky-700 dark:text-sky-300 bg-sky-500/15 border-sky-500/30';
    return 'text-amber-700 dark:text-amber-300 bg-amber-500/15 border-amber-500/30';
  };

  const dimension =
    size === 'sm' ? 'w-11 h-11 text-xs' : size === 'lg' ? 'w-20 h-20 text-2xl' : 'w-14 h-14 text-sm';

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`relative ${dimension} rounded-2xl flex items-center justify-center font-bold border backdrop-blur-md shadow-xs ${getBadgeColor(
          score
        )}`}
      >
        <div className="flex items-baseline">
          <span>{Math.round(score)}</span>
          <span className="text-[10px] opacity-75 ml-0.5">%</span>
        </div>
      </div>
      {showLabel && (
        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Fit Score
        </span>
      )}
    </div>
  );
};
