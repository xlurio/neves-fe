import type { UserStatistics } from "~/types";
import { getStatisticsMe } from "../adapters/statistics";

export class UserStatisticsRepository {
  public static async getForAuthenticatedUser(): Promise<UserStatistics> {
    return await getStatisticsMe();
  }
}
