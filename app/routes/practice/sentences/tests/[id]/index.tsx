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
import { useSentenceSessionQuery } from "~/hooks/sentences/useSentenceSessionQuery";
import { SentenceSessionTestRepository } from "~/lib/services/sentenceSessionTests";
import { BackendError } from "~/lib/errors";
import { type UUID } from "~/types";
import { isPracticeSessionTestQuestionToAudio } from "~/types/adapters";
import { useSentenceSessionTestFinishMutation } from "~/hooks/sentences/useSentenceSessionTestFinishMutation";
import { useSentenceSessionTestQuestionQuery } from "~/hooks/sentences/useSentenceSessionTestQuestionQuery";

interface SentenceSessionPathParams {
  testId: UUID;
}

export default function SentenceSessionTestRoute() {
  const params = useParams() as unknown as SentenceSessionPathParams;
  const navigate = useNavigate();
  const [questionNum, setQuestionNum] = useState(1);
  const sentenceSessionTestQuestionQuery = useSentenceSessionTestQuestionQuery({
    id: params.testId ?? undefined,
    questionNum: questionNum,
  });
  const sentenceSessionQuery = useSentenceSessionQuery(
    sentenceSessionTestQuestionQuery.data?.sessionId || "",
  );
  const [isOpen, setOpen] = useState(false);
  const errCtrl = useFormErrorWrapper();
  const finishMutation = useSentenceSessionTestFinishMutation();
  const [isAnswering, setIsAnswering] = useState(false);

  const ANSWERS = ["a", "b", "c", "d", "e"] as const;

  const handleConfirmTest = async () => {
    try {
      errCtrl.resetFormError();
      await finishMutation.mutateAsync(params.testId);
      navigate(`/practice/sentences/tests/${params.testId}/result`);
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
      await SentenceSessionTestRepository.answer(
        params.testId,
        questionNum,
        answer,
      );

      if (sentenceSessionTestQuestionQuery.data?.next)
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
      {sentenceSessionQuery.isFetched ? (
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
            Sentence Session -{" "}
            {new Date(sentenceSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="h3">Test</Typography>
          <Button type="button" onClick={() => setOpen(true)}>
            Finish
          </Button>
          {sentenceSessionTestQuestionQuery.isFetched ? (
            <FormErrorWrapper formErrorState={errCtrl.formErrorState}>
              <>
                <Stack>
                  <Paper>
                    {sentenceSessionTestQuestionQuery.data!.payload.question}
                  </Paper>
                  {isPracticeSessionTestQuestionToAudio(
                    sentenceSessionTestQuestionQuery.data!.payload,
                  ) ? (
                    <Paper>
                      <audio
                        controls
                        src={
                          sentenceSessionTestQuestionQuery.data!.payload.audio
                        }
                      />
                    </Paper>
                  ) : null}
                  <List>
                    {sentenceSessionTestQuestionQuery.data!.payload.alternatives.map(
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
                  {sentenceSessionTestQuestionQuery.data?.previous ? (
                    <Button
                      type="button"
                      onClick={() => setQuestionNum(questionNum - 1)}
                    >
                      Prev
                    </Button>
                  ) : null}
                  {sentenceSessionTestQuestionQuery.data?.next ? (
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
