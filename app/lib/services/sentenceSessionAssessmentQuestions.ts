import type { GetPracticeSessionAssessmentQuestionParams } from "~/types/adapters";
import { getSentenceSessionAssessmentQuestion } from "../adapters/sentences";

export class SentenceSessionAssessmentQuestionRepository {
  public static async getQuestion({
    id,
    questionNum,
  }: GetPracticeSessionAssessmentQuestionParams) {
    return getSentenceSessionAssessmentQuestion({ id, questionNum });
  }
}
