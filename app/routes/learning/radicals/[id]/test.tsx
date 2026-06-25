import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import FormErrorWrapper from "~/components/FormErrorWrapper";
import useFormErrorWrapper from "~/hooks/useFormErrorWrapper";
import { useRadicalSessionQuery } from "~/hooks/useRadicalSessionQuery";
import { useRadicalSessionTestFinishMutation } from "~/hooks/useRadicalSessionTestFinishMutation";
import { useRadicalSessionTestQuestionQuery } from "~/hooks/useRadicalSessionTestQuery";
import { RadicalSessionTestRepository } from "~/lib/services/radicalSessionTests";
import { BackendError } from "~/lib/errors";
import { isRadicalSessionTestQuestionToAudio, type UUID } from "~/types";

interface RadicalSessionPathParams {
  radicalSessionId: UUID;
}

export default function RadicalSessionTestRoute() {
  const params = useParams() as unknown as RadicalSessionPathParams;
  const [searchParams] = useSearchParams();
  const testId = searchParams.get("testId") as UUID | null;
  const navigate = useNavigate();
  const radicalSessionQuery = useRadicalSessionQuery(params.radicalSessionId);
  const [questionNum, setQuestionNum] = useState(1);
  const radicalSessionTestQuestionQuery = useRadicalSessionTestQuestionQuery({
    id: testId ?? undefined,
    questionNum: questionNum,
  });
  const [isOpen, setOpen] = useState(false);
  const errCtrl = useFormErrorWrapper();
  const finishMutation = useRadicalSessionTestFinishMutation();
  const [isAnswering, setIsAnswering] = useState(false);

  const ANSWERS = ["a", "b", "c", "d", "e"] as const;

  const handleConfirmTest = async () => {
    try {
      errCtrl.resetFormError();
      if (!testId) {
        return;
      }
      await finishMutation.mutateAsync(testId);
      navigate(`/learning/radicals/tests/${testId}/result`);
    } catch (error: unknown) {
      if (error instanceof BackendError) {
        errCtrl.setFormError(error.message, error.details);
      }
    }
  };

  const handleSelectAlternative = async (alternativeIndex: number) => {
    if (!testId) {
      return;
    }

    const answer = ANSWERS[alternativeIndex];
    if (!answer) {
      return;
    }

    try {
      errCtrl.resetFormError();
      setIsAnswering(true);
      await RadicalSessionTestRepository.answer(testId, questionNum, answer);
      await radicalSessionTestQuestionQuery.refetch();
    } catch (error: unknown) {
      if (error instanceof BackendError) {
        errCtrl.setFormError(error.message, error.details);
      }
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <Box>
      {radicalSessionQuery.isFetched ? (
        <>
          <Dialog onClose={() => setOpen(false)} open={isOpen}>
            <DialogTitle>Are you sure you want to finish the test?</DialogTitle>
            <DialogActions>
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleConfirmTest}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Typography variant="h2">
            Radical Session -{" "}
            {Date.parse(radicalSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="h3">Test</Typography>
          <Button type="button" onClick={() => setOpen(true)}>
            Finish
          </Button>
          {radicalSessionTestQuestionQuery.isFetched ? (
            <FormErrorWrapper formErrorState={errCtrl.formErrorState}>
              <>
                <Stack>
                  <Paper>
                    {radicalSessionTestQuestionQuery.data!.payload.question}
                  </Paper>
                  {isRadicalSessionTestQuestionToAudio(
                    radicalSessionTestQuestionQuery.data!,
                  ) ? (
                    <Paper>
                      <audio
                        src={
                          radicalSessionTestQuestionQuery.data!.payload.audio
                        }
                      />
                    </Paper>
                  ) : null}
                  <List>
                    {radicalSessionTestQuestionQuery.data!.payload.alternatives.map(
                      (alternative, index) =>
                        alternative.type === "AUDIO" ? (
                          <ListItem>
                            <audio src={alternative.payload} />
                            <Button
                              type="button"
                              onClick={() => handleSelectAlternative(index)}
                              disabled={isAnswering}
                            >
                              Select
                            </Button>
                          </ListItem>
                        ) : (
                          <ListItem>
                            {alternative.payload}
                            <Button
                              type="button"
                              onClick={() => handleSelectAlternative(index)}
                              disabled={isAnswering}
                            >
                              Select
                            </Button>
                          </ListItem>
                        ),
                    )}
                  </List>
                </Stack>
                <Box>
                  {radicalSessionTestQuestionQuery.data!.previous ? (
                    <Button
                      type="button"
                      onClick={() => setQuestionNum(questionNum - 1)}
                    >
                      Prev
                    </Button>
                  ) : null}
                  {radicalSessionTestQuestionQuery.data!.next ? (
                    <Button
                      type="button"
                      onClick={() => setQuestionNum(questionNum + 1)}
                    >
                      Next
                    </Button>
                  ) : null}
                </Box>
              </>
            </FormErrorWrapper>
          ) : (
            <Skeleton />
          )}
        </>
      ) : (
        <Skeleton />
      )}
    </Box>
  );
}
