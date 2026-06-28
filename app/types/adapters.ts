import type {
  RadicalSessionTestQuestion,
  UUID,
  RadicalQuestionType,
  PracticeSessionTestResultQuestion,
  PracticeSessionTestResultQuestionToAudio,
  PracticeSessionTestQuestionToAudio,
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

export interface GetPracticeSessionTestQuestionResponseSchema {
  count: number;
  next: URL | null;
  previous: URL | null;
  id: UUID;
  sessionId: UUID;
  payload: RadicalSessionTestQuestion<RadicalQuestionType>;
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

export function isPracticeSessionTestQuestionToAudio<QuestionClassType>(
  value: unknown,
): value is PracticeSessionTestQuestionToAudio<QuestionClassType> {
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

export interface GetPracticeSessionTestResultResponseSchema<QuestionClassType> {
  id: UUID;
  sessionId: UUID;
  score: number;
  questions: (
    | PracticeSessionTestResultQuestion<QuestionClassType>
    | PracticeSessionTestResultQuestionToAudio<QuestionClassType>
  )[];
}

export interface GetPracticeSessionTestQuestionParams {
  id: UUID;
  questionNum: number;
}

export interface AnswerPracticeSessionTestQuestionRequestSchema {
  id: UUID;
  questionNum: number;
  answer: "a" | "b" | "c" | "d" | "e";
}
