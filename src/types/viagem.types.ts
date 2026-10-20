import { CidadeType } from "./cidade.types";
import { MotoristaType } from "./motorista.types";
import { PassageiroType } from "./passageiros.types";
import { VeiculoType } from "./veiculos.types";

export type ViagemIdType = number;

export enum TipoParticipacao {
  Paciente = "PACIENTE",
  Acompanhante = "ACOMPANHANTE",
}

export type ViagemPessoaType = {
  id: number;
  pessoaId: number;
  tipoParticipacao: TipoParticipacao;
  observacao: string | null;
  pessoa: PassageiroType;
};

export type ViagemType = {
  id: ViagemIdType;
  veiculoId: number;
  motoristaId: number;
  cidadeOrigemId: number;
  cidadeDestinoId: number;
  dataSaida: string;
  dataEntrada: string | null;
  observacao: string | null;
  createdAt: string;
  updatedAt: string;
  veiculo: VeiculoType;
  motorista: MotoristaType;
  cidadeOrigem: CidadeType;
  cidadeDestino: CidadeType;
  pessoas: ViagemPessoaType[];
};

export type ViagemParticipanteInputType = {
  pessoaId: number;
  tipoParticipacao: TipoParticipacao;
  observacao?: string;
};

export type EditViagemType = {
  veiculoId?: number;
  cidadeOrigemId?: number;
  cidadeDestinoId?: number;
  dataSaida?: string;
  dataEntrada?: string | null;
  observacao?: string | null;
  pessoas?: ViagemParticipanteInputType[];
};

