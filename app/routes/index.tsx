import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useUserStatisticsQuery } from "~/hooks/useUserStatisticsQuery";

export default function IndexRoute() {
  const { data: userStats, isPending } = useUserStatisticsQuery();

  return (
    <Box>
      <Typography variant="h2">Home</Typography>
      {!isPending ? (
        <Stack>
          <Link href="/learning/radicals">
            <Paper>
              <Typography variant="h3">
                Logographical System: Radicals
              </Typography>
              <Typography variant="body1">
                {userStats?.chineseLogographicSystem.radicalsLearned || 0}/
                {userStats?.chineseLogographicSystem.totalRadicals || 214}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={userStats?.chineseLogographicSystem.progress || 0}
                aria-label="Radicals learned"
              />
            </Paper>
          </Link>
          <Paper>
            <Typography variant="h2">In Construction</Typography>
          </Paper>
        </Stack>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
}
