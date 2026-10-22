"use client";

import { TipoVeiculo } from "@/src/types/veiculos.types";
import useVeiculos from "./hooks/useVeiculos";
import FormModal from "@/src/components/layout/modais/FormModal";
import VeiculoFields from "./_components/veiculoFields";
import DataTable from "@/src/components/layout/data-table/DataTable";
import getVehicleColumns from "./_components/veiculoColumns";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { Plus } from "lucide-react";
import EmptyCustom from "@/src/components/ui/Empty";
import { FormProvider } from "react-hook-form";
import ConfirmModal from "@/src/components/layout/modais/ConfirmModal";

export default function VeiculosPage() {
  const {
    onSubmit,
    handleDelete,
    isModalOpen,
    setIsModalOpen,
    handleOpenEdit,
    handleOpenAdd,
    form,
    isLoading,
    isError,
    data,
    createVeiculoMutation,
    isEditing,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    onSubmitDelete,
    deleteVeiculoMutation,
    veiculoSelecionado,
    editVeiculoMutation,
  } = useVeiculos();

  const columns = useMemo(
    () =>
      getVehicleColumns({
        onEdit: handleOpenEdit,
        onDelete: handleDelete,
      }),
    [handleOpenEdit, handleDelete],
  );

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Veículos Cadastrados</h1>

          <Button
            className="bg-blue-700 hover:bg-blue-600 cursor-pointer p-3"
            title="Adicionar novo veiculo"
            size={"lg"}
            onClick={handleOpenAdd}
          >
            <Plus size={18} /> Novo Veiculo
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
            searchPlaceholder="Pesquisar veiculos..."
            statusFilter={{
              column: "tipo",
              options: [
                { label: "Proprio", value: TipoVeiculo.Proprio },
                { label: "Locado", value: TipoVeiculo.Locado },
              ],
            }}
          />
        )}

        <FormModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSubmit={form.handleSubmit(onSubmit)}
          title={isEditing ? "Editar Veículo" : "Novo Veículo"}
          size="xl"
          loading={isEditing ? editVeiculoMutation.isPending : createVeiculoMutation.isPending}
          disabled={isEditing ? !form.formState.isDirty : false}
        >
          <VeiculoFields />
        </FormModal>

        <ConfirmModal
          title="Confirmação de exclusão"
          description={
            <>
              deseja realmente excluir o veiculo{" "}
              <strong className="text-destructive">{veiculoSelecionado?.nome}</strong>
            </>
          }
          open={isConfirmModalOpen}
          onOpenChange={setIsConfirmModalOpen}
          onClick={onSubmitDelete}
          loading={deleteVeiculoMutation.isPending}
        />
      </div>
    </FormProvider>
  );
}
