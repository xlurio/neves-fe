import {
  isBackendErrorSchema,
  isMissedQuestionErrorSchema,
  type PracticeSessionTest,
  type RadicalQuestionType,
  type UUID,
} from "~/types";
import { isAxiosError } from "axios";
import { MissedQuestionError, UnknownBackendError } from "../errors";
import type {
  GetPracticeSessionTestResultResponseSchema,
  PaginatedBackendResponse,
} from "~/types/adapters";
import {
  getRadicalSessionTestResult,
  getRadicalSessionTests,
  postRadicalSessionTestAnswer,
  postRadicalSessionTestCreate,
  postRadicalSessionTestFinish,
} from "../adapters/radicals";

/**
 * @throws {MissedQuestionError} Thrown when a question was missed.
 * @throws {UnknownBackendError} Thrown when a generic error came from the backend
 * response
 */
export class RadicalSessionTestRepository {
  public static async create(sessionId: UUID): Promise<PracticeSessionTest> {
    return await postRadicalSessionTestCreate(sessionId);
  }

  public static async answer(
    id: UUID,
    questionNum: number,
    answer: "a" | "b" | "c" | "d" | "e",
  ) {
    try {
      await postRadicalSessionTestAnswer({ id, questionNum, answer });
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
    return await getRadicalSessionTests({ id, page });
  }

  public static async finish(id: UUID) {
    try {
      return await postRadicalSessionTestFinish(id);
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
  ): Promise<GetPracticeSessionTestResultResponseSchema<RadicalQuestionType>> {
    try {
      return await getRadicalSessionTestResult(id);
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
