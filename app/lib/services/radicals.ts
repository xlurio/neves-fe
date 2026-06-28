import type { Radical, UUID } from "~/types";
import type {
  PaginatedBackendResponse,
  PaginatedForIdEndpointParams,
} from "~/types/adapters";
import {
  getRadicalSessionRadicals,
  postRadicalSessionsRadical,
} from "../adapters/radicals";

export class RadicalRepository {
  public static async createForSession(id: UUID) {
    return await postRadicalSessionsRadical(id);
  }

  public static async filterBySession({
    id,
    page,
  }: PaginatedForIdEndpointParams): Promise<PaginatedBackendResponse<Radical>> {
    return getRadicalSessionRadicals({
      id,
      page,
    });
  }
}
