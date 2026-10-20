"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Bus, Pencil, Trash2, Users } from "lucide-react";
import { ViagemType } from "@/src/types/viagem.types";

interface ViagemColumnsProps {
  onViewVeiculo: (viagem: ViagemType) => void;
  onViewPassageiros: (viagem: ViagemType) => void;
  onEdit: (viagem: ViagemType) => void;
  onDelete: (viagem: ViagemType) => void;
}

export default function getViagemColumns({
  onViewVeiculo,
  onViewPassageiros,
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
            title="Ver dados do veículo"
            className="cursor-pointer"
            size="icon"
            variant="ghost"
            onClick={() => onViewVeiculo(row.original)}
          >
            <Bus className="size-4 text-slate-800" />
          </Button>

          <Button
            title="Ver passageiros"
            className="cursor-pointer"
            size="icon"
            variant="ghost"
            onClick={() => onViewPassageiros(row.original)}
          >
            <Users className="size-4 text-blue-600" />
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
