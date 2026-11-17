"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { TipoVeiculo, VeiculoType } from "@/src/types/veiculos.types";
import Badge from "@/src/components/ui/Badge";

interface VehicleColumnsProps {
  onEdit: (vehicle: VeiculoType) => void;
  onDelete: (vehicle: VeiculoType) => void;

}

export default function getVehicleColumns({
  onEdit,
  onDelete,
  onReativar,
}: VehicleColumnsProps): ColumnDef<VeiculoType>[] {
  return [
    {
      accessorKey: "nome",
      header: "Nome",
    },

    {
      accessorKey: "placa",
      header: "Placa",
    },

    {
      accessorKey: "ano",
      header: "Ano",
    },

    {
      accessorKey: "renavam",
      header: "Renavam",
    },

    {
      accessorKey: "tipo",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge variant={row.original.tipo === TipoVeiculo.Proprio ? "success" : "warning"}>{row.original.tipo}</Badge>
      ),
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
              title="Editar veículo"
              className="cursor-pointer"
              size="icon"
              variant="ghost"
              onClick={() => onEdit(row.original)}
            >
              <Pencil className="size-4 text-slate-600" />
            </Button>

            {isAtivo ? (
              <Button
                title="Desativar veículo"
                className="cursor-pointer"
                size="icon"
                variant="ghost"
                onClick={() => onDelete(row.original)}
              >
                <Trash2 className="size-4 text-destructive/70" />
              </Button>
            ) : (
              <Button
                title="Reativar veículo"
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
