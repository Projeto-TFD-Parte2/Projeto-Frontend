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
import VeiculoInfoView from "./_components/veiculoInfoView";
import PassageirosInfoView from "./_components/passageirosInfoView";
import ViagemEditFields from "./_components/viagemEditFields";
import { FormProvider } from "react-hook-form";

export default function ViagensPage() {
  const {
    isLoading,
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
    pageSize,
  } = useViagens();

  const { motoristas, veiculos, passageiros, cidades } = useViagensFiltrosOptions();

  const columns = useMemo(
    () =>
      getViagemColumns({
        onViewVeiculo: handleViewVeiculo,
        onViewPassageiros: handleViewPassageiros,
        onEdit: handleOpenEdit,
        onDelete: handleDelete,
      }),
    [handleViewVeiculo, handleViewPassageiros, handleOpenEdit, handleDelete],
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

      {/* Modal de dados do veículo */}
      <InfoModal
        title="Dados do Veículo"
        description="Informações do veículo utilizado nessa viagem"
        open={isVeiculoModalOpen}
        onOpenChange={setIsVeiculoModalOpen}
        size="lg"
      >
        {viagemSelecionada && <VeiculoInfoView veiculo={viagemSelecionada.veiculo} />}
      </InfoModal>

      {/* Modal de passageiros */}
      <InfoModal
        title="Passageiros da Viagem"
        description="Pessoas vinculadas a essa viagem"
        open={isPassageirosModalOpen}
        onOpenChange={setIsPassageirosModalOpen}
        size="xl"
      >
        {viagemSelecionada && <PassageirosInfoView pessoas={viagemSelecionada.pessoas} />}
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
