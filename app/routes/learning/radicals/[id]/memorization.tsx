import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router";
import { useRadicalSessionQuery } from "~/hooks/useRadicalSessionQuery";
import { useRadicalSessionRadicalsQuery } from "~/hooks/useRadicalSessionRadicalsQuery";
import type { UUID } from "~/types";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface RadicalSessionPathParams {
  radicalSessionId: UUID;
}

export default function RadicalSessionMemorizationRoute() {
  const params = useParams() as unknown as RadicalSessionPathParams;
  const radicalSessionQuery = useRadicalSessionQuery(params.radicalSessionId);
  const [page, setPage] = useState(1);
  const radicalSessionRadicalsQuery = useRadicalSessionRadicalsQuery({
    id: params.radicalSessionId,
    page,
  });

  return (
    <Box>
      {radicalSessionQuery.isFetched ? (
        <>
          <Typography variant="h2">
            Radical Session -{" "}
            {radicalSessionRadicalsQuery.isFetched ??
              new Date(radicalSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="h3">Memorization</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Simplified Chinese</TableCell>
                <TableCell>Pinyin</TableCell>
                <TableCell>Meaning</TableCell>
                <TableCell>Pronounciation</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {radicalSessionRadicalsQuery.isFetched ? (
                <>
                  {radicalSessionRadicalsQuery.data!.results.map((radical) => (
                    <TableRow key={radical.id}>
                      <TableCell>
                        {radical.id}
                      </TableCell>
                      <TableCell>{radical.pinyin}</TableCell>
                      <TableCell>{radical.meaning}</TableCell>
                      <TableCell>
                        <audio controls controlsList="play" src={radical.pronounce} />
                      </TableCell>
                      <TableCell>
                        <Button type="button" color="error">
                          <CloseIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Button>Add radical</Button>
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <Skeleton />
              )}
            </TableBody>
          </Table>
          <Box>
            {radicalSessionRadicalsQuery.isFetched &&
            radicalSessionRadicalsQuery.data!.previous ? (
              <Button type="button" onClick={() => setPage(page - 1)}>
                Prev
              </Button>
            ) : null}
            {radicalSessionRadicalsQuery.isFetched &&
            radicalSessionRadicalsQuery.data!.next ? (
              <Button type="button" onClick={() => setPage(page + 1)}>
                Next
              </Button>
            ) : null}
          </Box>
        </>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
}
