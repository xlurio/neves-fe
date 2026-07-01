import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SentenceSessionAssessmentQuestionRepository } from "~/lib/services/sentenceSessionAssessmentQuestions";
import type { GetPracticeSessionAssessmentQuestionParams } from "~/types/adapters";

export function useSentenceSessionAssessmentQuestionQuery({
  id,
  questionNum,
}: GetPracticeSessionAssessmentQuestionParams) {
  return useQuery({
    queryKey: ["sentence-session", id, questionNum],
    queryFn: () =>
      SentenceSessionAssessmentQuestionRepository.getQuestion({
        id,
        questionNum,
      }),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
}
