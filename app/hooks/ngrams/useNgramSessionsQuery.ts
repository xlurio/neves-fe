import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NgramSessionRepository } from "~/lib/services/ngramSessions";

export function useNgramSessionsQuery(page: number) {
  return useQuery({
    queryKey: ["ngram-sessions", page],
    queryFn: () => NgramSessionRepository.all({ page }),
    placeholderData: keepPreviousData,
  });
}
