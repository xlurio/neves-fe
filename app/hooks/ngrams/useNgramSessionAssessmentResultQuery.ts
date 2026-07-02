import { useQuery } from "@tanstack/react-query";
import { NgramSessionAssessmentRepository } from "~/lib/services/ngramSessionAssessments";
import type { UUID } from "~/types";

export function useNgramSessionAssessmentResultQuery(id: UUID) {
  return useQuery({
    queryKey: ["ngram-session-assessment-result", id],
    queryFn: () => NgramSessionAssessmentRepository.getResult(id),
    enabled: !!id,
  });
}
