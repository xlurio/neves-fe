import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SentenceSessionAssessmentRepository } from "~/lib/services/sentenceSessionAssessments";
import type { UUID } from "~/types";

export function useSentenceSessionAssessmentsQuery(
  sentenceSessionId: UUID,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["sentence-session-assessments", sentenceSessionId, page],
    queryFn: () =>
      SentenceSessionAssessmentRepository.list(sentenceSessionId, page),
    enabled: !!sentenceSessionId,
    placeholderData: keepPreviousData,
  });
}
