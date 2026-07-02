import type { GetNgramSessionNgramParams } from "~/types/adapters";
import { getNgramSessionNgram } from "../adapters/ngrams";

export class NgramRepository {
  public static async getBySessionAndPosition({
    id,
    ngramNum,
  }: GetNgramSessionNgramParams) {
    return getNgramSessionNgram({
      id,
      ngramNum,
    });
  }
}
