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
import { useSentenceSessionAssessmentsQuery } from "~/hooks/sentences/useSentenceSessionAssessmentsQuery";
import { useCreateSentenceSessionAssessmentMutation } from "~/hooks/sentences/useCreateSentenceSessionAssessmentMutation";

interface SentenceSessionPathParams {
  sentenceSessionId: UUID;
}

export default function SentenceSessionRoute() {
  const params = useParams() as unknown as SentenceSessionPathParams;
  const navigate = useNavigate();
  const sentenceSessionQuery = useSentenceSessionQuery(
    params.sentenceSessionId,
  );
  const assessmentsQuery = useSentenceSessionAssessmentsQuery(
    params.sentenceSessionId,
  );
  const createAssessmentMutation = useCreateSentenceSessionAssessmentMutation(
    params.sentenceSessionId,
  );

  const handleCreateAssessment = async () => {
    const assessment = await createAssessmentMutation.mutateAsync();
    navigate(`/practice/sentences/assessments/${assessment.id}`);
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
              <Typography variant="h3">Assessment</Typography>
              {
                <Button type="button" onClick={handleCreateAssessment}>
                  New assessment
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
                  {assessmentsQuery.isFetched ? (
                    assessmentsQuery.data?.results.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>
                          {new Date(assessment.finishedAt).toLocaleString()}
                        </TableCell>
                        <TableCell>{assessment.score}/100</TableCell>
                        <TableCell>
                          <Link
                            href={`/practice/sentences/assessments/${assessment.id}/result`}
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
