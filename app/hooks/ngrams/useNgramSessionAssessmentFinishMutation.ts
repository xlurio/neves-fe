import { useMutation } from "@tanstack/react-query";
import { NgramSessionAssessmentRepository } from "~/lib/services/ngramSessionAssessments";
import type { UUID } from "~/types";

export function useNgramSessionAssessmentFinishMutation() {
  return useMutation({
    mutationFn: async (id: UUID) => {
      await NgramSessionAssessmentRepository.finish(id);
    },
  });
}
