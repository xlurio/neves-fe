import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router";
import type { Radical } from "~/types";
import { useState } from "react";
import { useSentenceSessionSentencesQuery } from "~/hooks/sentences/useSentenceSessionSentencesQuery";
import Paper from "@mui/material/Paper";
import { useSentenceWordQuery } from "~/hooks/sentences/useSentenceWordQuery";
import Button from "@mui/material/Button";
import { useWordLogogramQuery } from "~/hooks/sentences/useWordLogogramQuery";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import type { PracticeSessionPathParams } from "~/types/components";

interface WordPaperParams {
  sentenceNum: number;
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

function LogogramPaper({ sentenceNum, wordNum }: LogogramPaperParams) {
  const params = useParams() as unknown as PracticeSessionPathParams;

  const [logogramNum, setLogogramNum] = useState(1);
  const wordLogogramQuery = useWordLogogramQuery({
    id: params.sessionId,
    sentenceNum,
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
            <Button
              type="button"
              onClick={() => setLogogramNum(sentenceNum - 1)}
            >
              Prev
            </Button>
          ) : null}
          {wordLogogramQuery.data!.next ? (
            <Button
              type="button"
              onClick={() => setLogogramNum(sentenceNum + 1)}
            >
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

function WordPaper({ sentenceNum }: WordPaperParams) {
  const params = useParams() as unknown as PracticeSessionPathParams;

  const [wordNum, setWordNum] = useState(1);
  const sentenceWordQuery = useSentenceWordQuery({
    id: params.sessionId,
    sentenceNum,
    wordNum,
  });

  return (
    <Paper>
      {sentenceWordQuery.isFetched ? (
        <>
          <Typography variant="h5">Word</Typography>
          {sentenceWordQuery.data!.payload.value}
          <Typography variant="h5">Meaning</Typography>
          {sentenceWordQuery.data!.payload.meaning}
          <Typography variant="h5">Pinyin</Typography>
          {sentenceWordQuery.data!.payload.pinyin}
          <Typography variant="h5">Pronounce</Typography>
          <audio controls src={sentenceWordQuery.data!.payload.pronounce} />
          <LogogramPaper sentenceNum={sentenceNum} wordNum={wordNum} />
          {sentenceWordQuery.data!.previous ? (
            <Button type="button" onClick={() => setWordNum(sentenceNum - 1)}>
              Prev
            </Button>
          ) : null}
          {sentenceWordQuery.data!.next ? (
            <Button type="button" onClick={() => setWordNum(sentenceNum + 1)}>
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

export default function SentencePaper() {
  const params = useParams() as unknown as PracticeSessionPathParams;
  const [sentenceNum, setSentenceNum] = useState(1);
  const sentencesQuery = useSentenceSessionSentencesQuery({
    id: params.sessionId,
    sentenceNum,
  });

  return (
    <Paper>
      {sentencesQuery.isFetched ? (
        <>
          <Typography variant="h4">Sentence</Typography>
          <Typography variant="body1">
            {sentencesQuery.data!.payload.value}
          </Typography>
          <WordPaper sentenceNum={sentenceNum} />
          {sentencesQuery.data!.previous ? (
            <Button
              type="button"
              onClick={() => setSentenceNum(sentenceNum - 1)}
            >
              Prev
            </Button>
          ) : null}
          {sentencesQuery.data!.next ? (
            <Button
              type="button"
              onClick={() => setSentenceNum(sentenceNum + 1)}
            >
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
