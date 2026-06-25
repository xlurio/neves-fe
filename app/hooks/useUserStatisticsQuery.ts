import { useQuery } from "@tanstack/react-query";
import { UserStatisticsRepository } from "~/lib/services/userStatistics";

export function useUserStatisticsQuery() {
  return useQuery({
    queryKey: ["user-statistics", "me"],
    queryFn: () => UserStatisticsRepository.getForAuthenticatedUser(),
  });
}
