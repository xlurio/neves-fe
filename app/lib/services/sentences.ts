import type { GetSentenceSessionSentenceParams } from "~/types/adapters";
import { getSentenceSessionSentence } from "../adapters/sentences";

export class SentenceRepository {
  public static async getBySessionAndPosition({
    id,
    sentenceNum,
  }: GetSentenceSessionSentenceParams) {
    return getSentenceSessionSentence({
      id,
      sentenceNum,
    });
  }
}
