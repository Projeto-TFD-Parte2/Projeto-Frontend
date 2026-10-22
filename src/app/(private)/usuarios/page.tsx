"use client";

import useUsuarios from "./hooks/useUsuarios";
import FormModal from "@/src/components/layout/modais/FormModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EmptyCustom from "@/src/components/ui/Empty";
import DataTable from "@/src/components/layout/data-table/DataTable";
import { useMemo } from "react";
import getUsuarioColumns from "./_components/usuarioColumns";
import { FormProvider } from "react-hook-form";
import CriarAdminFields from "./_components/criarAdminFields";
import EditUsuarioFields from "./_components/editUsuarioFields";
import { RoleUsuario } from "@/src/types/usuario.types";
import EditSenhaFields from "./_components/editSenhaFields";

export default function UsuariosPage() {
  const {
    handleOpenAdd,
    handleOpenEdit,
    handleOpenSenha,
    isModalOpen,
    setIsModalOpen,
    isEditing,
    isLoading,
    data,
    isError,
    createForm,
    editForm,
    senhaForm,
    onCreateSubmit,
    onEditSubmit,
    onSenhaSubmit,
    createAdminMutation,
    editUsuarioMutation,
    editSenhaMutation,
    isSenhaModalOpen,
    setIsSenhaModalOpen,
  } = useUsuarios();

  const columns = useMemo(
    () => getUsuarioColumns({ onEdit: handleOpenEdit, onEditSenha: handleOpenSenha }),
    [handleOpenEdit, handleOpenSenha],
  );

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Usuários Cadastrados</h1>

          <Button
            className="bg-blue-700 hover:bg-blue-600 cursor-pointer p-3"
            title="Criar administrador"
            size={"lg"}
            onClick={handleOpenAdd}
          >
            <Plus size={18} /> Novo Administrador
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
            searchPlaceholder="Pesquisar usuários..."
            statusFilter={{
              column: "role",
              options: [
                { label: "Administradores", value: RoleUsuario.Admin },
                { label: "Operadores", value: RoleUsuario.Operador },
              ],
            }}
          />
        )}
      </div>

      {isEditing ? (
        <FormProvider {...editForm}>
          <FormModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            title="Editar Usuário"
            onSubmit={editForm.handleSubmit(onEditSubmit)}
            disabled={!editForm.formState.isDirty}
            loading={editUsuarioMutation.isPending}
            size="lg"
          >
            <EditUsuarioFields />
          </FormModal>
        </FormProvider>
      ) : (
        <FormProvider {...createForm}>
          <FormModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            title="Criar Administrador"
            onSubmit={createForm.handleSubmit(onCreateSubmit)}
            loading={createAdminMutation.isPending}
            size="lg"
          >
            <CriarAdminFields />
          </FormModal>
        </FormProvider>
      )}

      <FormProvider {...senhaForm}>
        <FormModal
          open={isSenhaModalOpen}
          onOpenChange={setIsSenhaModalOpen}
          title="Editar Senha"
          description="Defina uma nova senha para o usuário"
          onSubmit={senhaForm.handleSubmit(onSenhaSubmit)}
          loading={editSenhaMutation.isPending}
          size="lg"
        >
          <EditSenhaFields />
        </FormModal>
      </FormProvider>
    </>
  );
}
