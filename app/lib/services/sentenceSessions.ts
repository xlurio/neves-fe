import type { SentencePracticeSession, UUID } from "~/types";
import {
  getSentenceSession,
  getSentenceSessions,
  postSentenceSessions,
} from "../adapters/sentences";
import type {
  PaginatedBackendResponse,
  PaginatedEndpointParams,
} from "~/types/adapters";

export class SentenceSessionRepository {
  public static async get(id: UUID): Promise<SentencePracticeSession> {
    return await getSentenceSession(id);
  }

  public static async create(): Promise<SentencePracticeSession> {
    return await postSentenceSessions();
  }

  public static async all(
    { page }: PaginatedEndpointParams = { page: 1 },
  ): Promise<PaginatedBackendResponse<SentencePracticeSession>> {
    return await getSentenceSessions({ page });
  }
}
