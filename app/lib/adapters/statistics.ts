import { api } from "../api";
import type { UserStatistics } from "~/types";

export async function getStatisticsMe(): Promise<UserStatistics> {
  const response = await api.get<UserStatistics>("/api/stats/me");
  return response.data;
}
