import { useQuery } from "@tanstack/react-query";
import { SentenceSessionTestRepository } from "~/lib/services/sentenceSessionTests";
import type { UUID } from "~/types";

export function useSentenceSessionTestResultQuery(id: UUID) {
  return useQuery({
    queryKey: ["sentence-session-test-result", id],
    queryFn: () => SentenceSessionTestRepository.getResult(id),
    enabled: !!id,
  });
}
