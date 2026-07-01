import { useQuery } from "@tanstack/react-query";
import { RadicalSessionAssessmentRepository } from "~/lib/services/radicalSessionAssessments";
import type { UUID } from "~/types";

export function useRadicalSessionAssessmentResultQuery(id: UUID) {
  return useQuery({
    queryKey: ["radical-session-assessment-result", id],
    queryFn: () => RadicalSessionAssessmentRepository.getResult(id),
    enabled: !!id,
  });
}
