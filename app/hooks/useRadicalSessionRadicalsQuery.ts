import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { GetRadicalSessionRadicalsParams } from "~/lib/adapters";
import { RadicalRepository } from "~/lib/services/radicals";

export function useRadicalSessionRadicalsQuery({
  id,
  page,
}: GetRadicalSessionRadicalsParams) {
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
