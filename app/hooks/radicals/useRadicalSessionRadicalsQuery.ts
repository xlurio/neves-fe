import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RadicalRepository } from "~/lib/services/radicals";
import type { PaginatedForIdEndpointParams } from "~/types/adapters";

export function useRadicalSessionRadicalsQuery({
  id,
  page,
}: PaginatedForIdEndpointParams) {
  return useQuery({
    queryKey: ["radical-session-radicals", id, page],
    queryFn: () =>
      RadicalRepository.filterBySession({
        id,
        page,
      }),
    placeholderData: keepPreviousData,
  });
}
