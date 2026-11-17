"use client";

import { queryKeys } from "@/src/constants/query-keys.constants";
import { MotoristaRequests } from "@/src/services/api/motorista/motoristaRequests";
import { MotoristaIdType } from "@/src/types/motorista.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteMotorista() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: MotoristaIdType) => MotoristaRequests.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.MOTORISTAS });

      toast.success("Motorista desativado com sucesso!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Ocorreu um erro ao desativar o motorista, tente novamente!";
      toast.error(message);
    },
  });
}
