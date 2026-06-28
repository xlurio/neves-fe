import { useMutation } from "@tanstack/react-query";
import { SentenceSessionTestRepository } from "~/lib/services/sentenceSessionTests";
import type { UUID } from "~/types";

export function useCreateSentenceSessionTestMutation(sessionId: UUID) {
  return useMutation({
    mutationFn: async () => {
      return await SentenceSessionTestRepository.create(sessionId);
    },
  });
}
