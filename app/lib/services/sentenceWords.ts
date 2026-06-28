import type { GetSentenceSessionSentenceWordsParams } from "~/types/adapters";
import { getSentenceSessionSentenceWords } from "../adapters/sentences";

export class SentenceWordRepository {
  public static async getBySessionAndPosition({
    id,
    sentenceNum,
    wordNum,
  }: GetSentenceSessionSentenceWordsParams) {
    return getSentenceSessionSentenceWords({
      id,
      sentenceNum,
      wordNum,
    });
  }
}
