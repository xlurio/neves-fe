import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { WordLogogramRepository } from "~/lib/services/wordLogograms";
import type { GetNgramSessionWordLogogramsParams } from "~/types/adapters";

export function useWordLogogramQuery({
  id,
  ngramNum,
  wordNum,
  logogramNum,
}: GetNgramSessionWordLogogramsParams) {
  return useQuery({
    queryKey: ["ngram-session-ngrams", id, ngramNum],
    queryFn: async () =>
      await WordLogogramRepository.getBySessionAndPosition({
        id,
        ngramNum,
        wordNum,
        logogramNum,
      }),
    placeholderData: keepPreviousData,
  });
}
