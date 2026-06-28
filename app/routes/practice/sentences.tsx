import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateSentenceSessionMutation } from "~/hooks/sentences/useCreateSentenceSessionMutation";
import { useSentenceSessionsQuery } from "~/hooks/sentences/useSentenceSessionsQuery";

export default function SentencesRoute() {
  const [page, setPage] = useState(1);
  const { data: sentenceSessionsResult, isPending } =
    useSentenceSessionsQuery(page);
  const createSentenceSessionMutation = useCreateSentenceSessionMutation();
  const sentenceSessions = sentenceSessionsResult?.results ?? [];
  const hasNextPage = Boolean(sentenceSessionsResult?.next);
  const navigate = useNavigate();

  const handleCreateSentenceSession = async () => {
    const newSentenceSession =
      await createSentenceSessionMutation.mutateAsync();
    navigate(`/practice/sentences/${newSentenceSession.id}`);
  };

  return (
    <Box>
      <Typography variant="h2">Sentences</Typography>
      <Button type="button" onClick={handleCreateSentenceSession}>
        Create sentence session
      </Button>
      {!isPending ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Created At</TableCell>
              <TableCell>No of Sentences</TableCell>
              <TableCell>Highest Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sentenceSessions.map((sentenceSession) => (
              <Link
                key={sentenceSession.id}
                sx={{ display: "table-row" }}
                href={`/practice/sentences/${sentenceSession.id}`}
              >
                <TableCell>
                  {new Date(sentenceSession.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{sentenceSession.numOfSentenceCls}</TableCell>
                <TableCell>{sentenceSession.highestScore} / 100</TableCell>
              </Link>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Skeleton />
      )}
      {page > 1 ? (
        <Button type="button" onClick={() => setPage(page - 1)}>
          Prev
        </Button>
      ) : null}
      {hasNextPage ? (
        <Button type="button" onClick={() => setPage(page + 1)}>
          Next
        </Button>
      ) : null}
    </Box>
  );
}
