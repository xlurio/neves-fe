import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import type { UUID } from "~/types";
import { useSentenceSessionQuery } from "~/hooks/sentences/useSentenceSessionQuery";
import { useSentenceSessionTestsQuery } from "~/hooks/sentences/useSentenceSessionTestsQuery";
import { useCreateSentenceSessionTestMutation } from "~/hooks/sentences/useCreateSentenceSessionTestMutation";

interface SentenceSessionPathParams {
  sentenceSessionId: UUID;
}

export default function SentenceSessionRoute() {
  const params = useParams() as unknown as SentenceSessionPathParams;
  const navigate = useNavigate();
  const sentenceSessionQuery = useSentenceSessionQuery(
    params.sentenceSessionId,
  );
  const testsQuery = useSentenceSessionTestsQuery(params.sentenceSessionId);
  const createTestMutation = useCreateSentenceSessionTestMutation(
    params.sentenceSessionId,
  );

  const handleCreateTest = async () => {
    const test = await createTestMutation.mutateAsync();
    navigate(`/practice/sentences/tests/${test.id}`);
  };

  return (
    <Box>
      {sentenceSessionQuery.isFetched ? (
        <>
          <Typography variant="h2">
            Sentence Session -{" "}
            {new Date(sentenceSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Stack>
            <Paper>
              <Typography variant="h3">Sentences</Typography>
              {
                <Link
                  href={`/practice/sentences/${sentenceSessionQuery.data!.id}/memorization`}
                >
                  Memorize sentences
                </Link>
              }
            </Paper>
            <Paper>
              <Typography variant="h3">Test</Typography>
              {
                <Button type="button" onClick={handleCreateTest}>
                  New test
                </Button>
              }
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Finished At</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testsQuery.isFetched ? (
                    testsQuery.data?.results.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell>
                          {new Date(test.finishedAt).toLocaleString()}
                        </TableCell>
                        <TableCell>{test.score}/100</TableCell>
                        <TableCell>
                          <Link
                            href={`/practice/sentences/tests/${test.id}/result`}
                          >
                            Check result
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Stack>
        </>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
}
