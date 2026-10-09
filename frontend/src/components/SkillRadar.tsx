import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useCareerPilot } from '../context/CareerPilotContext';

interface SkillRadarProps {
  scoreData?: {
    subject: string;
    studentScore: number;
    targetScore: number;
  }[];
}

export const SkillRadar: React.FC<SkillRadarProps> = ({ scoreData }) => {
  const { theme } = useCareerPilot();
  const isDark = theme === 'dark';

  const defaultData = [
    { subject: 'Core Coding', studentScore: 78, targetScore: 90 },
    { subject: 'Data & SQL', studentScore: 82, targetScore: 85 },
    { subject: 'Cloud & DevOps', studentScore: 45, targetScore: 75 },
    { subject: 'System Design', studentScore: 50, targetScore: 80 },
    { subject: 'Algorithms', studentScore: 70, targetScore: 85 },
    { subject: 'Portfolio Depth', studentScore: 60, targetScore: 90 },
  ];

  const data = scoreData || defaultData;

  const tickColor = isDark ? '#94A3B8' : '#475569';
  const gridColor = isDark ? '#334155' : '#E2E8F0';
  const tooltipBg = isDark ? '#0F172A' : '#FFFFFF';
  const tooltipBorder = isDark ? '#334155' : '#E2E8F0';
  const tooltipText = isDark ? '#F8FAFC' : '#1E293B';

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="72%" data={data}>
          <PolarGrid stroke={gridColor} strokeDasharray="3 3" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: tickColor, fontSize: 11, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: tickColor, fontSize: 9 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              borderColor: tooltipBorder,
              borderRadius: '12px',
              fontSize: '12px',
              color: tooltipText,
              boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.1)'
            }}
          />
          <Radar
            name="Your Competence"
            dataKey="studentScore"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.35}
          />
          <Radar
            name="Industry Benchmark"
            dataKey="targetScore"
            stroke="#0EA5E9"
            fill="#0EA5E9"
            fillOpacity={0.15}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span>Your Profile</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
          <span>Industry Benchmark</span>
        </div>
      </div>
    </div>
  );
};
