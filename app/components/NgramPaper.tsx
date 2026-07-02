import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router";
import type { Radical } from "~/types";
import { useState } from "react";
import { useNgramSessionNgramsQuery } from "~/hooks/ngrams/useNgramSessionNgramsQuery";
import Paper from "@mui/material/Paper";
import { useNgramWordQuery } from "~/hooks/ngrams/useNgramWordQuery";
import Button from "@mui/material/Button";
import { useWordLogogramQuery } from "~/hooks/ngrams/useWordLogogramQuery";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import type { PracticeSessionPathParams } from "~/types/components";

interface WordPaperParams {
  ngramNum: number;
}

interface LogogramPaperParams extends WordPaperParams {
  wordNum: number;
}

interface RadicalBoxParams {
  radicals: Radical[];
}

function RadicalBox({ radicals }: RadicalBoxParams) {
  return (
    <Box>
      <Typography variant="h5">Radicals</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Simplified Chinese</TableCell>
            <TableCell>Pinyin</TableCell>
            <TableCell>Meaning</TableCell>
            <TableCell>Pronounciation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {radicals.map((radical) => (
            <TableRow key={radical.id}>
              <TableCell>{radical.id}</TableCell>
              <TableCell>{radical.pinyin}</TableCell>
              <TableCell>{radical.meaning}</TableCell>
              <TableCell>
                <audio controls controlsList="play" src={radical.pronounce} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

function LogogramPaper({ ngramNum, wordNum }: LogogramPaperParams) {
  const params = useParams() as unknown as PracticeSessionPathParams;

  const [logogramNum, setLogogramNum] = useState(1);
  const wordLogogramQuery = useWordLogogramQuery({
    id: params.sessionId,
    ngramNum,
    wordNum,
    logogramNum,
  });

  return (
    <Paper>
      {wordLogogramQuery.isFetched ? (
        <>
          <Typography variant="h5">Character</Typography>
          {wordLogogramQuery.data!.payload.id}
          <Typography variant="h5">Meaning</Typography>
          {wordLogogramQuery.data!.payload.meaning}
          <Typography variant="h5">Pinyin</Typography>
          {wordLogogramQuery.data!.payload.pinyin}
          <Typography variant="h5">Pronounce</Typography>
          <audio controls src={wordLogogramQuery.data!.payload.pronounce} />
          <RadicalBox radicals={wordLogogramQuery.data!.payload.radicals} />
          {wordLogogramQuery.data!.previous ? (
            <Button type="button" onClick={() => setLogogramNum(ngramNum - 1)}>
              Prev
            </Button>
          ) : null}
          {wordLogogramQuery.data!.next ? (
            <Button type="button" onClick={() => setLogogramNum(ngramNum + 1)}>
              Next
            </Button>
          ) : null}
        </>
      ) : (
        <Skeleton />
      )}
    </Paper>
  );
}

function WordPaper({ ngramNum }: WordPaperParams) {
  const params = useParams() as unknown as PracticeSessionPathParams;

  const [wordNum, setWordNum] = useState(1);
  const ngramWordQuery = useNgramWordQuery({
    id: params.sessionId,
    ngramNum,
    wordNum,
  });

  return (
    <Paper>
      {ngramWordQuery.isFetched ? (
        <>
          <Typography variant="h5">Word</Typography>
          {ngramWordQuery.data!.payload.value}
          <Typography variant="h5">Meaning</Typography>
          {ngramWordQuery.data!.payload.meaning}
          <Typography variant="h5">Pinyin</Typography>
          {ngramWordQuery.data!.payload.pinyin}
          <Typography variant="h5">Pronounce</Typography>
          <audio controls src={ngramWordQuery.data!.payload.pronounce} />
          <LogogramPaper ngramNum={ngramNum} wordNum={wordNum} />
          {ngramWordQuery.data!.previous ? (
            <Button type="button" onClick={() => setWordNum(ngramNum - 1)}>
              Prev
            </Button>
          ) : null}
          {ngramWordQuery.data!.next ? (
            <Button type="button" onClick={() => setWordNum(ngramNum + 1)}>
              Next
            </Button>
          ) : null}
        </>
      ) : (
        <Skeleton />
      )}
    </Paper>
  );
}

export default function NgramPaper() {
  const params = useParams() as unknown as PracticeSessionPathParams;
  const [ngramNum, setNgramNum] = useState(1);
  const ngramsQuery = useNgramSessionNgramsQuery({
    id: params.sessionId,
    ngramNum,
  });

  return (
    <Paper>
      {ngramsQuery.isFetched ? (
        <>
          <Typography variant="h4">Ngram</Typography>
          <Typography variant="body1">
            {ngramsQuery.data!.payload.value}
          </Typography>
          <Typography variant="h4">Meaning</Typography>
          <Typography variant="body1">
            {ngramsQuery.data!.payload.meaning}
          </Typography>
          <Typography variant="h4">Pronounce</Typography>
          <Typography variant="body1">
            <audio controls src={ngramsQuery.data!.payload.pronounce} />
          </Typography>
          <WordPaper ngramNum={ngramNum} />
          {ngramsQuery.data!.previous ? (
            <Button type="button" onClick={() => setNgramNum(ngramNum - 1)}>
              Prev
            </Button>
          ) : null}
          {ngramsQuery.data!.next ? (
            <Button type="button" onClick={() => setNgramNum(ngramNum + 1)}>
              Next
            </Button>
          ) : null}
        </>
      ) : (
        <Skeleton />
      )}
    </Paper>
  );
}
