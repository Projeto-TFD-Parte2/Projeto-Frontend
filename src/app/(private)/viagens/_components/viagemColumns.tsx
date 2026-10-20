"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ViagemType } from "@/src/types/viagem.types";

interface ViagemColumnsProps {
  onViewDetalhes: (viagem: ViagemType) => void;
  onEdit: (viagem: ViagemType) => void;
  onDelete: (viagem: ViagemType) => void;
}

export default function getViagemColumns({
  onViewDetalhes,
  onEdit,
  onDelete,
}: ViagemColumnsProps): ColumnDef<ViagemType>[] {
  return [
    {
      accessorKey: "dataSaida",
      header: "Data de Saída",
      cell: ({ row }) => new Date(row.original.dataSaida).toLocaleString("pt-BR"),
    },

    {
      accessorKey: "dataEntrada",
      header: "Data de Entrada",
      cell: ({ row }) => (row.original.dataEntrada ? new Date(row.original.dataEntrada).toLocaleString("pt-BR") : "-"),
    },

    {
      id: "motorista",
      header: "Motorista",
      accessorFn: (row) => row.motorista.nome,
    },

    {
      id: "cidadeOrigem",
      header: "Cidade de Origem",
      accessorFn: (row) => `${row.cidadeOrigem.nome}/${row.cidadeOrigem.uf}`,
    },

    {
      id: "cidadeDestino",
      header: "Cidade de Destino",
      accessorFn: (row) => `${row.cidadeDestino.nome}/${row.cidadeDestino.uf}`,
    },

    {
      accessorKey: "observacao",
      header: "Observação",
      cell: ({ row }) => row.original.observacao || "-",
    },

    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            title="Ver detalhes da viagem"
            className="cursor-pointer"
            size="icon"
            variant="ghost"
            onClick={() => onViewDetalhes(row.original)}
          >
            <Eye className="size-4 text-blue-600" />
          </Button>

          <Button
            title="Editar viagem"
            className="cursor-pointer"
            size="icon"
            variant="ghost"
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="size-4 text-slate-600" />
          </Button>

          <Button
            title="Excluir viagem"
            className="cursor-pointer"
            size="icon"
            variant="ghost"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="size-4 text-destructive/70" />
          </Button>
        </div>
      ),
    },
  ];
}
