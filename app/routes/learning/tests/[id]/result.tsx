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
import { useRadicalSessionTestResultQuery } from "~/hooks/useRadicalSessionTestResultQuery";
import { BackendError } from "~/lib/errors";
import type {
  GetRadicalSessionTestResultResponseSchema,
  RadicalSessionTestResultQuestion,
  RadicalSessionTestResultQuestionToAudio,
  UUID,
} from "~/types";

interface TestResultPathParams {
  id: UUID;
}

const ANSWER_ALTERNATIVES = ["a", "b", "c", "d", "e"] as const;

function hasQuestionAudio(
  question:
    | RadicalSessionTestResultQuestion
    | RadicalSessionTestResultQuestionToAudio,
): question is RadicalSessionTestResultQuestionToAudio {
  return "audio" in question;
}

function formatAlternativeStatus({
  isSelected,
  isExpected,
}: {
  isSelected: boolean;
  isExpected: boolean;
}) {
  if (isSelected && isExpected) {
    return {
      label: "Your answer (correct)",
      color: "success.main",
    };
  }

  if (isExpected) {
    return {
      label: "Expected answer",
      color: "success.main",
    };
  }

  if (isSelected) {
    return {
      label: "Your answer",
      color: "error.main",
    };
  }

  return {
    label: "",
    color: "text.secondary",
  };
}

export default function RadicalSessionTestResultRoute() {
  const params = useParams() as unknown as TestResultPathParams;
  const errCtrl = useFormErrorWrapper();
  const testResultQuery = useRadicalSessionTestResultQuery(params.id);

  useEffect(() => {
    if (!testResultQuery.isError) {
      errCtrl.resetFormError();
      return;
    }

    if (testResultQuery.error instanceof BackendError) {
      errCtrl.setFormError(
        testResultQuery.error.message,
        testResultQuery.error.details,
      );
      return;
    }

    errCtrl.setFormError(
      "Could not load test result",
      "Please refresh this page and try again.",
    );
  }, [testResultQuery.error, testResultQuery.isError]);

  const resultData: GetRadicalSessionTestResultResponseSchema | undefined =
    testResultQuery.data;

  return (
    <Box>
      <Typography variant="h2">Test Result</Typography>
      {testResultQuery.isPending ? (
        <Skeleton height={320} />
      ) : (
        <FormErrorWrapper formErrorState={errCtrl.formErrorState}>
          <Stack spacing={2}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h4">Score: {resultData?.score ?? 0}/100</Typography>
              <Typography variant="body2">Test ID: {params.id}</Typography>
            </Paper>

            {resultData?.questions.length ? (
              resultData.questions.map((question, questionIndex) => {
                const isCorrect = question.currAnswer === question.expectedAnswer;

                return (
                  <Paper key={`${questionIndex}-${question.question}`} sx={{ p: 2 }}>
                    <Stack spacing={2}>
                      <Typography variant="h5">Question {questionIndex + 1}</Typography>
                      <Typography>{question.question}</Typography>

                      {hasQuestionAudio(question) ? (
                        <audio controls src={question.audio} />
                      ) : null}

                      <List>
                        {question.alternatives.map((alternative, alternativeIndex) => {
                          const answerKey = ANSWER_ALTERNATIVES[alternativeIndex];
                          const isSelected = answerKey === question.currAnswer;
                          const isExpected = answerKey === question.expectedAnswer;
                          const status = formatAlternativeStatus({
                            isSelected,
                            isExpected,
                          });

                          return (
                            <ListItem key={`${questionIndex}-${alternativeIndex}`}>
                              <Stack spacing={1} sx={{ width: "100%" }}>
                                <Typography variant="subtitle2">
                                  {answerKey?.toUpperCase() ?? "-"}
                                </Typography>

                                {alternative.type === "AUDIO" ? (
                                  <audio controls src={alternative.payload} />
                                ) : (
                                  <Typography>{alternative.payload}</Typography>
                                )}

                                {status.label ? (
                                  <Typography color={status.color} variant="caption">
                                    {status.label}
                                  </Typography>
                                ) : null}
                              </Stack>
                            </ListItem>
                          );
                        })}
                      </List>

                      <Typography color={isCorrect ? "success.main" : "error.main"}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </Typography>
                    </Stack>
                  </Paper>
                );
              })
            ) : (
              <Paper sx={{ p: 2 }}>
                <Typography>No questions were returned for this test.</Typography>
              </Paper>
            )}
          </Stack>
        </FormErrorWrapper>
      )}
    </Box>
  );
}
