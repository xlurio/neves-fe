export type UUID = string;
type ISO8601 = string;
type URL = string;

export interface BackendErrorSchema {
  code: string;
  title: string;
  details: string;
}

export function isBackendErrorSchema(
  value: unknown,
): value is BackendErrorSchema {
  return (
    value !== null &&
    typeof value === "object" &&
    "code" in value &&
    typeof value.code === "string" &&
    "title" in value &&
    typeof value.title === "string" &&
    "details" in value &&
    typeof value.details === "string"
  );
}

export interface MissedQuestionErrorSchema extends BackendErrorSchema {
  payload: {
    questionMissed: number;
  };
}

export function isMissedQuestionErrorSchema(
  value: unknown,
): value is MissedQuestionErrorSchema {
  return (
    isBackendErrorSchema(value) &&
    "payload" in value &&
    value.code === "QUESTION_MISSED" &&
    value.payload !== null &&
    typeof value.payload === "object" &&
    "questionMissed" in value.payload &&
    typeof value.payload.questionMissed === "number"
  );
}

export interface User {
  id: UUID;
  username: string;
  password: string;
}

export interface UserStatistics {
  chineseLogographicSystem: {
    radicalsLearned: number;
    totalRadicals: number;
    progress: number;
  };
}

export interface RadicalSession {
  id: UUID;
  createdAt: ISO8601;
  numOfRadicals: number;
  highestScore: number;
}

export interface RadicalSessionTest {
  id: UUID;
  finishedAt: ISO8601;
  score: number;
}

export interface Radical {
  id: string;
  pinyin: string;
  meaning: string;
  pronounce: URL;
}

export interface PaginatedBackendResponse<ObjectInterface> {
  count: number;
  next: URL | null;
  previous: URL | null;
  results: ObjectInterface[];
}

type RadicalSessionTestQuestionType =
  | "AUDIO-TO-LOGOGRAM"
  | "LOGOGRAM-TO-AUDIO"
  | "LOGOGRAM-TO-MEANING"
  | "LOGOGRAM-TO-PINYIN"
  | "MEANING-TO-LOGOGRAM"
  | "PINYIN-TO-LOGOGRAM";

type QuestionAnswer = "a" | "b" | "c" | "d" | "e";

export interface RadicalSessionTestQuestionTextAlternative {
  type: "TEXT";
  payload: string;
}

export interface RadicalSessionTestQuestionAudioAlternative {
  type: "AUDIO";
  payload: string;
}

type BaseRadicalSessionTestQuestionAlternative =
  | RadicalSessionTestQuestionTextAlternative
  | RadicalSessionTestQuestionAudioAlternative;

export interface BaseRadicalSessionTestQuestion {
  type: RadicalSessionTestQuestionType;
  question: string;
  alternatives: BaseRadicalSessionTestQuestionAlternative[];
}

export interface BaseRadicalSessionTestUnansweredQuestion extends BaseRadicalSessionTestQuestion {
  currAnswer: QuestionAnswer | null;
}

export interface RadicalSessionTestQuestionToAudioMixin {
  audio: URL;
}

export interface RadicalSessionTestQuestionToAudio
  extends
    BaseRadicalSessionTestUnansweredQuestion,
    RadicalSessionTestQuestionToAudioMixin {}

export function isRadicalSessionTestQuestionToAudio(
  value: GetRadicalSessionTestQuestionResponseSchema,
): value is GetRadicalSessionTestQuestionResponseSchema & {
  payload: RadicalSessionTestQuestionToAudio;
} {
  const payload = value.payload;

  return (
    typeof payload === "object" &&
    payload !== null &&
    "type" in payload &&
    "question" in payload &&
    "audio" in payload &&
    "alternatives" in payload &&
    "currAnswer" in payload
  );
}

export interface RadicalSessionTestQuestionFromAudio extends BaseRadicalSessionTestUnansweredQuestion {
  alternatives: RadicalSessionTestQuestionAudioAlternative[];
}

export type RadicalSessionTestQuestion =
  | BaseRadicalSessionTestUnansweredQuestion
  | RadicalSessionTestQuestionToAudio
  | RadicalSessionTestQuestionFromAudio;

export interface GetRadicalSessionTestQuestionResponseSchema {
  count: number;
  next: URL | null;
  previous: URL | null;
  id: UUID;
  radicalsSessionId: UUID;
  payload: RadicalSessionTestQuestion;
}

export interface RadicalSessionTestResultQuestion extends BaseRadicalSessionTestQuestion {
  currAnswer: QuestionAnswer;
  expectedAnswer: QuestionAnswer;
}

export interface RadicalSessionTestResultQuestionToAudio
  extends
    RadicalSessionTestResultQuestion,
    RadicalSessionTestQuestionToAudioMixin {}

export interface GetRadicalSessionTestResultResponseSchema {
  id: UUID;
  radicalsSessionId: UUID;
  score: number;
  questions: (
    | RadicalSessionTestResultQuestion
    | RadicalSessionTestResultQuestionToAudio
  )[];
}
