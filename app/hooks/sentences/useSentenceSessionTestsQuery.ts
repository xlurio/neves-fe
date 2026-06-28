import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SentenceSessionTestRepository } from "~/lib/services/sentenceSessionTests";
import type { UUID } from "~/types";

export function useSentenceSessionTestsQuery(
  sentenceSessionId: UUID,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["sentence-session-tests", sentenceSessionId, page],
    queryFn: () => SentenceSessionTestRepository.list(sentenceSessionId, page),
    enabled: !!sentenceSessionId,
    placeholderData: keepPreviousData,
  });
}
