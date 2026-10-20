"use client";

import { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Users } from "lucide-react";
import Badge from "@/src/components/ui/Badge";
import { VeiculoType } from "@/src/types/veiculos.types";
import { CidadeType } from "@/src/types/cidade.types";
import { PassageiroType } from "@/src/types/passageiros.types";
import { TipoParticipacao } from "@/src/types/viagem.types";
import { MotoristaType } from "@/src/types/motorista.types";
import { EditViagemFormData } from "../_schemas/viagemSchema";

interface ViagemEditFieldsProps {
  veiculos: VeiculoType[];
  motoristas: MotoristaType[];
  cidades: CidadeType[];
  passageiros: PassageiroType[];
}

export default function ViagemEditFields({ veiculos, motoristas, cidades, passageiros }: ViagemEditFieldsProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<EditViagemFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pessoas",
  });

  // State for adding a new passenger to the trip
  const [novoPassageiroId, setNovoPassageiroId] = useState<string>("");
  const [novoTipoParticipacao, setNovoTipoParticipacao] = useState<TipoParticipacao>(TipoParticipacao.Paciente);
  const [novaObservacao, setNovaObservacao] = useState<string>("");

  const cidadeOrigemIdSelecionada = watch("cidadeOrigemId");
  const dataSaidaSelecionada = watch("dataSaida");

  const passageirosJaAdicionadosIds = new Set(fields.map((f) => f.pessoaId));
  const passageirosDisponiveis = passageiros.filter((p) => !passageirosJaAdicionadosIds.has(p.id));

  const handleAdicionarPassageiro = () => {
    if (!novoPassageiroId) return;

    const pessoa = passageiros.find((p) => p.id === Number(novoPassageiroId));
    if (!pessoa) return;

    append({
      pessoaId: pessoa.id,
      tipoParticipacao: novoTipoParticipacao,
      observacao: novaObservacao.trim() ? novaObservacao.trim() : undefined,
      nome: pessoa.nome,
      cpf: pessoa.cpf,
    });

    setNovoPassageiroId("");
    setNovoTipoParticipacao(TipoParticipacao.Paciente);
    setNovaObservacao("");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Dados Principais da Viagem */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Controller
          name="veiculoId"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                Veículo <span className="text-destructive">*</span>
              </FieldLabel>

              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
              >
                <SelectTrigger className="w-full bg-muted/40 py-5" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione o veículo" />
                </SelectTrigger>

                <SelectContent>
                  {veiculos.map((v) => (
                    <SelectItem key={v.id} value={String(v.id)}>
                      {v.nome} - {v.placa} ({v.tipo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="motoristaId"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                Motorista <span className="text-destructive">*</span>
              </FieldLabel>

              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
              >
                <SelectTrigger className="w-full bg-muted/40 py-5" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione o motorista" />
                </SelectTrigger>

                <SelectContent>
                  {motoristas.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.nome} (CNH: {m.tipoHabilitacao})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="cidadeOrigemId"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                Cidade de Origem <span className="text-destructive">*</span>
              </FieldLabel>

              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
              >
                <SelectTrigger className="w-full bg-muted/40 py-5" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione a cidade de origem" />
                </SelectTrigger>

                <SelectContent>
                  {cidades.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.nome}/{c.uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="cidadeDestinoId"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>
                Cidade de Destino <span className="text-destructive">*</span>
              </FieldLabel>

              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
              >
                <SelectTrigger className="w-full bg-muted/40 py-5" aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Selecione a cidade de destino" />
                </SelectTrigger>

                <SelectContent>
                  {cidades.map((c) => (
                    <SelectItem
                      key={c.id}
                      value={String(c.id)}
                      disabled={c.id === cidadeOrigemIdSelecionada}
                    >
                      {c.nome}/{c.uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Field>
          <FieldLabel>
            Data e Horário de Saída <span className="text-destructive">*</span>
          </FieldLabel>

          <Input
            type="datetime-local"
            className="bg-muted/40 py-5 px-3"
            {...register("dataSaida")}
            aria-invalid={!!errors.dataSaida}
          />

          <FieldError errors={[errors.dataSaida]} />
        </Field>

        <Field>
          <FieldLabel>Data e Horário de Retorno / Entrada</FieldLabel>

          <Input
            type="datetime-local"
            min={dataSaidaSelecionada || undefined}
            className="bg-muted/40 py-5 px-3"
            {...register("dataEntrada")}
            aria-invalid={!!errors.dataEntrada}
          />

          <FieldError errors={[errors.dataEntrada]} />
        </Field>

        <div className="sm:col-span-2">
          <Field>
            <FieldLabel>Observação</FieldLabel>

            <Input
              placeholder="Observações da viagem (opcional)"
              className="bg-muted/40 py-5 px-3"
              {...register("observacao")}
              aria-invalid={!!errors.observacao}
            />

            <FieldError errors={[errors.observacao]} />
          </Field>
        </div>
      </section>

      {/* Seção de Passageiros */}
      <section className="flex flex-col gap-3 rounded-lg border p-4 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-800">
              Passageiros vinculados ({fields.length})
            </h3>
          </div>
          {errors.pessoas && (
            <span className="text-xs text-destructive font-medium">
              {errors.pessoas.message || errors.pessoas.root?.message}
            </span>
          )}
        </div>

        {/* Lista de Passageiros Atuais */}
        {fields.length === 0 ? (
          <p className="text-xs text-muted-foreground py-2 text-center">
            Nenhum passageiro vinculado. Adicione ao menos um passageiro abaixo.
          </p>
        ) : (
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {fields.map((item, index) => {
              const pessoaNome =
                item.nome ||
                passageiros.find((p) => p.id === item.pessoaId)?.nome ||
                `Passageiro #${item.pessoaId}`;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-md border bg-white p-2.5 shadow-xs"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-slate-900">{pessoaNome}</span>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{item.tipoParticipacao === TipoParticipacao.Paciente ? "Paciente" : "Acompanhante"}</span>
                      {item.observacao && <span>• Obs: {item.observacao}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={item.tipoParticipacao === TipoParticipacao.Paciente ? "info" : "default"}>
                      {item.tipoParticipacao === TipoParticipacao.Paciente ? "Paciente" : "Acompanhante"}
                    </Badge>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 cursor-pointer text-destructive hover:bg-destructive/10"
                      title="Remover passageiro"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Adicionar Passageiro */}
        <div className="mt-2 flex flex-col gap-2 border-t pt-3">
          <span className="text-xs font-semibold text-slate-700">Adicionar passageiro à viagem:</span>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-12 sm:items-end">
            <div className="sm:col-span-5">
              <Select value={novoPassageiroId} onValueChange={setNovoPassageiroId}>
                <SelectTrigger className="w-full bg-white h-9 text-xs">
                  <SelectValue placeholder="Selecione o passageiro" />
                </SelectTrigger>

                <SelectContent>
                  {passageirosDisponiveis.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)} className="text-xs">
                      {p.nome} {p.cpf ? `(${p.cpf})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-3">
              <Select
                value={novoTipoParticipacao}
                onValueChange={(val) => setNovoTipoParticipacao(val as TipoParticipacao)}
              >
                <SelectTrigger className="w-full bg-white h-9 text-xs">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={TipoParticipacao.Paciente} className="text-xs">
                    Paciente
                  </SelectItem>
                  <SelectItem value={TipoParticipacao.Acompanhante} className="text-xs">
                    Acompanhante
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-3">
              <Input
                placeholder="Obs. (opcional)"
                value={novaObservacao}
                onChange={(e) => setNovaObservacao(e.target.value)}
                className="bg-white h-9 text-xs"
              />
            </div>

            <div className="sm:col-span-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full h-9 cursor-pointer bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
                disabled={!novoPassageiroId}
                onClick={handleAdicionarPassageiro}
                title="Adicionar à viagem"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
