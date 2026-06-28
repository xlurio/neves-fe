import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SentenceRepository } from "~/lib/services/sentences";
import type { GetSentenceSessionSentenceParams } from "~/types/adapters";

export function useSentenceSessionSentencesQuery({
  id,
  sentenceNum,
}: GetSentenceSessionSentenceParams) {
  return useQuery({
    queryKey: ["sentence-session-sentences", id, sentenceNum],
    queryFn: () =>
      SentenceRepository.getBySessionAndPosition({
        id,
        sentenceNum,
      }),
    placeholderData: keepPreviousData,
  });
}
