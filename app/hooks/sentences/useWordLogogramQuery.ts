import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { WordLogogramRepository } from "~/lib/services/wordLogograms";
import type { GetSentenceSessionWordLogogramsParams } from "~/types/adapters";

export function useWordLogogramQuery({
  id,
  sentenceNum,
  wordNum,
  logogramNum,
}: GetSentenceSessionWordLogogramsParams) {
  return useQuery({
    queryKey: ["sentence-session-sentences", id, sentenceNum],
    queryFn: async () =>
      await WordLogogramRepository.getBySessionAndPosition({
        id,
        sentenceNum,
        wordNum,
        logogramNum,
      }),
    placeholderData: keepPreviousData,
  });
}
