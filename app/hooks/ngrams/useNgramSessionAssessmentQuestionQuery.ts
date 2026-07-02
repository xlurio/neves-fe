import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { NgramSessionAssessmentQuestionRepository } from "~/lib/services/ngramSessionAssessmentQuestions";
import type { GetPracticeSessionAssessmentQuestionParams } from "~/types/adapters";

export function useNgramSessionAssessmentQuestionQuery({
  id,
  questionNum,
}: GetPracticeSessionAssessmentQuestionParams) {
  return useQuery({
    queryKey: ["ngram-session", id, questionNum],
    queryFn: () =>
      NgramSessionAssessmentQuestionRepository.getQuestion({
        id,
        questionNum,
      }),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
}
