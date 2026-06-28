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
import { useNavigate, useParams } from "react-router";
import FormErrorWrapper from "~/components/FormErrorWrapper";
import useFormErrorWrapper from "~/hooks/useFormErrorWrapper";
import { useRadicalSessionQuery } from "~/hooks/radicals/useRadicalSessionQuery";
import { useRadicalSessionTestFinishMutation } from "~/hooks/radicals/useRadicalSessionTestFinishMutation";
import { useRadicalSessionTestQuestionQuery } from "~/hooks/radicals/useRadicalSessionTestQuestionQuery";
import { RadicalSessionTestRepository } from "~/lib/services/radicalSessionTests";
import { BackendError } from "~/lib/errors";
import { type UUID } from "~/types";
import { isPracticeSessionTestQuestionToAudio } from "~/types/adapters";

interface RadicalSessionPathParams {
  testId: UUID;
}

export default function RadicalSessionTestRoute() {
  const params = useParams() as unknown as RadicalSessionPathParams;
  const navigate = useNavigate();
  const [questionNum, setQuestionNum] = useState(1);
  const radicalSessionTestQuestionQuery = useRadicalSessionTestQuestionQuery({
    id: params.testId ?? undefined,
    questionNum: questionNum,
  });
  const radicalSessionQuery = useRadicalSessionQuery(
    radicalSessionTestQuestionQuery.data?.sessionId || "",
  );
  const [isOpen, setOpen] = useState(false);
  const errCtrl = useFormErrorWrapper();
  const finishMutation = useRadicalSessionTestFinishMutation();
  const [isAnswering, setIsAnswering] = useState(false);

  const ANSWERS = ["a", "b", "c", "d", "e"] as const;

  const handleConfirmTest = async () => {
    try {
      errCtrl.resetFormError();
      await finishMutation.mutateAsync(params.testId);
      navigate(`/practice/radicals/tests/${params.testId}/result`);
    } catch (error: unknown) {
      if (error instanceof BackendError) {
        errCtrl.setFormError(error.message, error.details);
      }
    }
  };

  const handleSelectAlternative = async (alternativeIndex: number) => {
    const answer = ANSWERS[alternativeIndex];
    if (!answer) {
      return;
    }

    try {
      errCtrl.resetFormError();
      setIsAnswering(true);
      await RadicalSessionTestRepository.answer(
        params.testId,
        questionNum,
        answer,
      );

      if (radicalSessionTestQuestionQuery.data?.next)
        setQuestionNum(questionNum + 1);
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
            {new Date(radicalSessionQuery.data!.createdAt).toLocaleString()}
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
                  {isPracticeSessionTestQuestionToAudio(
                    radicalSessionTestQuestionQuery.data!.payload,
                  ) ? (
                    <Paper>
                      <audio
                        controls
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
                          <ListItem key={index}>
                            <audio controls src={alternative.payload} />
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
                  {radicalSessionTestQuestionQuery.data?.previous ? (
                    <Button
                      type="button"
                      onClick={() => setQuestionNum(questionNum - 1)}
                    >
                      Prev
                    </Button>
                  ) : null}
                  {radicalSessionTestQuestionQuery.data?.next ? (
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
