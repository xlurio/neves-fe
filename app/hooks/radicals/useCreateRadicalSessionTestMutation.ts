import { useMutation } from "@tanstack/react-query";
import { RadicalSessionTestRepository } from "~/lib/services/radicalSessionTests";
import type { UUID } from "~/types";

export function useCreateRadicalSessionTestMutation(sessionId: UUID) {
  return useMutation({
    mutationFn: async () => {
      return await RadicalSessionTestRepository.create(sessionId);
    },
  });
}
