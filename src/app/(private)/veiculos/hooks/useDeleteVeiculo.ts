"use client";

import { queryKeys } from "@/src/constants/query-keys.constants";
import { VeiculoRequests } from "@/src/services/api/veiculo/veiculoRequests";
import { VeiculoIdType } from "@/src/types/veiculos.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteVeiculo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: VeiculoIdType) => VeiculoRequests.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.VEICULOS });

      toast.success("Veículo desativado com sucesso!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Ocorreu um erro ao desativar o veículo, tente novamente!";
      toast.error(message);
    },
  });
}
