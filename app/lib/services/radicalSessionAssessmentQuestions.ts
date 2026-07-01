import type { GetPracticeSessionAssessmentQuestionParams } from "~/types/adapters";
import { getRadicalSessionAssessmentQuestion } from "../adapters/radicals";

export class RadicalSessionAssessmentQuestionRepository {
  public static async getQuestion({
    id,
    questionNum,
  }: GetPracticeSessionAssessmentQuestionParams) {
    return getRadicalSessionAssessmentQuestion({ id, questionNum });
  }
}
