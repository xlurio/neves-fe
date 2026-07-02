import {
  isBackendErrorSchema,
  isMissedQuestionErrorSchema,
  type PracticeSessionAssessment,
  type NgramQuestionType,
  type UUID,
} from "~/types";
import { isAxiosError } from "axios";
import { MissedQuestionError, UnknownBackendError } from "../errors";
import type {
  GetPracticeSessionAssessmentResultResponseSchema,
  PaginatedBackendResponse,
} from "~/types/adapters";
import {
  getNgramSessionAssessmentResult,
  getNgramSessionAssessments,
  postNgramSessionAssessmentAnswer,
  postNgramSessionAssessmentCreate,
  postNgramSessionAssessmentFinish,
} from "../adapters/ngrams";

/**
 * @throws {MissedQuestionError} Thrown when a question was missed.
 * @throws {UnknownBackendError} Thrown when a generic error came from the backend
 * response
 */
export class NgramSessionAssessmentRepository {
  public static async create(
    sessionId: UUID,
  ): Promise<PracticeSessionAssessment> {
    return await postNgramSessionAssessmentCreate(sessionId);
  }

  public static async answer(
    id: UUID,
    questionNum: number,
    answer: "a" | "b" | "c" | "d" | "e",
  ) {
    try {
      await postNgramSessionAssessmentAnswer({ id, questionNum, answer });
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
  ): Promise<PaginatedBackendResponse<PracticeSessionAssessment>> {
    return await getNgramSessionAssessments({ id, page });
  }

  public static async finish(id: UUID) {
    try {
      return await postNgramSessionAssessmentFinish(id);
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
  ): Promise<
    GetPracticeSessionAssessmentResultResponseSchema<NgramQuestionType>
  > {
    try {
      return await getNgramSessionAssessmentResult(id);
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
