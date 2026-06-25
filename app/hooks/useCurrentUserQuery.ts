import { useQuery } from "@tanstack/react-query";
import { getStatisticsMe } from "~/lib/adapters/statistics";

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: () => getStatisticsMe(),
    retry: false,
  });
}
