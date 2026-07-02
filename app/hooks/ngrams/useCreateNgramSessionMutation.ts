import { useMutation } from "@tanstack/react-query";
import { NgramSessionRepository } from "~/lib/services/ngramSessions";

export function useCreateNgramSessionMutation() {
  return useMutation({
    mutationFn: async () => {
      return await NgramSessionRepository.create();
    },
  });
}
