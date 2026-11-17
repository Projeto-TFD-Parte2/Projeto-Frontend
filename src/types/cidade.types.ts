export type CidadeIdType = number;

export type CidadeType = {
  id: CidadeIdType;
  nome: string;
  uf: string;
  ativo?: boolean;
};
