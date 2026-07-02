import type { GetNgramSessionWordLogogramsParams } from "~/types/adapters";
import { getNgramSessionWordLogograms } from "../adapters/ngrams";

export class WordLogogramRepository {
  public static async getBySessionAndPosition({
    id,
    ngramNum,
    wordNum,
    logogramNum,
  }: GetNgramSessionWordLogogramsParams) {
    return getNgramSessionWordLogograms({
      id,
      ngramNum,
      wordNum,
      logogramNum,
    });
  }
}
