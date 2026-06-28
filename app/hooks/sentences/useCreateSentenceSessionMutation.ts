import { useMutation } from "@tanstack/react-query";
import { SentenceSessionRepository } from "~/lib/services/sentenceSessions";

export function useCreateSentenceSessionMutation() {
  return useMutation({
    mutationFn: async () => {
      return await SentenceSessionRepository.create();
    },
  });
}
