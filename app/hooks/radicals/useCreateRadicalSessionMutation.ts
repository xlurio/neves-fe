import { useMutation } from "@tanstack/react-query";
import { RadicalSessionRepository } from "~/lib/services/radicalSessions";

export function useCreateRadicalSessionMutation() {
  return useMutation({
    mutationFn: async () => {
      return await RadicalSessionRepository.create();
    },
  });
}
