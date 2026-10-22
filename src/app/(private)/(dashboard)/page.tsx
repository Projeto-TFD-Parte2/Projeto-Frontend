"use client";

import StatCard from "@/src/components/ui/StatCard";
import { Users, User, Bus, Briefcase } from "lucide-react";
import { useDashboardQuery } from "./hooks/useDashboardQuery";
import EmptyCustom from "@/src/components/ui/Empty";
import { useMemo, useState } from "react";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { MonthPicker } from "../../../components/layout/month-picker/MonthPicker";
import DashboardSkeleton from "./_components/dashboardSkeleton";

export default function DashboardPage() {
  const [date, setDate] = useState(new Date());
  const iconSize = 18;

  const paramsDate = useMemo(
    () => ({
      dataInicio: format(startOfMonth(date), "yyyy-MM-dd"),
      dataFim: format(endOfMonth(date), "yyyy-MM-dd"),
    }),
    [date],
  );

  const { isLoading, isSuccess, data } = useDashboardQuery({ key: format(date, "MM/yyyy"), params: paramsDate });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Dashboard</h1>

        <MonthPicker value={date} onChange={setDate} />
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : isSuccess ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Total de Viagens"
              value={`${data.totalViagens}`}
              subValue="Feitas"
              icon={<Briefcase size={iconSize} />}
            />
            <StatCard
              label="Passageiros"
              value={`${data.totalPassageiros}`}
              subValue="Transportados"
              icon={<Users size={iconSize} />}
            />
            <StatCard
              label="Motoristas"
              value={`${data.totalMotoristasAtivos}`}
              subValue="Ativos"
              icon={<User size={iconSize} />}
            />
            <StatCard
              label="Veículos"
              value={`${data.totalVeiculos}`}
              subValue="Em operação"
              icon={<Bus size={iconSize} />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-6 tracking-wide">Viagens por Destino</h2>
              <div className="space-y-4">
                {data.viagensPorDestino.length ? (
                  <>
                    {data.viagensPorDestino.map((item) => (
                      <div key={item.cidade} className="space-y-3">
                        <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                          <span>{item.cidade}</span>
                          <span>{item.quantidadeViagens}</span>
                        </div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-blue-600 rounded-full ${item.quantidadeViagens ? `w-[${(item.quantidadeViagens * data.totalViagens) / 100}%]` : 0}`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <EmptyCustom
                    title="Sem dados de viagens"
                    description="Tente ajustar o período ou aguardar novas viagens"
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyCustom isError />
      )}
    </div>
  );
}
