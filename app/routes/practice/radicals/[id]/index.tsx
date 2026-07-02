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
import { useRadicalSessionQuery } from "~/hooks/radicals/useRadicalSessionQuery";
import { useRadicalSessionAssessmentsQuery } from "~/hooks/radicals/useRadicalSessionAssessmentsQuery";
import { useCreateRadicalSessionAssessmentMutation } from "~/hooks/radicals/useCreateRadicalSessionAssessmentMutation";
import type { PracticeSessionPathParams } from "~/types/components";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import PracticeSubSection from "~/components/PracticeSubSection";

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
      <Link href={`/practice/radicals`}>Go Back</Link>
      {radicalSessionQuery.isFetched ? (
        <Stack spacing="2em">
          <Typography variant="h2">
            Radical Session -{" "}
            {new Date(radicalSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Card sx={{ padding: "2em" }}>
            <Stack spacing="1em">
              <PracticeSubSection>
                <Typography variant="h3">Radicals</Typography>
                <Box>
                  <Button
                    variant="contained"
                    href={`/practice/radicals/${radicalSessionQuery.data!.id}/memorization`}
                  >
                    Memorize radicals
                  </Button>
                </Box>
              </PracticeSubSection>
              <Divider />
              <PracticeSubSection>
                <Typography variant="h3">Assessments</Typography>
                <Box>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={handleCreateAssessment}
                  >
                    New assessment
                  </Button>
                </Box>
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
                            <Button
                              variant="contained"
                              href={`/practice/radicals/assessments/${assessment.id}/result`}
                            >
                              Check result
                            </Button>
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
        </Stack>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
}
