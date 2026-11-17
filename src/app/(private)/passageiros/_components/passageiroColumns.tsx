"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, RotateCcw, Trash2 } from "lucide-react";
import { PassageiroType } from "@/src/types/passageiros.types";
import { mascararCpf } from "@/src/utils/maskCpf";
import Badge from "@/src/components/ui/Badge";

interface PassageiroColumnsProps {
  onEdit: (passageiro: PassageiroType) => void;
  onDelete: (passageiro: PassageiroType) => void;
  onReativar?: (passageiro: PassageiroType) => void;
}

export default function getPassageiroColumns({
  onEdit,
  onDelete,
  onReativar,
}: PassageiroColumnsProps): ColumnDef<PassageiroType>[] {
  return [
    {
      accessorKey: "nome",
      header: "Nome",
    },

    {
      accessorKey: "cpf",
      header: "CPF",
      cell: ({ row }) => mascararCpf(row.original.cpf),
    },

    {
      accessorKey: "cartaoSus",
      header: "Cartão do SUS",
      cell: ({ row }) => row.original.cartaoSus || "-",
    },

    {
      accessorKey: "dataNascimento",
      header: "Data de Nascimento",
      cell: ({ row }) =>
        row.original.dataNascimento ? new Date(row.original.dataNascimento).toLocaleDateString("pt-BR") : "-",
    },

    {
      accessorKey: "telefone",
      header: "Telefone",
      cell: ({ row }) => row.original.telefone || "-",
    },

    {
      accessorKey: "endereco",
      header: "Endereço",
      cell: ({ row }) => row.original.endereco || "-",
    },

    {
      accessorKey: "municipio",
      header: "Município",
      cell: ({ row }) => row.original.municipio || "-",
    },

    {
      accessorKey: "ativo",
      header: "Status",
      cell: ({ row }) => {
        const isAtivo = row.original.ativo !== false;
        return (
          <Badge variant={isAtivo ? "success" : "danger"}>
            {isAtivo ? "Ativo" : "Inativo"}
          </Badge>
        );
      },
    },

    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const isAtivo = row.original.ativo !== false;

        return (
          <div className="flex gap-2">
            <Button
              title="Editar passageiro"
              className="cursor-pointer"
              size="icon"
              variant="ghost"
              onClick={() => onEdit(row.original)}
            >
              <Pencil className="size-4 text-slate-600" />
            </Button>

            {isAtivo ? (
              <Button
                title="Desativar passageiro"
                className="cursor-pointer"
                size="icon"
                variant="ghost"
                onClick={() => onDelete(row.original)}
              >
                <Trash2 className="size-4 text-destructive/70" />
              </Button>
            ) : (
              <Button
                title="Reativar passageiro"
                className="cursor-pointer"
                size="icon"
                variant="ghost"
                onClick={() => onReativar?.(row.original)}
              >
                <RotateCcw className="size-4 text-emerald-600" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];
}
