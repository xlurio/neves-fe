import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RadicalSessionAssessmentRepository } from "~/lib/services/radicalSessionAssessments";
import type { UUID } from "~/types";

export function useRadicalSessionAssessmentsQuery(
  radicalSessionId: UUID,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["radical-session-assessments", radicalSessionId, page],
    queryFn: () =>
      RadicalSessionAssessmentRepository.list(radicalSessionId, page),
    enabled: !!radicalSessionId,
    placeholderData: keepPreviousData,
  });
}
