import {
  getRadicalSessionTestQuestion,
  type GetRadicalSessionTestQuestionParams,
} from "../adapters";

export class RadicalSessionTestQuestionRepository {
  public static async getQuestion({
    id,
    questionNum,
  }: GetRadicalSessionTestQuestionParams) {
    return getRadicalSessionTestQuestion({ id, questionNum });
  }
}
