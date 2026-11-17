export type MotoristaIdType = number;

export enum TipoVinculoMotorista {
  Efetivo = "EFETIVO",
  Contratado = "CONTRATADO",
  Comissionado = "COMISSIONADO",
}

export enum TipoHabilitacao {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

export type MotoristaType = {
  id: MotoristaIdType;
  nome: string;
  cpf: string;
  endereco: string;
  renach: string;
  validadeHabilitacao: string;
  tipoHabilitacao: TipoHabilitacao;
  tipoVinculo: TipoVinculoMotorista;
  ativo?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateMotoristaType = Omit<MotoristaType, "id" | "createdAt" | "updatedAt">;

export type EditMotoristaType = Partial<MotoristaType>;
