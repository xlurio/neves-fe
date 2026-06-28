import type { GetPracticeSessionTestQuestionParams } from "~/types/adapters";
import { getSentenceSessionTestQuestion } from "../adapters/sentences";

export class SentenceSessionTestQuestionRepository {
  public static async getQuestion({
    id,
    questionNum,
  }: GetPracticeSessionTestQuestionParams) {
    return getSentenceSessionTestQuestion({ id, questionNum });
  }
}
