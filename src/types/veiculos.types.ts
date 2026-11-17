export enum TipoVeiculo {
  Proprio = "PROPRIO",
  Locado = "LOCADO",
}

export type VeiculoIdType = number;

export type VeiculoType = {
  id: VeiculoIdType;
  nome: string;
  placa: string;
  ano: number;
  renavam: string;
  tipo: TipoVeiculo;
  ativo?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateVeiculoType = Omit<VeiculoType, "id" | "createdAt" | "updatedAt">;

export type EditVeiculoType = Partial<CreateVeiculoType>;
