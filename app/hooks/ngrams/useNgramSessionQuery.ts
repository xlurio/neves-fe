import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NgramSessionRepository } from "~/lib/services/ngramSessions";
import type { UUID } from "~/types";

export function useNgramSessionQuery(id: UUID) {
  return useQuery({
    queryKey: ["ngram-session", id],
    queryFn: () => NgramSessionRepository.get(id),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
