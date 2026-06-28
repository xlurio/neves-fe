import {
  isBackendErrorSchema,
  isMissedQuestionErrorSchema,
  type PracticeSessionTest,
  type SentenceQuestionType,
  type UUID,
} from "~/types";
import { isAxiosError } from "axios";
import { MissedQuestionError, UnknownBackendError } from "../errors";
import type {
  GetPracticeSessionTestResultResponseSchema,
  PaginatedBackendResponse,
} from "~/types/adapters";
import {
  getSentenceSessionTestResult,
  getSentenceSessionTests,
  postSentenceSessionTestAnswer,
  postSentenceSessionTestCreate,
  postSentenceSessionTestFinish,
} from "../adapters/sentences";

/**
 * @throws {MissedQuestionError} Thrown when a question was missed.
 * @throws {UnknownBackendError} Thrown when a generic error came from the backend
 * response
 */
export class SentenceSessionTestRepository {
  public static async create(sessionId: UUID): Promise<PracticeSessionTest> {
    return await postSentenceSessionTestCreate(sessionId);
  }

  public static async answer(
    id: UUID,
    questionNum: number,
    answer: "a" | "b" | "c" | "d" | "e",
  ) {
    try {
      await postSentenceSessionTestAnswer({ id, questionNum, answer });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (isBackendErrorSchema(error.response?.data)) {
          if (isMissedQuestionErrorSchema(error.response.data)) {
            throw new MissedQuestionError(
              error.response.data.title,
              error.response.data.details,
              error.response.data.payload.questionMissed,
            );
          }

          throw new UnknownBackendError(
            error.response.data.title,
            error.response.data.details,
          );
        }
      }

      throw error;
    }
  }

  public static async list(
    id: UUID,
    page: number = 1,
  ): Promise<PaginatedBackendResponse<PracticeSessionTest>> {
    return await getSentenceSessionTests({ id, page });
  }

  public static async finish(id: UUID) {
    try {
      return await postSentenceSessionTestFinish(id);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (isBackendErrorSchema(error.response?.data)) {
          if (isMissedQuestionErrorSchema(error.response.data)) {
            throw new MissedQuestionError(
              error.response.data.title,
              error.response.data.details,
              error.response.data.payload.questionMissed,
            );
          }

          throw new UnknownBackendError(
            error.response.data.title,
            error.response.data.details,
          );
        }
      }

      throw error;
    }
  }

  public static async getResult(
    id: UUID,
  ): Promise<GetPracticeSessionTestResultResponseSchema<SentenceQuestionType>> {
    try {
      return await getSentenceSessionTestResult(id);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (isBackendErrorSchema(error.response?.data)) {
          if (isMissedQuestionErrorSchema(error.response.data)) {
            throw new MissedQuestionError(
              error.response.data.title,
              error.response.data.details,
              error.response.data.payload.questionMissed,
            );
          }

          throw new UnknownBackendError(
            error.response.data.title,
            error.response.data.details,
          );
        }
      }

      throw error;
    }
  }
}
