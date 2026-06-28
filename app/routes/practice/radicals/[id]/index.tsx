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
import { useRadicalSessionQuery } from "~/hooks/radicals/useRadicalSessionQuery";
import { useRadicalSessionTestsQuery } from "~/hooks/radicals/useRadicalSessionTestsQuery";
import { useCreateRadicalSessionTestMutation } from "~/hooks/radicals/useCreateRadicalSessionTestMutation";
import type { PracticeSessionPathParams } from "~/types/components";

export default function RadicalSessionRoute() {
  const params = useParams() as unknown as PracticeSessionPathParams;
  const navigate = useNavigate();
  const radicalSessionQuery = useRadicalSessionQuery(params.sessionId);
  const testsQuery = useRadicalSessionTestsQuery(params.sessionId);
  const createTestMutation = useCreateRadicalSessionTestMutation(
    params.sessionId,
  );

  const handleCreateTest = async () => {
    const test = await createTestMutation.mutateAsync();
    navigate(`/practice/radicals/tests/${test.id}`);
  };

  return (
    <Box>
      {radicalSessionQuery.isFetched ? (
        <>
          <Typography variant="h2">
            Radical Session -{" "}
            {new Date(radicalSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Stack>
            <Paper>
              <Typography variant="h3">Radicals</Typography>
              {
                <Link
                  href={`/practice/radicals/${radicalSessionQuery.data!.id}/memorization`}
                >
                  Memorize radicals
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
                            href={`/practice/radicals/tests/${test.id}/result`}
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
