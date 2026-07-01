import { useQuery } from "@tanstack/react-query";
import { SentenceSessionAssessmentRepository } from "~/lib/services/sentenceSessionAssessments";
import type { UUID } from "~/types";

export function useSentenceSessionAssessmentResultQuery(id: UUID) {
  return useQuery({
    queryKey: ["sentence-session-assessment-result", id],
    queryFn: () => SentenceSessionAssessmentRepository.getResult(id),
    enabled: !!id,
  });
}
