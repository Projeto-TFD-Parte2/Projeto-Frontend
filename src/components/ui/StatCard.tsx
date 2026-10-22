import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  subValue: string;
  icon: ReactNode;
  trend?: string;
}

export default function StatCard({ label, value, subValue, icon, trend = "neutral" }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">{icon}</span>
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</div>
        {subValue && (
          <div className={`text-xs mt-1 ${trend === "positive" ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"}`}>{subValue}</div>
        )}
      </div>
    </div>
  );
}
