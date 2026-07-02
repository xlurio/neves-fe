import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NgramRepository } from "~/lib/services/ngrams";
import type { GetNgramSessionNgramParams } from "~/types/adapters";

export function useNgramSessionNgramsQuery({
  id,
  ngramNum,
}: GetNgramSessionNgramParams) {
  return useQuery({
    queryKey: ["ngram-session-ngrams", id, ngramNum],
    queryFn: () =>
      NgramRepository.getBySessionAndPosition({
        id,
        ngramNum,
      }),
    placeholderData: keepPreviousData,
  });
}
