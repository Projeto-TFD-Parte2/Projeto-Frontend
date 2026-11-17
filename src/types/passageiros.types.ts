export type PassageiroIdType = number;

export type PassageiroType = {
  id: PassageiroIdType;
  nome: string;
  cpf: string | null;
  cartaoSus: string | null;
  dataNascimento: string | null;
  telefone: string | null;
  endereco: string | null;
  municipio: string | null;
  ativo?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreatePassageiroType = Omit<PassageiroType, "id" | "createdAt" | "updatedAt">;

export type EditPassageiroType = Partial<PassageiroType>;
