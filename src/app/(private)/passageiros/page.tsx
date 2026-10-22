"use client";

import usePassageiros from "./hooks/usePassageiros";
import FormModal from "@/src/components/layout/modais/FormModal";
import PassageiroFields from "./_components/passageiroFields";
import { useMemo } from "react";
import getPassageiroColumns from "./_components/passageiroColumns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataTable from "@/src/components/layout/data-table/DataTable";
import { FormProvider } from "react-hook-form";
import EmptyCustom from "@/src/components/ui/Empty";
import ConfirmModal from "@/src/components/layout/modais/ConfirmModal";

export default function PassageirosPage() {
  const {
    handleDelete,
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
  } = usePassageiros();

  const columns = useMemo(
    () =>
      getPassageiroColumns({
        onEdit: handleOpenEdit,
        onDelete: handleDelete,
      }),
    [handleOpenEdit, handleDelete],
  );

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Passageiros Cadastrados</h1>

          <Button
            className="bg-blue-700 hover:bg-blue-600 cursor-pointer p-3"
            title="Adicionar novo passageiro"
            size={"lg"}
            onClick={handleOpenAdd}
          >
            <Plus size={18} /> Novo Passageiro
          </Button>
        </div>

        {isError ? (
          <div className="my-10">
            <EmptyCustom isError />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={data || []}
            searchColumn="nome"
            isLoading={isLoading}
            searchPlaceholder="Pesquisar passageiros..."
          />
        )}

        <FormModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSubmit={form.handleSubmit(onSubmit)}
          title={isEditing ? "Editar Passageiro" : "Novo Passageiro"}
          size="xl"
          className="sm:max-w-1/2"
          disabled={isEditing ? !form.formState.isDirty : false}
          loading={isEditing ? editPassageiroMutation.isPending : createPassageiroMutation.isPending}
        >
          <PassageiroFields />
        </FormModal>

        <ConfirmModal
          title="Confirmação de exclusão"
          description={
            <>
              deseja realmente excluir o passageiro{" "}
              <strong className="text-destructive">{passageiroSelecionado?.nome}</strong>
            </>
          }
          open={isConfirmModalOpen}
          onOpenChange={setIsConfirmModalOpen}
          onClick={onSubmitDelete}
          loading={deletePassageiroMutation.isPending}
        />
      </div>
    </FormProvider>
  );
}
