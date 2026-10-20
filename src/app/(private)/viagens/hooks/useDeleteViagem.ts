"use client";

import { queryKeys } from "@/src/constants/query-keys.constants";
import { ViagemRequests } from "@/src/services/api/viagem/viagemRequests";
import { ViagemIdType } from "@/src/types/viagem.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteViagem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: ViagemIdType) => ViagemRequests.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.VIAGENS });

      toast.success("Viagem removida com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao deletar a viagem, tente novamente!");
    },
  });
}
