import type { GetPracticeSessionAssessmentQuestionParams } from "~/types/adapters";
import { getNgramSessionAssessmentQuestion } from "../adapters/ngrams";

export class NgramSessionAssessmentQuestionRepository {
  public static async getQuestion({
    id,
    questionNum,
  }: GetPracticeSessionAssessmentQuestionParams) {
    return getNgramSessionAssessmentQuestion({ id, questionNum });
  }
}
