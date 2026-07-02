import { useMutation } from "@tanstack/react-query";
import { NgramSessionAssessmentRepository } from "~/lib/services/ngramSessionAssessments";
import type { UUID } from "~/types";

export function useCreateNgramSessionAssessmentMutation(sessionId: UUID) {
  return useMutation({
    mutationFn: async () => {
      return await NgramSessionAssessmentRepository.create(sessionId);
    },
  });
}
