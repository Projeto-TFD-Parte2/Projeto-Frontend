import { ReactNode } from "react";

export type BadgeVariant = "success" | "warning" | "danger" | "info" | "default";

export default function Badge({ children, variant = "default" }: { children: ReactNode; variant: BadgeVariant }) {
  const styles = {
    success: "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 dark:border dark:border-green-800/60",
    warning: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400 dark:border dark:border-orange-800/60",
    danger: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 dark:border dark:border-red-800/60",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 dark:border dark:border-blue-800/60",
    default: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:border dark:border-slate-700",
  } as const;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
}
