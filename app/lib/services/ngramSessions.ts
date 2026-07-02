import type { NgramPracticeSession, UUID } from "~/types";
import {
  getNgramSession,
  getNgramSessions,
  postNgramSessions,
} from "../adapters/ngrams";
import type {
  PaginatedBackendResponse,
  PaginatedEndpointParams,
} from "~/types/adapters";

export class NgramSessionRepository {
  public static async get(id: UUID): Promise<NgramPracticeSession> {
    return await getNgramSession(id);
  }

  public static async create(): Promise<NgramPracticeSession> {
    return await postNgramSessions();
  }

  public static async all(
    { page }: PaginatedEndpointParams = { page: 1 },
  ): Promise<PaginatedBackendResponse<NgramPracticeSession>> {
    return await getNgramSessions({ page });
  }
}
