import { useMutation } from "@tanstack/react-query";
import { RadicalSessionTestRepository } from "~/lib/services/radicalSessionTests";
import type { UUID } from "~/types";

export function useRadicalSessionTestFinishMutation() {
  return useMutation({
    mutationFn: async (id: UUID) => {
      await RadicalSessionTestRepository.finish(id);
    },
  });
}
