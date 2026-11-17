"use client";

import { PassageiroType } from "@/src/types/passageiros.types";
import { useState } from "react";
import { PassageiroFormData, passageiroSchema } from "../_schemas/passageiroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePassageirosQuery } from "./usePassageirosQuery";
import { useCreatePassageiro } from "./useCreatePassageiro";
import { useEditPassageiro } from "./useEditPassageiro";
import { useDeletePassageiro } from "./useDeletePassageiro";
import { toast } from "sonner";

export default function usePassageiros() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [passageiroSelecionado, setPassageiroSelecionado] = useState<null | PassageiroType>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<PassageiroFormData>({
    resolver: zodResolver(passageiroSchema),

    defaultValues: {
      nome: "",
      cpf: "",
      cartaoSus: "",
      telefone: "",
      dataNascimento: "",
      endereco: "",
      municipio: "",
    },
  });

  const { isLoading, data, isError } = usePassageirosQuery();

  const createPassageiroMutation = useCreatePassageiro();

  const editPassageiroMutation = useEditPassageiro();

  const deletePassageiroMutation = useDeletePassageiro();

  const handleOpenAdd = () => {
    form.reset({
      nome: "",
      cpf: "",
      cartaoSus: "",
      telefone: "",
      dataNascimento: "",
      endereco: "",
      municipio: "",
    });

    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (passageiro: PassageiroType) => {
    form.reset({
      ...passageiro,
      cpf: passageiro.cpf || "",
      cartaoSus: passageiro.cartaoSus || "",
      telefone: passageiro.telefone || "",
      dataNascimento: passageiro.dataNascimento?.slice(0, 10) ?? "",
      endereco: passageiro.endereco || "",
      municipio: passageiro.municipio || "",
    });

    setIsEditing(true);
    setPassageiroSelecionado(passageiro);
    setIsModalOpen(true);
  };

  const handleDelete = (passageiro: PassageiroType) => {
    setIsEditing(false);
    setPassageiroSelecionado(passageiro);
    setIsConfirmModalOpen(true);
  };

  const onSubmit = async (data: PassageiroFormData) => {
    const formatedDate = {
      ...data,
      cpf: data.cpf === "" ? null : data.cpf,
      cartaoSus: data.cartaoSus === "" ? null : data.cartaoSus,
      telefone: data.telefone === "" ? null : data.telefone,
      dataNascimento: data.dataNascimento === "" ? null : data.dataNascimento,
      endereco: data.endereco === "" ? null : data.endereco,
      municipio: data.municipio === "" ? null : data.municipio,
    };

    if (isEditing && passageiroSelecionado) {
      await editPassageiroMutation.mutateAsync({ id: passageiroSelecionado.id, data: formatedDate });
      setIsModalOpen(false);

      return;
    }

    await createPassageiroMutation.mutateAsync(formatedDate);
    setIsModalOpen(false);
  };

  const onSubmitDelete = async () => {
    if (!passageiroSelecionado) {
      setIsConfirmModalOpen(false);
      toast.error("Nenhum passageiro selecionado");

      return;
    }

    try {
      await deletePassageiroMutation.mutateAsync(passageiroSelecionado.id);
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  const handleReativar = async (passageiro: PassageiroType) => {
    await editPassageiroMutation.mutateAsync({
      id: passageiro.id,
      data: { ativo: true },
    });
  };

  return {
    handleDelete,
    handleReativar,
    isModalOpen,
    setIsModalOpen,
    handleOpenEdit,
    handleOpenAdd,
    form,
    onSubmit,
    onSubmitDelete,
    isLoading,
    data,
    isError,
    isConfirmModalOpen,
    isEditing,
    passageiroSelecionado,
    deletePassageiroMutation,
    setIsConfirmModalOpen,
    createPassageiroMutation,
    editPassageiroMutation,
  };
}
