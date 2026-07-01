import { useMutation } from "@tanstack/react-query";
import { RadicalSessionAssessmentRepository } from "~/lib/services/radicalSessionAssessments";
import type { UUID } from "~/types";

export function useRadicalSessionAssessmentFinishMutation() {
  return useMutation({
    mutationFn: async (id: UUID) => {
      await RadicalSessionAssessmentRepository.finish(id);
    },
  });
}
