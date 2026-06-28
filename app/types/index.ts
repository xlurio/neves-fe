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
  radicals: {
    progress: number;
  };
  sentences: {
    isUnlocked: boolean;
    progress: number;
  };
}

interface PracticeSession {
  id: UUID;
  createdAt: ISO8601;
  numOfRadicals: number;
  highestScore: number;
}

export interface RadicalPracticeSession extends PracticeSession {
  numOfRadicals: number;
}

export interface SentencePracticeSession extends PracticeSession {
  numOfSentenceCls: number;
}

export interface PracticeSessionTest {
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

export interface Sentence {
  id: number;
  value: string;
}

type QuestionAnswer = "a" | "b" | "c" | "d" | "e";

export interface PracticeSessionTestQuestionTextAlternative {
  type: "TEXT";
  payload: string;
}

export interface PracticeSessionTestQuestionAudioAlternative {
  type: "AUDIO";
  payload: string;
}

type BaseRadicalSessionTestQuestionAlternative =
  | PracticeSessionTestQuestionTextAlternative
  | PracticeSessionTestQuestionAudioAlternative;

interface BasePracticeSessionTestQuestion<QuestionClassType> {
  type: QuestionClassType;
  question: string;
  alternatives: BaseRadicalSessionTestQuestionAlternative[];
}

export interface BasePracticeSessionTestUnansweredQuestion<
  QuestionClassType,
> extends BasePracticeSessionTestQuestion<QuestionClassType> {
  currAnswer: QuestionAnswer | null;
}

export interface PracticeSessionTestQuestionToAudioMixin {
  audio: URL;
}

export interface PracticeSessionTestQuestionToAudio<QuestionClassType>
  extends
    BasePracticeSessionTestUnansweredQuestion<QuestionClassType>,
    PracticeSessionTestQuestionToAudioMixin {}

export interface RadicalSessionTestQuestionFromAudio<
  QuestionClassType,
> extends BasePracticeSessionTestUnansweredQuestion<QuestionClassType> {
  alternatives: PracticeSessionTestQuestionAudioAlternative[];
}

export type RadicalSessionTestQuestion<QuestionClassType> =
  | BasePracticeSessionTestUnansweredQuestion<QuestionClassType>
  | PracticeSessionTestQuestionToAudio<QuestionClassType>
  | RadicalSessionTestQuestionFromAudio<QuestionClassType>;

export interface PracticeSessionTestResultQuestion<
  QuestionClassType,
> extends BasePracticeSessionTestQuestion<QuestionClassType> {
  currAnswer: QuestionAnswer;
  expectedAnswer: QuestionAnswer;
}

export interface PracticeSessionTestResultQuestionToAudio<QuestionClassType>
  extends
    PracticeSessionTestResultQuestion<QuestionClassType>,
    PracticeSessionTestQuestionToAudioMixin {}

export type RadicalQuestionType =
  | "AUDIO-TO-LOGOGRAM"
  | "LOGOGRAM-TO-AUDIO"
  | "LOGOGRAM-TO-MEANING"
  | "LOGOGRAM-TO-PINYIN"
  | "MEANING-TO-LOGOGRAM"
  | "PINYIN-TO-LOGOGRAM";

export type SentenceQuestionType =
  | "SENTENCE-AUDIO-TO-WORD-AUDIO"
  | "SENTENCE-TEXT-TO-WORD-AUDIO"
  | "SENTENCE-AUDIO-TO-WORD-TEXT"
  | "SENTENCE-TEXT-TO-WORD-TEXT"
  | "LOGOGRAM-TO-RADICALS";

export interface Word {
  id: number;
  value: string;
  pinyin: string;
  meaning: string;
  pronounce: URL;
}

export interface Logogram {
  id: string;
  pinyin: string;
  meaning: string;
  pronounce: URL;
  radicals: Radical[];
}
