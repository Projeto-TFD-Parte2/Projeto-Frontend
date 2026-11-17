"use client";

import { useState } from "react";
import { VeiculoType } from "@/src/types/veiculos.types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { VeiculoFormData, veiculoSchema } from "../_schemas/veiculoSchema";
import { useVeiculosQuery } from "@/src/app/(private)/veiculos/hooks/useVeiculosQuery";
import { useCreateVeiculo } from "@/src/app/(private)/veiculos/hooks/useCreateVeiculo";
import { useEditVeiculo } from "@/src/app/(private)/veiculos/hooks/useEditVeiculo";
import { useDeleteVeiculo } from "@/src/app/(private)/veiculos/hooks/useDeleteVeiculo";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useVeiculos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<null | VeiculoType>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<VeiculoFormData>({
    resolver: zodResolver(veiculoSchema),

    defaultValues: {
      nome: "",
      placa: "",
      ano: new Date().getFullYear(),
      renavam: "",
    },
  });

  const { isLoading, data, isError } = useVeiculosQuery();

  const createVeiculoMutation = useCreateVeiculo();

  const editVeiculoMutation = useEditVeiculo();

  const deleteVeiculoMutation = useDeleteVeiculo();

  const handleOpenAdd = () => {
    form.reset({
      nome: "",
      placa: "",
      ano: new Date().getFullYear(),
      renavam: "",
      tipo: undefined,
    });

    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (veiculo: VeiculoType) => {
    form.reset({ ...veiculo });

    setIsEditing(true);
    setVeiculoSelecionado(veiculo);
    setIsModalOpen(true);
  };

  const handleDelete = (veiculo: VeiculoType) => {
    setIsEditing(false);
    setVeiculoSelecionado(veiculo);
    setIsConfirmModalOpen(true);
  };

  const onSubmit = async (data: VeiculoFormData) => {
    if (isEditing && veiculoSelecionado) {
      await editVeiculoMutation.mutateAsync({ id: veiculoSelecionado.id, data });
      setIsModalOpen(false);

      return;
    }

    await createVeiculoMutation.mutateAsync(data);
    setIsModalOpen(false);
  };

  const onSubmitDelete = async () => {
    if (!veiculoSelecionado) {
      setIsConfirmModalOpen(false);
      toast.error("Nenhum veiculo selecionado");

      return;
    }

    try {
      await deleteVeiculoMutation.mutateAsync(veiculoSelecionado.id);
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  const handleReativar = async (veiculo: VeiculoType) => {
    await editVeiculoMutation.mutateAsync({
      id: veiculo.id,
      data: { ativo: true },
    });
  };

  return {
    onSubmit,
    handleDelete,
    handleReativar,
    isModalOpen,
    setIsModalOpen,
    handleOpenEdit,
    handleOpenAdd,
    isEditing,
    isLoading,
    isError,
    data,
    form,
    createVeiculoMutation,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    deleteVeiculoMutation,
    onSubmitDelete,
    veiculoSelecionado,
    editVeiculoMutation,
  };
}
