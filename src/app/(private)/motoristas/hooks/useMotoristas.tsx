"use client";

import { useState } from "react";
import { MotoristaType } from "@/src/types/motorista.types";
import { useMotoristasQuery } from "./useMotoristasQuery";
import { useCreateMotorista } from "./useCreateMotorista";
import { useEditMotorista } from "./useEditMotorista";
import { useDeleteMotorista } from "./useDeleteMotorista";
import { useForm } from "react-hook-form";
import {
  CreateMotoristaFormData,
  MotoristaFormData,
  createMotoristaSchema,
  motoristaBaseSchema,
} from "../_schemas/motoristaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RoleUsuario } from "@/src/types/usuario.types";

export default function useMotoristas() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [motoristaSelecionado, setMotoristaSelecionado] = useState<null | MotoristaType>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const baseForm = useForm<MotoristaFormData>({
    resolver: zodResolver(motoristaBaseSchema),

    defaultValues: {
      cpf: "",
      endereco: "",
      renach: "",
      validadeHabilitacao: "",
    },
  });

  const createForm = useForm<CreateMotoristaFormData>({
    resolver: zodResolver(createMotoristaSchema),

    defaultValues: {
      nome: "",
      cpf: "",
      endereco: "",
      renach: "",
      validadeHabilitacao: "",
      email: "",
      password: "",
    },
  });

  const { isLoading, data, isError } = useMotoristasQuery();

  const createMotoristaMutation = useCreateMotorista();

  const editMotoristaMutation = useEditMotorista();

  const deleteMotoristaMutation = useDeleteMotorista();

  const handleOpenAdd = () => {
    createForm.reset({
      nome: "",
      cpf: "",
      endereco: "",
      renach: "",
      validadeHabilitacao: "",
      email: "",
      password: "",
    });

    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (motorista: MotoristaType) => {
    baseForm.reset({ ...motorista, validadeHabilitacao: motorista.validadeHabilitacao?.slice(0, 10) });

    setIsEditing(true);
    setMotoristaSelecionado(motorista);
    setIsModalOpen(true);
  };

  const handleDelete = (passageiro: MotoristaType) => {
    setIsEditing(false);
    setMotoristaSelecionado(passageiro);
    setIsConfirmModalOpen(true);
  };

  const onEditSubmit = async (data: MotoristaFormData) => {
    if (!motoristaSelecionado) {
      toast.error("Nenhum motorista foi selecionado");
      return;
    }

    await editMotoristaMutation.mutateAsync({ id: motoristaSelecionado.id, data });
    setIsModalOpen(false);
  };

  const onCreateSubmit = async (data: CreateMotoristaFormData) => {
    await createMotoristaMutation.mutateAsync({
      nome: data.nome,
      email: data.email,
      password: data.password,
      role: RoleUsuario.Operador,
      motorista: {
        cpf: data.cpf,
        endereco: data.endereco,
        renach: data.renach,
        validadeHabilitacao: data.validadeHabilitacao,
        tipoHabilitacao: data.tipoHabilitacao,
        tipoVinculo: data.tipoVinculo,
      },
    });
    setIsModalOpen(false);
  };

  const onSubmitDelete = async () => {
    if (!motoristaSelecionado) {
      setIsConfirmModalOpen(false);
      toast.error("Nenhum motorista selecionado");

      return;
    }

    try {
      await deleteMotoristaMutation.mutateAsync(motoristaSelecionado.id);
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  const handleReativar = async (motorista: MotoristaType) => {
    await editMotoristaMutation.mutateAsync({
      id: motorista.id,
      data: { ativo: true },
    });
  };

  return {
    handleDelete,
    handleReativar,
    handleOpenAdd,
    onEditSubmit,
    onCreateSubmit,
    handleOpenEdit,
    isModalOpen,
    setIsModalOpen,
    isEditing,
    isLoading,
    data,
    isError,
    createMotoristaMutation,
    editMotoristaMutation,
    deleteMotoristaMutation,
    onSubmitDelete,
    baseForm,
    createForm,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    motoristaSelecionado,
    isInfoModalOpen,
    setIsInfoModalOpen,
  };
}
