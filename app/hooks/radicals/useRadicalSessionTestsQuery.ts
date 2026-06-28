import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RadicalSessionTestRepository } from "~/lib/services/radicalSessionTests";
import type { UUID } from "~/types";

export function useRadicalSessionTestsQuery(
  radicalSessionId: UUID,
  page: number = 1,
) {
  return useQuery({
    queryKey: ["radical-session-tests", radicalSessionId, page],
    queryFn: () => RadicalSessionTestRepository.list(radicalSessionId, page),
    enabled: !!radicalSessionId,
    placeholderData: keepPreviousData,
  });
}
