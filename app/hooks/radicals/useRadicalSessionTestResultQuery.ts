import { useQuery } from "@tanstack/react-query";
import { RadicalSessionTestRepository } from "~/lib/services/radicalSessionTests";
import type { UUID } from "~/types";

export function useRadicalSessionTestResultQuery(id: UUID) {
  return useQuery({
    queryKey: ["radical-session-test-result", id],
    queryFn: () => RadicalSessionTestRepository.getResult(id),
    enabled: !!id,
  });
}
