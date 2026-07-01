import type {
  RadicalSessionAssessmentQuestion,
  UUID,
  RadicalQuestionType,
  PracticeSessionAssessmentResultQuestion,
  PracticeSessionAssessmentResultQuestionToAudio,
  PracticeSessionAssessmentQuestionToAudio,
  Sentence,
  Word,
  Logogram,
} from "~/types";

export interface PaginatedBackendResponse<ObjectInterface> {
  count: number;
  next: URL | null;
  previous: URL | null;
  results: ObjectInterface[];
}

export interface UsernamePasswordSchema {
  username: string;
  password: string;
}

export interface PaginatedEndpointParams {
  page: number;
}

export interface PaginatedForIdEndpointParams extends PaginatedEndpointParams {
  id: UUID;
}

export interface GetSentenceSessionSentenceParams {
  id: UUID;
  sentenceNum: number;
}

export interface GetSentenceSessionSentenceWordsParams extends GetSentenceSessionSentenceParams {
  wordNum: number;
}

export interface GetSentenceSessionWordLogogramsParams extends GetSentenceSessionSentenceWordsParams {
  logogramNum: number;
}

export interface GetPracticeSessionAssessmentQuestionResponseSchema {
  count: number;
  next: URL | null;
  previous: URL | null;
  id: UUID;
  sessionId: UUID;
  payload: RadicalSessionAssessmentQuestion<RadicalQuestionType>;
}

export interface GetSentenceSessionSentenceResponseSchema {
  count: number;
  next: URL | null;
  previous: URL | null;
  payload: Sentence;
}

export interface GetSentenceWordResponseSchema {
  count: number;
  next: URL | null;
  previous: URL | null;
  payload: Word;
}

export interface GetWordLogogramResponseSchema {
  count: number;
  next: URL | null;
  previous: URL | null;
  payload: Logogram;
}

export function isPracticeSessionAssessmentQuestionToAudio<QuestionClassType>(
  value: unknown,
): value is PracticeSessionAssessmentQuestionToAudio<QuestionClassType> {
  return (
    typeof value === "object" &&
    value !== null &&
    "payload" in value &&
    typeof value.payload === "object" &&
    value.payload !== null &&
    "type" in value.payload &&
    "question" in value.payload &&
    "audio" in value.payload &&
    "alternatives" in value.payload &&
    "currAnswer" in value.payload
  );
}

export interface GetPracticeSessionAssessmentResultResponseSchema<
  QuestionClassType,
> {
  id: UUID;
  sessionId: UUID;
  score: number;
  questions: (
    | PracticeSessionAssessmentResultQuestion<QuestionClassType>
    | PracticeSessionAssessmentResultQuestionToAudio<QuestionClassType>
  )[];
}

export interface GetPracticeSessionAssessmentQuestionParams {
  id: UUID;
  questionNum: number;
}

export interface AnswerPracticeSessionAssessmentQuestionRequestSchema {
  id: UUID;
  questionNum: number;
  answer: "a" | "b" | "c" | "d" | "e";
}
