"use client";

import { useMemo, useState } from "react";
import { ViagemType } from "@/src/types/viagem.types";
import { useViagensQuery } from "./useViagensQuery";
import { ParametrosViagensRequest } from "@/src/services/api/viagem/viagemRequests";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditViagemFormData, editViagemSchema } from "../_schemas/viagemSchema";
import { useEditViagem } from "./useEditViagem";
import { useDeleteViagem } from "./useDeleteViagem";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export type ViagensFiltrosState = Omit<ParametrosViagensRequest, "page" | "limit">;

function toDatetimeLocal(isoString?: string | null): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function useViagens() {
  const [isVeiculoModalOpen, setIsVeiculoModalOpen] = useState(false);
  const [isPassageirosModalOpen, setIsPassageirosModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [viagemSelecionada, setViagemSelecionada] = useState<null | ViagemType>(null);

  const [filtros, setFiltros] = useState<ViagensFiltrosState>({});
  const [pageIndex, setPageIndex] = useState(0);

  const form = useForm<EditViagemFormData>({
    resolver: zodResolver(editViagemSchema),
    defaultValues: {
      veiculoId: undefined,
      cidadeOrigemId: undefined,
      cidadeDestinoId: undefined,
      dataSaida: "",
      dataEntrada: "",
      observacao: "",
      pessoas: [],
    },
  });

  const params = useMemo<ParametrosViagensRequest>(
    () => ({ ...filtros, page: pageIndex + 1, limit: PAGE_SIZE }),
    [filtros, pageIndex],
  );

  const { isLoading, isFetching, data, isError } = useViagensQuery(params);

  const editViagemMutation = useEditViagem();
  const deleteViagemMutation = useDeleteViagem();

  const hasNextPage = (data?.length ?? 0) === PAGE_SIZE;

  const handleFiltroChange = (campo: keyof ViagensFiltrosState, valor: number | string | undefined) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
    setPageIndex(0);
  };

  const handleLimparFiltros = () => {
    setFiltros({});
    setPageIndex(0);
  };

  const handleViewVeiculo = (viagem: ViagemType) => {
    setViagemSelecionada(viagem);
    setIsVeiculoModalOpen(true);
  };

  const handleViewPassageiros = (viagem: ViagemType) => {
    setViagemSelecionada(viagem);
    setIsPassageirosModalOpen(true);
  };

  const handleOpenEdit = (viagem: ViagemType) => {
    setViagemSelecionada(viagem);
    form.reset({
      veiculoId: viagem.veiculoId,
      cidadeOrigemId: viagem.cidadeOrigemId,
      cidadeDestinoId: viagem.cidadeDestinoId,
      dataSaida: toDatetimeLocal(viagem.dataSaida),
      dataEntrada: toDatetimeLocal(viagem.dataEntrada),
      observacao: viagem.observacao ?? "",
      pessoas: (viagem.pessoas ?? []).map((p) => ({
        pessoaId: p.pessoaId,
        tipoParticipacao: p.tipoParticipacao,
        observacao: p.observacao ?? undefined,
        nome: p.pessoa?.nome,
        cpf: p.pessoa?.cpf,
      })),
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (viagem: ViagemType) => {
    setViagemSelecionada(viagem);
    setIsConfirmModalOpen(true);
  };

  const onSubmitEdit = async (formData: EditViagemFormData) => {
    if (!viagemSelecionada) return;

    await editViagemMutation.mutateAsync({
      id: viagemSelecionada.id,
      data: {
        veiculoId: formData.veiculoId,
        cidadeOrigemId: formData.cidadeOrigemId,
        cidadeDestinoId: formData.cidadeDestinoId,
        dataSaida: new Date(formData.dataSaida).toISOString(),
        dataEntrada: formData.dataEntrada ? new Date(formData.dataEntrada).toISOString() : null,
        observacao: formData.observacao?.trim() || null,
        pessoas: formData.pessoas.map((p) => ({
          pessoaId: p.pessoaId,
          tipoParticipacao: p.tipoParticipacao,
          observacao: p.observacao?.trim() || undefined,
        })),
      },
    });

    setIsEditModalOpen(false);
  };

  const onSubmitDelete = async () => {
    if (!viagemSelecionada) {
      setIsConfirmModalOpen(false);
      toast.error("Nenhuma viagem selecionada");
      return;
    }

    await deleteViagemMutation.mutateAsync(viagemSelecionada.id);
    setIsConfirmModalOpen(false);
  };

  return {
    isLoading,
    isFetching,
    data,
    isError,
    isVeiculoModalOpen,
    setIsVeiculoModalOpen,
    isPassageirosModalOpen,
    setIsPassageirosModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    viagemSelecionada,
    handleViewVeiculo,
    handleViewPassageiros,
    handleOpenEdit,
    handleDelete,
    onSubmitEdit,
    onSubmitDelete,
    editViagemMutation,
    deleteViagemMutation,
    form,
    filtros,
    handleFiltroChange,
    handleLimparFiltros,
    pageIndex,
    setPageIndex,
    hasNextPage,
    pageSize: PAGE_SIZE,
  };
}
