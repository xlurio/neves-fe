import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SentenceSessionRepository } from "~/lib/services/sentenceSessions";

export function useSentenceSessionsQuery(page: number) {
  return useQuery({
    queryKey: ["sentence-sessions", page],
    queryFn: () => SentenceSessionRepository.all({ page }),
    placeholderData: keepPreviousData,
  });
}
