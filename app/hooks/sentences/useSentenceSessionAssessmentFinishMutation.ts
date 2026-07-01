import { useMutation } from "@tanstack/react-query";
import { SentenceSessionAssessmentRepository } from "~/lib/services/sentenceSessionAssessments";
import type { UUID } from "~/types";

export function useSentenceSessionAssessmentFinishMutation() {
  return useMutation({
    mutationFn: async (id: UUID) => {
      await SentenceSessionAssessmentRepository.finish(id);
    },
  });
}
