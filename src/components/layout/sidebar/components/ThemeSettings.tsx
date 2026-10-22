"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export default function ThemeSettings() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 animate-pulse">
        <div className="h-4 bg-slate-700/50 rounded-md w-28 mb-3" />
        <div className="h-8 bg-slate-700/40 rounded-lg w-full" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3 transition-colors">
      {/* Switch Rápido: Modo Noturno */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {isDark ? (
            <div className="flex size-6 items-center justify-center rounded-md bg-blue-500/20 text-blue-400">
              <Moon size={14} className="transition-transform duration-200" />
            </div>
          ) : (
            <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-400">
              <Sun size={14} className="transition-transform duration-200" />
            </div>
          )}
          <span className="text-xs font-medium text-slate-200">Modo Noturno</span>
        </div>

        {/* Switch Slider */}
        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          aria-label="Alternar modo noturno"
          onClick={handleToggle}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
            isDark ? "bg-blue-500" : "bg-slate-600"
          }`}
        >
          <span
            className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              isDark ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Seletor Segmentado: Claro / Escuro / Sistema */}
      <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px]">
        <button
          type="button"
          onClick={() => setTheme("light")}
          title="Tema Claro"
          className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-md transition-all cursor-pointer ${
            theme === "light"
              ? "bg-blue-600 text-white font-semibold shadow-xs"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Sun size={12} />
          <span>Claro</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("dark")}
          title="Tema Escuro"
          className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-md transition-all cursor-pointer ${
            theme === "dark"
              ? "bg-blue-600 text-white font-semibold shadow-xs"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Moon size={12} />
          <span>Escuro</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme("system")}
          title="Seguir sistema operacional"
          className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-md transition-all cursor-pointer ${
            theme === "system"
              ? "bg-blue-600 text-white font-semibold shadow-xs"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Monitor size={12} />
          <span>Auto</span>
        </button>
      </div>
    </div>
  );
}
