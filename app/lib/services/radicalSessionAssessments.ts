import {
  isBackendErrorSchema,
  isMissedQuestionErrorSchema,
  type PracticeSessionAssessment,
  type RadicalQuestionType,
  type UUID,
} from "~/types";
import { isAxiosError } from "axios";
import { MissedQuestionError, UnknownBackendError } from "../errors";
import type {
  GetPracticeSessionAssessmentResultResponseSchema,
  PaginatedBackendResponse,
} from "~/types/adapters";
import {
  getRadicalSessionAssessmentResult,
  getRadicalSessionAssessments,
  postRadicalSessionAssessmentAnswer,
  postRadicalSessionAssessmentCreate,
  postRadicalSessionAssessmentFinish,
} from "../adapters/radicals";

/**
 * @throws {MissedQuestionError} Thrown when a question was missed.
 * @throws {UnknownBackendError} Thrown when a generic error came from the backend
 * response
 */
export class RadicalSessionAssessmentRepository {
  public static async create(
    sessionId: UUID,
  ): Promise<PracticeSessionAssessment> {
    return await postRadicalSessionAssessmentCreate(sessionId);
  }

  public static async answer(
    id: UUID,
    questionNum: number,
    answer: "a" | "b" | "c" | "d" | "e",
  ) {
    try {
      await postRadicalSessionAssessmentAnswer({ id, questionNum, answer });
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
    return await getRadicalSessionAssessments({ id, page });
  }

  public static async finish(id: UUID) {
    try {
      return await postRadicalSessionAssessmentFinish(id);
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
    GetPracticeSessionAssessmentResultResponseSchema<RadicalQuestionType>
  > {
    try {
      return await getRadicalSessionAssessmentResult(id);
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
