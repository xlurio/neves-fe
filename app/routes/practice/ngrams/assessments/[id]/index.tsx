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
import { useNgramSessionQuery } from "~/hooks/ngrams/useNgramSessionQuery";
import { NgramSessionAssessmentRepository } from "~/lib/services/ngramSessionAssessments";
import { BackendError } from "~/lib/errors";
import { type UUID } from "~/types";
import { isPracticeSessionAssessmentQuestionToAudio } from "~/types/adapters";
import { useNgramSessionAssessmentFinishMutation } from "~/hooks/ngrams/useNgramSessionAssessmentFinishMutation";
import { useNgramSessionAssessmentQuestionQuery } from "~/hooks/ngrams/useNgramSessionAssessmentQuestionQuery";

interface NgramSessionPathParams {
  assessmentId: UUID;
}

export default function NgramSessionAssessmentRoute() {
  const params = useParams() as unknown as NgramSessionPathParams;
  const navigate = useNavigate();
  const [questionNum, setQuestionNum] = useState(1);
  const ngramSessionAssessmentQuestionQuery =
    useNgramSessionAssessmentQuestionQuery({
      id: params.assessmentId ?? undefined,
      questionNum: questionNum,
    });
  const ngramSessionQuery = useNgramSessionQuery(
    ngramSessionAssessmentQuestionQuery.data?.sessionId || "",
  );
  const [isOpen, setOpen] = useState(false);
  const errCtrl = useFormErrorWrapper();
  const finishMutation = useNgramSessionAssessmentFinishMutation();
  const [isAnswering, setIsAnswering] = useState(false);

  const ANSWERS = ["a", "b", "c", "d", "e"] as const;

  const handleConfirmAssessment = async () => {
    try {
      errCtrl.resetFormError();
      await finishMutation.mutateAsync(params.assessmentId);
      navigate(`/practice/ngrams/assessments/${params.assessmentId}/result`);
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
      await NgramSessionAssessmentRepository.answer(
        params.assessmentId,
        questionNum,
        answer,
      );

      if (ngramSessionAssessmentQuestionQuery.data?.next)
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
      {ngramSessionQuery.isFetched ? (
        <>
          <Dialog onClose={() => setOpen(false)} open={isOpen}>
            <DialogTitle>
              Are you sure you want to finish the assessment?
            </DialogTitle>
            <DialogActions>
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleConfirmAssessment}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Typography variant="h2">
            Sequence Session -{" "}
            {new Date(ngramSessionQuery.data!.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="h3">Assessment</Typography>
          <Button type="button" onClick={() => setOpen(true)}>
            Finish
          </Button>
          {ngramSessionAssessmentQuestionQuery.isFetched ? (
            <FormErrorWrapper formErrorState={errCtrl.formErrorState}>
              <>
                <Stack>
                  <Paper>
                    {ngramSessionAssessmentQuestionQuery.data!.payload.question}
                  </Paper>
                  {isPracticeSessionAssessmentQuestionToAudio(
                    ngramSessionAssessmentQuestionQuery.data!.payload,
                  ) ? (
                    <Paper>
                      <audio
                        controls
                        src={
                          ngramSessionAssessmentQuestionQuery.data!.payload
                            .audio
                        }
                      />
                    </Paper>
                  ) : null}
                  <List>
                    {ngramSessionAssessmentQuestionQuery.data!.payload.alternatives.map(
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
                  {ngramSessionAssessmentQuestionQuery.data?.previous ? (
                    <Button
                      type="button"
                      onClick={() => setQuestionNum(questionNum - 1)}
                    >
                      Prev
                    </Button>
                  ) : null}
                  {ngramSessionAssessmentQuestionQuery.data?.next ? (
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
