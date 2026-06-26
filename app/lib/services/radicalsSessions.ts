import type { PaginatedBackendResponse, RadicalSession, UUID } from "~/types";
import {
  getRadicalSession,
  getRadicalSessions,
  postRadicalSessions,
  type GetRadicalSessionsParams,
} from "../adapters";

export class RadicalSessionRepository {
  public static async get(id: UUID): Promise<RadicalSession> {
    return await getRadicalSession(id);
  }

  public static async create(): Promise<RadicalSession> {
    return await postRadicalSessions();
  }

  public static async all(
    { page }: GetRadicalSessionsParams = { page: 1 },
  ): Promise<PaginatedBackendResponse<RadicalSession>> {
    return await getRadicalSessions({ page });
  }
}
