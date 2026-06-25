import { api } from "../api";
import type { UserStatistics } from "~/types";
import { makeDummyUserStats } from "../dummies";

export async function getStatisticsMe(): Promise<UserStatistics> {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyUserStats();
  }

  const response = await api.get<UserStatistics>("/api/stats/me");
  return response.data;
}
