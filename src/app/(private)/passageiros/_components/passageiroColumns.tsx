"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { PassageiroType } from "@/src/types/passageiros.types";
import { mascararCpf } from "@/src/utils/maskCpf";

interface PassageiroColumnsProps {
  onEdit: (passageiro: PassageiroType) => void;
  onDelete: (passageiro: PassageiroType) => void;
}

export default function getPassageiroColumns({
  onEdit,
  onDelete,
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
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              title="Editar item"
              className="cursor-pointer"
              size="icon"
              variant="ghost"
              onClick={() => onEdit(row.original)}
            >
              <Pencil className="size-4 text-slate-600" />
            </Button>

            <Button
              title="Excluir item"
              className="cursor-pointer"
              size="icon"
              variant="ghost"
              onClick={() => onDelete(row.original)}
            >
              <Trash2 className="size-4 text-destructive/70" />
            </Button>
          </div>
        );
      },
    },
  ];
}
