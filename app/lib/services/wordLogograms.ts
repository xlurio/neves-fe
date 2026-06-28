import type { GetSentenceSessionWordLogogramsParams } from "~/types/adapters";
import { getSentenceSessionWordLogograms } from "../adapters/sentences";

export class WordLogogramRepository {
  public static async getBySessionAndPosition({
    id,
    sentenceNum,
    wordNum,
    logogramNum,
  }: GetSentenceSessionWordLogogramsParams) {
    return getSentenceSessionWordLogograms({
      id,
      sentenceNum,
      wordNum,
      logogramNum,
    });
  }
}
