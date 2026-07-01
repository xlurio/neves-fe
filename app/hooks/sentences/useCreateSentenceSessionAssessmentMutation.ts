import { useMutation } from "@tanstack/react-query";
import { SentenceSessionAssessmentRepository } from "~/lib/services/sentenceSessionAssessments";
import type { UUID } from "~/types";

export function useCreateSentenceSessionAssessmentMutation(sessionId: UUID) {
  return useMutation({
    mutationFn: async () => {
      return await SentenceSessionAssessmentRepository.create(sessionId);
    },
  });
}
