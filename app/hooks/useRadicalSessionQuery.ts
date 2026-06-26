import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RadicalSessionRepository } from "~/lib/services/radicalsSessions";
import type { UUID } from "~/types";

export function useRadicalSessionQuery(id: UUID) {
  return useQuery({
    queryKey: ["radical-session", id],
    queryFn: () => RadicalSessionRepository.get(id),
    placeholderData: keepPreviousData,
    enabled: !!id,
  });
}
