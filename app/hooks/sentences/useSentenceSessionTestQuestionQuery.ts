import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SentenceSessionTestQuestionRepository } from "~/lib/services/sentenceSessionTestQuestions";
import type { GetPracticeSessionTestQuestionParams } from "~/types/adapters";

export function useSentenceSessionTestQuestionQuery({
  id,
  questionNum,
}: GetPracticeSessionTestQuestionParams) {
  return useQuery({
    queryKey: ["sentence-session", id, questionNum],
    queryFn: () =>
      SentenceSessionTestQuestionRepository.getQuestion({ id, questionNum }),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
}
