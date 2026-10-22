"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Bus, Settings } from "lucide-react";
import useSidebar from "./useSidebar";
import ProfileSettings from "./components/ProfileSettings";
import ThemeSettings from "./components/ThemeSettings";

const Sidebar = () => {
  const { menuItems, router, loading, pathname } = useSidebar();

  return (
    <aside className="w-64 bg-[#1e2d4a] dark:bg-[#111927] border-r border-transparent dark:border-slate-800 text-slate-300 flex flex-col transition-colors duration-200">
      <div className="p-6 text-white font-bold text-xl flex items-center gap-2 border-b border-slate-700 dark:border-slate-800">
        <Bus className="text-blue-400" /> TFD Admin
      </div>
      <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                pathname === item.path
                  ? "bg-[#2a4070] text-white border-l-3 border-blue-400"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Canto separado de Configurações */}
      <div className="px-3 pt-3 pb-2 border-t border-slate-700/60 dark:border-slate-800/80 mt-auto">
        <div className="px-1 mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          <Settings size={13} className="text-blue-400" />
          <span>Configurações</span>
        </div>
        <ThemeSettings />
      </div>

      <div className="px-3 pb-6">
        <Separator className="mb-4 bg-slate-700 dark:bg-slate-800" />

        {loading ? <Skeleton className="bg-blue-800 h-8 rounded-full" /> : <ProfileSettings />}
      </div>
    </aside>
  );
};

export default Sidebar;
