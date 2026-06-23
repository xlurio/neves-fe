import type { PaginatedBackendResponse, Radical, UUID } from "~/types";
import {
  getRadicalSessionRadicals,
  type GetRadicalSessionRadicalsParams,
} from "../adapters";

export class RadicalRepository {
  public static async filterBySession({
    id,
    page,
  }: GetRadicalSessionRadicalsParams): Promise<
    PaginatedBackendResponse<Radical>
  > {
    return getRadicalSessionRadicals({
      id,
      page,
    });
  }
}
