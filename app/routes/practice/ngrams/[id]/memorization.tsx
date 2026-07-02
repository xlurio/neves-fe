import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router";
import { useNgramSessionQuery } from "~/hooks/ngrams/useNgramSessionQuery";
import Link from "@mui/material/Link";
import type { PracticeSessionPathParams } from "~/types/components";
import NgramPaper from "~/components/NgramPaper";

export default function NgramSessionMemorizationRoute() {
  const params = useParams() as unknown as PracticeSessionPathParams;
  const ngramSessionQuery = useNgramSessionQuery(params.sessionId);

  return (
    <Box>
      {ngramSessionQuery.isFetched ? (
        <>
          <Link href={`/practice/ngrams/${params.sessionId}`}>Go Back</Link>
          <Typography variant="h2">
            Sequence Session -{" "}
            {ngramSessionQuery.isFetched ??
              new Date(ngramSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="h3">Memorization</Typography>
          <NgramPaper />
        </>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
}
