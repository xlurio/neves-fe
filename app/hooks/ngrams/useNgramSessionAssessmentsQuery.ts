import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NgramSessionAssessmentRepository } from "~/lib/services/ngramSessionAssessments";
import type { UUID } from "~/types";

export function useNgramSessionAssessmentsQuery(
  ngramSessionId: UUID,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["ngram-session-assessments", ngramSessionId, page],
    queryFn: () => NgramSessionAssessmentRepository.list(ngramSessionId, page),
    enabled: !!ngramSessionId,
    placeholderData: keepPreviousData,
  });
}
