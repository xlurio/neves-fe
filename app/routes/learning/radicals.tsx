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
import { useRadicalSessionsQuery } from "~/hooks/useRadicalSessionsQuery";

export function RadicalsRoute() {
  const [page, setPage] = useState(1);
  const { data: radicalSessionsResult, isPending } =
    useRadicalSessionsQuery(page);
  const radicalSessions = radicalSessionsResult?.results ?? [];
  const hasNextPage = Boolean(radicalSessionsResult?.next);

  return (
    <Box>
      <Typography variant="h2">Radicals</Typography>
      {!isPending ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Created At</TableCell>
              <TableCell>No of Radicals</TableCell>
              <TableCell>Highest Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {radicalSessions.map((radicalSession) => (
              <Link href={`/learning/radicals/${radicalSession.id}`}>
                <TableRow>
                  <TableCell>
                    {new Date(radicalSession.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{radicalSession.numOfRadicals}</TableCell>
                  <TableCell>{radicalSession.highestScore} / 100</TableCell>
                </TableRow>
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
