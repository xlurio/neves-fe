import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { GetRadicalSessionTestQuestionParams } from "~/lib/adapters";
import { RadicalSessionTestQuestionRepository } from "~/lib/services/radicalSessionTestQuestions";

export function useRadicalSessionTestQuestionQuery({
  id,
  questionNum,
}: GetRadicalSessionTestQuestionParams) {
  return useQuery({
    queryKey: ["radical-session", id, questionNum],
    queryFn: () =>
      RadicalSessionTestQuestionRepository.getQuestion({ id, questionNum }),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
}
