import { useMutation } from "@tanstack/react-query";
import { RadicalRepository } from "~/lib/services/radicals";
import type { UUID } from "~/types";

export function useRadicalSessionRadicalsMutation(id: UUID) {
  return useMutation({
    mutationFn: async () => {
      return await RadicalRepository.createForSession(id);
    },
  });
}
