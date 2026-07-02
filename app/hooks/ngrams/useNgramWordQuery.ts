import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NgramWordRepository } from "~/lib/services/ngramWords";
import type { GetNgramSessionNgramWordsParams } from "~/types/adapters";

export function useNgramWordQuery({
  id,
  ngramNum,
  wordNum,
}: GetNgramSessionNgramWordsParams) {
  return useQuery({
    queryKey: ["ngram-session-ngrams", id, ngramNum],
    queryFn: async () =>
      await NgramWordRepository.getBySessionAndPosition({
        id,
        ngramNum,
        wordNum,
      }),
    placeholderData: keepPreviousData,
  });
}
