import { TipoParticipacao } from "@/src/types/viagem.types";
import { z } from "zod/v4";

export const viagemPessoaFormSchema = z.object({
  pessoaId: z.number().int().positive("Selecione um passageiro"),
  tipoParticipacao: z.enum(TipoParticipacao),
  observacao: z.string().optional(),
  nome: z.string().optional(),
  cpf: z.string().nullable().optional(),
});

export const editViagemSchema = z
  .object({
    veiculoId: z.number({ error: "Selecione um veículo" }).int().positive("Selecione um veículo"),
    motoristaId: z.number({ error: "Selecione um motorista" }).int().positive("Selecione um motorista"),
    cidadeOrigemId: z.number({ error: "Selecione a cidade de origem" }).int().positive("Selecione a cidade de origem"),
    cidadeDestinoId: z.number({ error: "Selecione a cidade de destino" }).int().positive("Selecione a cidade de destino"),
    dataSaida: z.string().min(1, "Informe a data e horário de saída"),
    dataEntrada: z.string().optional().or(z.literal("")),
    observacao: z.string().optional(),
    pessoas: z.array(viagemPessoaFormSchema).min(1, "A viagem deve conter ao menos um passageiro"),
  })
  .refine((data) => data.cidadeOrigemId !== data.cidadeDestinoId, {
    message: "A cidade de destino não pode ser igual à cidade de origem",
    path: ["cidadeDestinoId"],
  })
  .refine(
    (data) => {
      if (!data.dataEntrada || data.dataEntrada.trim() === "") return true;
      return new Date(data.dataEntrada) >= new Date(data.dataSaida);
    },
    {
      message: "Data de retorno/chegada não pode ser anterior à saída",
      path: ["dataEntrada"],
    },
  );

export type ViagemPessoaFormData = z.infer<typeof viagemPessoaFormSchema>;
export type EditViagemFormData = z.infer<typeof editViagemSchema>;
