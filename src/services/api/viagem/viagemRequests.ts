import { EditViagemType, ViagemIdType, ViagemType } from "@/src/types/viagem.types";
import { provider } from "../provider";

export type ParametrosViagensRequest = {
  motoristaId?: number;
  veiculoId?: number;
  passageiroId?: number;
  cidadeDestinoId?: number;
  dataInicio?: string;
  dataFim?: string;
  page?: number;
  limit?: number;
};

export class ViagemRequests {
  private static BASE_ROUTE = "/viagens";

  static async getAll(params?: ParametrosViagensRequest): Promise<ViagemType[]> {
    const { data } = await provider.get(`${this.BASE_ROUTE}`, { params: { ...params } });

    return data;
  }

  static async getById(id: ViagemIdType): Promise<ViagemType> {
    const { data } = await provider.get(`${this.BASE_ROUTE}/${id}`);

    return data;
  }

  static async edit({ id, dataEdit }: { id: ViagemIdType; dataEdit: EditViagemType }): Promise<ViagemType> {
    const { data } = await provider.patch(`${this.BASE_ROUTE}/${id}`, dataEdit);

    return data;
  }

  static async delete(id: ViagemIdType): Promise<void> {
    const { data } = await provider.delete(`${this.BASE_ROUTE}/${id}`);

    return data;
  }
}
