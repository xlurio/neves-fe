import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SentenceWordRepository } from "~/lib/services/sentenceWords";
import type { GetSentenceSessionSentenceWordsParams } from "~/types/adapters";

export function useSentenceWordQuery({
  id,
  sentenceNum,
  wordNum,
}: GetSentenceSessionSentenceWordsParams) {
  return useQuery({
    queryKey: ["sentence-session-sentences", id, sentenceNum],
    queryFn: async () =>
      await SentenceWordRepository.getBySessionAndPosition({
        id,
        sentenceNum,
        wordNum,
      }),
    placeholderData: keepPreviousData,
  });
}
