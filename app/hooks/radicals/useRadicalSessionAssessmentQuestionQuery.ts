import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RadicalSessionAssessmentQuestionRepository } from "~/lib/services/radicalSessionAssessmentQuestions";
import type { GetPracticeSessionAssessmentQuestionParams } from "~/types/adapters";

export function useRadicalSessionAssessmentQuestionQuery({
  id,
  questionNum,
}: GetPracticeSessionAssessmentQuestionParams) {
  return useQuery({
    queryKey: ["radical-session", id, questionNum],
    queryFn: () =>
      RadicalSessionAssessmentQuestionRepository.getQuestion({
        id,
        questionNum,
      }),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
}
