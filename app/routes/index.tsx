import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useUserStatisticsQuery } from "~/hooks/useUserStatisticsQuery";
import type { UserStatistics } from "~/types";

interface NgramsPaperParams {
  userStats: UserStatistics;
}

const IndexPaper = styled(Paper)(() => ({
  padding: "1em",
}));

function NgramsPaper({ userStats }: NgramsPaperParams) {
  return (
    <IndexPaper>
      <Typography variant="h3">Sequences</Typography>
      <LinearProgress
        variant="determinate"
        value={userStats.ngrams.progress || 0}
        aria-label="Radicals learned"
      />
    </IndexPaper>
  );
}

export default function IndexRoute() {
  const { data: userStats, isPending } = useUserStatisticsQuery();

  return (
    <Box>
      {!isPending ? (
        <>
          <Typography variant="h2">{userStats!.username}</Typography>
          <Stack spacing="1em">
            <Link href="/learning/frequency">How often should I study?</Link>
            <Link href="/practice/radicals">
              <IndexPaper>
                <Typography variant="h3">Radicals</Typography>
                <LinearProgress
                  variant="determinate"
                  value={userStats!.radicals.progress || 0}
                  aria-label="Radicals learned"
                />
              </IndexPaper>
            </Link>
            {userStats!.ngrams.isUnlocked ? (
              <Link href="/practice/ngrams">
                <NgramsPaper userStats={userStats!} />
              </Link>
            ) : (
              <Tooltip title="Learn more radicals to unlock">
                <NgramsPaper userStats={userStats!} />
              </Tooltip>
            )}
            <IndexPaper>
              <Typography variant="h3">In Construction</Typography>
            </IndexPaper>
          </Stack>
        </>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
}
