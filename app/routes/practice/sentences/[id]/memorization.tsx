import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router";
import { useSentenceSessionQuery } from "~/hooks/sentences/useSentenceSessionQuery";
import Link from "@mui/material/Link";
import type { PracticeSessionPathParams } from "~/types/components";
import SentencePaper from "~/components/SentencePaper";

export default function SentenceSessionMemorizationRoute() {
  const params = useParams() as unknown as PracticeSessionPathParams;
  const sentenceSessionQuery = useSentenceSessionQuery(params.sessionId);

  return (
    <Box>
      {sentenceSessionQuery.isFetched ? (
        <>
          <Link href={`/practice/sentences/${params.sessionId}`}>Go Back</Link>
          <Typography variant="h2">
            Sentence Session -{" "}
            {sentenceSessionQuery.isFetched ??
              new Date(sentenceSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="h3">Memorization</Typography>
          <SentencePaper />
        </>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
}
