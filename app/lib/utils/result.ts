import type {
  PracticeSessionTestResultQuestion,
  PracticeSessionTestResultQuestionToAudio,
} from "~/types";

export const ANSWER_ALTERNATIVES = ["a", "b", "c", "d", "e"] as const;

export function hasQuestionAudio<QuestionClassType>(
  question:
    | PracticeSessionTestResultQuestion<QuestionClassType>
    | PracticeSessionTestResultQuestionToAudio<QuestionClassType>,
): question is PracticeSessionTestResultQuestionToAudio<QuestionClassType> {
  return "audio" in question;
}

export function formatAlternativeStatus({
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
