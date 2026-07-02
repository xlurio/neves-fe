import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useParams } from "react-router";
import FormErrorWrapper from "~/components/FormErrorWrapper";
import useFormErrorWrapper from "~/hooks/useFormErrorWrapper";
import { useNgramSessionQuery } from "~/hooks/ngrams/useNgramSessionQuery";
import { BackendError } from "~/lib/errors";
import {
  ANSWER_ALTERNATIVES,
  formatAlternativeStatus,
  hasQuestionAudio,
} from "~/lib/utils/result";
import type { UUID } from "~/types";
import { useNgramSessionAssessmentResultQuery } from "~/hooks/ngrams/useNgramSessionAssessmentResultQuery";

interface AssessmentResultPathParams {
  id: UUID;
}

export default function NgramSessionAssessmentResultRoute() {
  const params = useParams() as unknown as AssessmentResultPathParams;
  const errCtrl = useFormErrorWrapper();
  const { setFormError, resetFormError } = errCtrl;
  const assessmentResultQuery = useNgramSessionAssessmentResultQuery(params.id);
  const ngramSessionQuery = useNgramSessionQuery(
    assessmentResultQuery.data?.sessionId || "",
  );

  useEffect(() => {
    if (!assessmentResultQuery.isError) {
      resetFormError();
      return;
    }

    if (assessmentResultQuery.error instanceof BackendError) {
      setFormError(
        assessmentResultQuery.error.message,
        assessmentResultQuery.error.details,
      );
      return;
    }

    setFormError(
      "Could not load assessment result",
      "Please refresh this page and try again.",
    );
  }, [
    resetFormError,
    setFormError,
    assessmentResultQuery.error,
    assessmentResultQuery.isError,
  ]);

  const resultData = assessmentResultQuery.data;

  return (
    <Box>
      <Typography variant="h2">
        Sequence Session -{" "}
        {ngramSessionQuery.isFetched ? (
          new Date(ngramSessionQuery.data!.createdAt).toLocaleString()
        ) : (
          <Skeleton />
        )}
      </Typography>
      <Typography variant="h3">Assessment</Typography>
      {assessmentResultQuery.isPending ? (
        <Skeleton height={320} />
      ) : (
        <FormErrorWrapper formErrorState={errCtrl.formErrorState}>
          <Stack spacing={2}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h4">
                Score: {resultData?.score ?? 0}/100
              </Typography>
            </Paper>

            {resultData?.questions.length ? (
              resultData.questions.map((question, questionIndex) => {
                const isCorrect =
                  question.currAnswer === question.expectedAnswer;

                return (
                  <Paper
                    key={`${questionIndex}-${question.question}`}
                    sx={{ p: 2 }}
                  >
                    <Stack spacing={2}>
                      <Typography variant="h5">
                        Question {questionIndex + 1}
                      </Typography>
                      <Typography>{question.question}</Typography>

                      {hasQuestionAudio(question) ? (
                        <audio controls src={question.audio} />
                      ) : null}

                      <List>
                        {question.alternatives.map(
                          (alternative, alternativeIndex) => {
                            const answerKey =
                              ANSWER_ALTERNATIVES[alternativeIndex];
                            const isSelected =
                              answerKey === question.currAnswer;
                            const isExpected =
                              answerKey === question.expectedAnswer;
                            const status = formatAlternativeStatus({
                              isSelected,
                              isExpected,
                            });

                            return (
                              <ListItem
                                key={`${questionIndex}-${alternativeIndex}`}
                              >
                                <Stack spacing={1} sx={{ width: "100%" }}>
                                  <Typography variant="subtitle2">
                                    {answerKey?.toUpperCase() ?? "-"}
                                  </Typography>

                                  {alternative.type === "AUDIO" ? (
                                    <audio controls src={alternative.payload} />
                                  ) : (
                                    <Typography>
                                      {alternative.payload}
                                    </Typography>
                                  )}

                                  {status.label ? (
                                    <Typography
                                      color={status.color}
                                      variant="caption"
                                    >
                                      {status.label}
                                    </Typography>
                                  ) : null}
                                </Stack>
                              </ListItem>
                            );
                          },
                        )}
                      </List>

                      <Typography
                        color={isCorrect ? "success.main" : "error.main"}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </Typography>
                    </Stack>
                  </Paper>
                );
              })
            ) : (
              <Paper sx={{ p: 2 }}>
                <Typography>
                  No questions were returned for this assessment.
                </Typography>
              </Paper>
            )}
          </Stack>
        </FormErrorWrapper>
      )}
    </Box>
  );
}
