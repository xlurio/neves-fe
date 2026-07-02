import type { GetNgramSessionNgramWordsParams } from "~/types/adapters";
import { getNgramSessionNgramWords } from "../adapters/ngrams";

export class NgramWordRepository {
  public static async getBySessionAndPosition({
    id,
    ngramNum,
    wordNum,
  }: GetNgramSessionNgramWordsParams) {
    return getNgramSessionNgramWords({
      id,
      ngramNum,
      wordNum,
    });
  }
}
