"use client";

import { ViagemType, TipoParticipacao } from "@/src/types/viagem.types";
import { TipoVeiculo } from "@/src/types/veiculos.types";
import Badge from "@/src/components/ui/Badge";
import EmptyCustom from "@/src/components/ui/Empty";
import { ArrowRight, Bus, Calendar, FileText, MapPin, User, Users } from "lucide-react";

interface ViagemDetalhesViewProps {
  viagem: ViagemType;
}

function formatarDataHora(isoString?: string | null): string {
  if (!isoString) return "-";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ViagemDetalhesView({ viagem }: ViagemDetalhesViewProps) {
  const { veiculo, motorista, cidadeOrigem, cidadeDestino, pessoas } = viagem;

  return (
    <div className="flex flex-col gap-5 max-h-[80vh] overflow-y-auto pr-1">
      {/* Banner de Rota e Horários */}
      <div className="rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 p-4 shadow-2xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-2xs">
              <MapPin className="size-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">Trajeto da Viagem</span>
              <div className="flex items-center gap-2 text-base font-bold text-slate-800">
                <span>
                  {cidadeOrigem?.nome}/{cidadeOrigem?.uf}
                </span>
                <ArrowRight className="size-4 text-blue-600" />
                <span>
                  {cidadeDestino?.nome}/{cidadeDestino?.uf}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 shadow-2xs border">
              <Calendar className="size-3.5 text-blue-600" />
              <span>
                <strong>Saída:</strong> {formatarDataHora(viagem.dataSaida)}
              </span>
            </div>

            {viagem.dataEntrada && (
              <div className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 shadow-2xs border">
                <Calendar className="size-3.5 text-green-600" />
                <span>
                  <strong>Retorno:</strong> {formatarDataHora(viagem.dataEntrada)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Motorista e Veículo */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Card Motorista */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="mb-3 flex items-center gap-2 border-b pb-2 text-slate-800">
            <User className="size-4 text-blue-600" />
            <h4 className="text-sm font-semibold">Motorista Responsável</h4>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="col-span-2 flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">Nome</span>
              <span className="text-sm font-semibold text-slate-900">{motorista?.nome ?? "-"}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">CPF</span>
              <span className="text-slate-800">{motorista?.cpf ?? "-"}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">CNH / Categoria</span>
              <span className="text-slate-800">
                {motorista?.tipoHabilitacao ? `Cat. ${motorista.tipoHabilitacao}` : "-"}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">Vínculo</span>
              <span className="text-slate-800">{motorista?.tipoVinculo ?? "-"}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">Validade CNH</span>
              <span className="text-slate-800">
                {motorista?.validadeHabilitacao
                  ? new Date(motorista.validadeHabilitacao).toLocaleDateString("pt-BR")
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Card Veículo */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="mb-3 flex items-center gap-2 border-b pb-2 text-slate-800">
            <Bus className="size-4 text-blue-600" />
            <h4 className="text-sm font-semibold">Veículo Utilizado</h4>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="col-span-2 flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">Modelo / Nome</span>
              <span className="text-sm font-semibold text-slate-900">{veiculo?.nome ?? "-"}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">Placa</span>
              <span className="font-mono text-slate-800">{veiculo?.placa ?? "-"}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">Ano</span>
              <span className="text-slate-800">{veiculo?.ano ?? "-"}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">Renavam</span>
              <span className="font-mono text-slate-800">{veiculo?.renavam ?? "-"}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-muted-foreground">Tipo de Veículo</span>
              <span>
                <Badge variant={veiculo?.tipo === TipoVeiculo.Proprio ? "success" : "warning"}>
                  {veiculo?.tipo ?? "Não informado"}
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Observação da Viagem */}
      {viagem.observacao && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 shadow-2xs">
          <div className="mb-1 flex items-center gap-1.5 font-semibold text-amber-800">
            <FileText className="size-3.5" />
            <span>Observações</span>
          </div>
          <p className="leading-relaxed">{viagem.observacao}</p>
        </div>
      )}

      {/* Seção de Passageiros */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="mb-3 flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-slate-800">
              Passageiros e Acompanhantes ({pessoas?.length ?? 0})
            </h4>
          </div>
        </div>

        {!pessoas || pessoas.length === 0 ? (
          <EmptyCustom
            size="sm"
            title="Nenhum passageiro vinculado"
            description="Essa viagem não possui pessoas registradas."
          />
        ) : (
          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
            {pessoas.map((viagemPessoa) => (
              <div
                key={viagemPessoa.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 p-2.5 transition-colors hover:bg-slate-50"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-slate-900">
                    {viagemPessoa.pessoa?.nome ?? `Pessoa #${viagemPessoa.pessoaId}`}
                  </span>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    {viagemPessoa.pessoa?.cpf && <span>CPF: {viagemPessoa.pessoa.cpf}</span>}
                    {viagemPessoa.observacao && <span>Obs: {viagemPessoa.observacao}</span>}
                  </div>
                </div>

                <Badge variant={viagemPessoa.tipoParticipacao === TipoParticipacao.Paciente ? "info" : "default"}>
                  {viagemPessoa.tipoParticipacao === TipoParticipacao.Paciente ? "Paciente" : "Acompanhante"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
