"use client";

import { queryKeys } from "@/src/constants/query-keys.constants";
import { ViagemRequests } from "@/src/services/api/viagem/viagemRequests";
import { EditViagemType, ViagemIdType } from "@/src/types/viagem.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditViagem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: ViagemIdType; data: EditViagemType }) =>
      ViagemRequests.edit({ id, dataEdit: data }),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.VIAGENS,
      });

      toast.success("Viagem atualizada com sucesso!");
    },

    onError() {
      toast.error("Erro ao atualizar viagem.");
    },
  });
}
