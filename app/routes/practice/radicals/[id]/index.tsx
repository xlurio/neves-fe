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
import { useRadicalSessionAssessmentsQuery } from "~/hooks/radicals/useRadicalSessionAssessmentsQuery";
import { useCreateRadicalSessionAssessmentMutation } from "~/hooks/radicals/useCreateRadicalSessionAssessmentMutation";
import type { PracticeSessionPathParams } from "~/types/components";

export default function RadicalSessionRoute() {
  const params = useParams() as unknown as PracticeSessionPathParams;
  const navigate = useNavigate();
  const radicalSessionQuery = useRadicalSessionQuery(params.sessionId);
  const assessmentsQuery = useRadicalSessionAssessmentsQuery(params.sessionId);

  const createAssessmentMutation = useCreateRadicalSessionAssessmentMutation(
    params.sessionId,
  );

  const handleCreateAssessment = async () => {
    const assessment = await createAssessmentMutation.mutateAsync();
    navigate(`/practice/radicals/assessments/${assessment.id}`);
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
                            href={`/practice/radicals/assessments/${assessment.id}/result`}
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
