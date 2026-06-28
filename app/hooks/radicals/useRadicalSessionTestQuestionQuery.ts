import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RadicalSessionTestQuestionRepository } from "~/lib/services/radicalSessionTestQuestions";
import type { GetPracticeSessionTestQuestionParams } from "~/types/adapters";

export function useRadicalSessionTestQuestionQuery({
  id,
  questionNum,
}: GetPracticeSessionTestQuestionParams) {
  return useQuery({
    queryKey: ["radical-session", id, questionNum],
    queryFn: () =>
      RadicalSessionTestQuestionRepository.getQuestion({ id, questionNum }),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
}
