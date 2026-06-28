import { useMutation } from "@tanstack/react-query";
import { SentenceSessionTestRepository } from "~/lib/services/sentenceSessionTests";
import type { UUID } from "~/types";

export function useSentenceSessionTestFinishMutation() {
  return useMutation({
    mutationFn: async (id: UUID) => {
      await SentenceSessionTestRepository.finish(id);
    },
  });
}
