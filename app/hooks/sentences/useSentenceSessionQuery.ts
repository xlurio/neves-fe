import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SentenceSessionRepository } from "~/lib/services/sentenceSessions";
import type { UUID } from "~/types";

export function useSentenceSessionQuery(id: UUID) {
  return useQuery({
    queryKey: ["sentence-session", id],
    queryFn: () => SentenceSessionRepository.get(id),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
