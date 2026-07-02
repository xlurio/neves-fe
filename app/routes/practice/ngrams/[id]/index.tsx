import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
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
import { useNgramSessionQuery } from "~/hooks/ngrams/useNgramSessionQuery";
import { useNgramSessionAssessmentsQuery } from "~/hooks/ngrams/useNgramSessionAssessmentsQuery";
import { useCreateNgramSessionAssessmentMutation } from "~/hooks/ngrams/useCreateNgramSessionAssessmentMutation";
import type { PracticeSessionPathParams } from "~/types/components";
import PracticeSubSection from "~/components/PracticeSubSection";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

export default function NgramSessionRoute() {
  const params = useParams() as unknown as PracticeSessionPathParams;
  const navigate = useNavigate();
  const ngramSessionQuery = useNgramSessionQuery(params.sessionId);
  const assessmentsQuery = useNgramSessionAssessmentsQuery(params.sessionId);
  const createAssessmentMutation = useCreateNgramSessionAssessmentMutation(
    params.sessionId,
  );

  const handleCreateAssessment = async () => {
    const assessment = await createAssessmentMutation.mutateAsync();
    navigate(`/practice/ngrams/assessments/${assessment.id}`);
  };

  return (
    <Box>
      {ngramSessionQuery.isFetched ? (
        <>
          <Typography variant="h2">
            Sequence Session -{" "}
            {new Date(ngramSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Card sx={{ padding: "2em" }}>
            <Stack spacing="1em">
              <PracticeSubSection>
                <Typography variant="h3">Ngrams</Typography>
                {
                  <Link
                    href={`/practice/ngrams/${ngramSessionQuery.data!.id}/memorization`}
                  >
                    Memorize sequences
                  </Link>
                }
              </PracticeSubSection>
              <Divider />
              <PracticeSubSection>
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
                              href={`/practice/ngrams/assessments/${assessment.id}/result`}
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
              </PracticeSubSection>
            </Stack>
          </Card>
        </>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
}
