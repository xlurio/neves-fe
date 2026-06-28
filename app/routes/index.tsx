import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useUserStatisticsQuery } from "~/hooks/useUserStatisticsQuery";
import type { UserStatistics } from "~/types";

interface PhrasesPaperParams {
  userStats: UserStatistics;
}

function PhrasesPaper({ userStats }: PhrasesPaperParams) {
  return (
    <Paper>
      <Typography variant="h3">Phrases</Typography>
      <LinearProgress
        variant="determinate"
        value={userStats.sentences.progress || 0}
        aria-label="Radicals learned"
      />
    </Paper>
  );
}

export default function IndexRoute() {
  const { data: userStats, isPending } = useUserStatisticsQuery();

  return (
    <Box>
      <Typography variant="h2">Home</Typography>
      <Link href="/learning/frequency">How often should I study?</Link>
      {!isPending ? (
        <Stack>
          <Link href="/practice/radicals">
            <Paper>
              <Typography variant="h3">Radicals</Typography>
              <LinearProgress
                variant="determinate"
                value={userStats!.radicals.progress || 0}
                aria-label="Radicals learned"
              />
            </Paper>
          </Link>
          {userStats!.sentences.isUnlocked ? (
            <Link href="/practice/sentences">
              <PhrasesPaper userStats={userStats!} />
            </Link>
          ) : (
            <Tooltip title="Learn more radicals to unlock">
              <PhrasesPaper userStats={userStats!} />
            </Tooltip>
          )}
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
