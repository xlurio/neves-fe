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
import { useCreateNgramSessionMutation } from "~/hooks/ngrams/useCreateNgramSessionMutation";
import { useNgramSessionsQuery } from "~/hooks/ngrams/useNgramSessionsQuery";

export default function NgramsRoute() {
  const [page, setPage] = useState(1);
  const { data: ngramSessionsResult, isPending } = useNgramSessionsQuery(page);
  const createNgramSessionMutation = useCreateNgramSessionMutation();
  const ngramSessions = ngramSessionsResult?.results ?? [];
  const hasNextPage = Boolean(ngramSessionsResult?.next);
  const navigate = useNavigate();

  const handleCreateNgramSession = async () => {
    const newNgramSession = await createNgramSessionMutation.mutateAsync();
    navigate(`/practice/ngrams/${newNgramSession.id}`);
  };

  return (
    <Box>
      <Typography variant="h2">Sequences</Typography>
      <Button type="button" onClick={handleCreateNgramSession}>
        Create sequence session
      </Button>
      {!isPending ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Created At</TableCell>
              <TableCell>No of Sequences</TableCell>
              <TableCell>Highest Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ngramSessions.map((ngramSession) => (
              <Link
                key={ngramSession.id}
                sx={{ display: "table-row" }}
                href={`/practice/ngrams/${ngramSession.id}`}
              >
                <TableCell>
                  {new Date(ngramSession.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{ngramSession.numOfNgramCls}</TableCell>
                <TableCell>{ngramSession.highestScore} / 100</TableCell>
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
