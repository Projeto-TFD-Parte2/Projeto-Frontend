"use client";

import useViagens from "./hooks/useViagens";
import { useViagensFiltrosOptions } from "./hooks/useViagensFiltrosOptions";
import EmptyCustom from "@/src/components/ui/Empty";
import DataTable from "@/src/components/layout/data-table/DataTable";
import { useMemo } from "react";
import getViagemColumns from "./_components/viagemColumns";
import ViagemFiltros from "./_components/viagemFiltros";
import InfoModal from "@/src/components/layout/modais/InfoModal";
import FormModal from "@/src/components/layout/modais/FormModal";
import ConfirmModal from "@/src/components/layout/modais/ConfirmModal";
import ViagemDetalhesView from "./_components/viagemDetalhesView";
import ViagemEditFields from "./_components/viagemEditFields";
import { FormProvider } from "react-hook-form";

export default function ViagensPage() {
  const {
    isLoading,
    data,
    isError,
    isDetalhesModalOpen,
    setIsDetalhesModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    viagemSelecionada,
    handleViewDetalhes,
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
    pageSize,
  } = useViagens();

  const { motoristas, veiculos, passageiros, cidades } = useViagensFiltrosOptions();

  const columns = useMemo(
    () =>
      getViagemColumns({
        onViewDetalhes: handleViewDetalhes,
        onEdit: handleOpenEdit,
        onDelete: handleDelete,
      }),
    [handleViewDetalhes, handleOpenEdit, handleDelete],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Viagens Cadastradas</h1>
      </div>

      {isError ? (
        <div className="my-10">
          <EmptyCustom isError />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data || []}
          isLoading={isLoading}
          toolbar={
            <ViagemFiltros
              filtros={filtros}
              onFiltroChange={handleFiltroChange}
              onLimparFiltros={handleLimparFiltros}
              motoristas={motoristas}
              veiculos={veiculos}
              passageiros={passageiros}
              cidades={cidades}
            />
          }
          pagination={{
            pageIndex,
            pageSize,
            hasNextPage,
            onPageChange: setPageIndex,
          }}
        />
      )}

      {/* Modal de detalhes completos da viagem */}
      <InfoModal
        title="Detalhes da Viagem"
        description="Informações completas do trajeto, motorista, veículo e passageiros"
        open={isDetalhesModalOpen}
        onOpenChange={setIsDetalhesModalOpen}
        size="xl"
      >
        {viagemSelecionada && <ViagemDetalhesView viagem={viagemSelecionada} />}
      </InfoModal>

      {/* Modal de edição da viagem */}
      <FormProvider {...form}>
        <FormModal
          title="Editar Viagem"
          description="Altere as informações da viagem e seus passageiros vinculados"
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSubmit={form.handleSubmit(onSubmitEdit)}
          size="xl"
          className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
          loading={editViagemMutation.isPending}
          disabled={!form.formState.isDirty}
        >
          <ViagemEditFields
            veiculos={veiculos}
            motoristas={motoristas}
            cidades={cidades}
            passageiros={passageiros}
          />
        </FormModal>
      </FormProvider>

      {/* Modal de confirmação de exclusão */}
      <ConfirmModal
        title="Confirmação de exclusão"
        description={
          <>
            Deseja realmente excluir a viagem de{" "}
            <strong className="text-destructive">
              {viagemSelecionada?.cidadeOrigem?.nome} para {viagemSelecionada?.cidadeDestino?.nome}
            </strong>{" "}
            realizada em{" "}
            <strong>
              {viagemSelecionada ? new Date(viagemSelecionada.dataSaida).toLocaleDateString("pt-BR") : ""}
            </strong>
            ? Esta ação não pode ser desfeita.
          </>
        }
        open={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onClick={onSubmitDelete}
        loading={deleteViagemMutation.isPending}
      />
    </div>
  );
}
