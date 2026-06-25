import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RadicalSessionRepository } from "~/lib/services/radicalsSessions";

export function useRadicalSessionsQuery(page: number) {
  return useQuery({
    queryKey: ["radical-sessions", page],
    queryFn: () => RadicalSessionRepository.all({ page }),
    placeholderData: keepPreviousData,
  });
}
