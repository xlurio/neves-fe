import type { RadicalPracticeSession, UUID } from "~/types";
import type {
  PaginatedBackendResponse,
  PaginatedEndpointParams,
} from "~/types/adapters";
import {
  getRadicalSession,
  getRadicalSessions,
  postRadicalSessions,
} from "../adapters/radicals";

export class RadicalSessionRepository {
  public static async get(id: UUID): Promise<RadicalPracticeSession> {
    return await getRadicalSession(id);
  }

  public static async create(): Promise<RadicalPracticeSession> {
    return await postRadicalSessions();
  }

  public static async all(
    { page }: PaginatedEndpointParams = { page: 1 },
  ): Promise<PaginatedBackendResponse<RadicalPracticeSession>> {
    return await getRadicalSessions({ page });
  }
}
