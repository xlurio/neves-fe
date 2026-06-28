import type { GetPracticeSessionTestQuestionParams } from "~/types/adapters";
import { getRadicalSessionTestQuestion } from "../adapters/radicals";

export class RadicalSessionTestQuestionRepository {
  public static async getQuestion({
    id,
    questionNum,
  }: GetPracticeSessionTestQuestionParams) {
    return getRadicalSessionTestQuestion({ id, questionNum });
  }
}
