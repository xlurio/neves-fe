import { useMutation } from "@tanstack/react-query";
import { RadicalSessionAssessmentRepository } from "~/lib/services/radicalSessionAssessments";
import type { UUID } from "~/types";

export function useCreateRadicalSessionAssessmentMutation(sessionId: UUID) {
  return useMutation({
    mutationFn: async () => {
      return await RadicalSessionAssessmentRepository.create(sessionId);
    },
  });
}
