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
  username: string;
  radicals: {
    progress: number;
  };
  ngrams: {
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

export interface NgramPracticeSession extends PracticeSession {
  numOfNgramCls: number;
}

export interface PracticeSessionAssessment {
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

export interface Ngram {
  id: number;
  value: string;
  meaning: string;
  pronounce: URL;
}

type QuestionAnswer = "a" | "b" | "c" | "d" | "e";

export interface PracticeSessionAssessmentQuestionTextAlternative {
  type: "TEXT";
  payload: string;
}

export interface PracticeSessionAssessmentQuestionAudioAlternative {
  type: "AUDIO";
  payload: string;
}

type BaseRadicalSessionAssessmentQuestionAlternative =
  | PracticeSessionAssessmentQuestionTextAlternative
  | PracticeSessionAssessmentQuestionAudioAlternative;

interface BasePracticeSessionAssessmentQuestion<QuestionClassType> {
  type: QuestionClassType;
  question: string;
  alternatives: BaseRadicalSessionAssessmentQuestionAlternative[];
}

export interface BasePracticeSessionAssessmentUnansweredQuestion<
  QuestionClassType,
> extends BasePracticeSessionAssessmentQuestion<QuestionClassType> {
  currAnswer: QuestionAnswer | null;
}

export interface PracticeSessionAssessmentQuestionToAudioMixin {
  audio: URL;
}

export interface PracticeSessionAssessmentQuestionToAudio<QuestionClassType>
  extends
    BasePracticeSessionAssessmentUnansweredQuestion<QuestionClassType>,
    PracticeSessionAssessmentQuestionToAudioMixin {}

export interface RadicalSessionAssessmentQuestionFromAudio<
  QuestionClassType,
> extends BasePracticeSessionAssessmentUnansweredQuestion<QuestionClassType> {
  alternatives: PracticeSessionAssessmentQuestionAudioAlternative[];
}

export type RadicalSessionAssessmentQuestion<QuestionClassType> =
  | BasePracticeSessionAssessmentUnansweredQuestion<QuestionClassType>
  | PracticeSessionAssessmentQuestionToAudio<QuestionClassType>
  | RadicalSessionAssessmentQuestionFromAudio<QuestionClassType>;

export interface PracticeSessionAssessmentResultQuestion<
  QuestionClassType,
> extends BasePracticeSessionAssessmentQuestion<QuestionClassType> {
  currAnswer: QuestionAnswer;
  expectedAnswer: QuestionAnswer;
}

export interface PracticeSessionAssessmentResultQuestionToAudio<
  QuestionClassType,
>
  extends
    PracticeSessionAssessmentResultQuestion<QuestionClassType>,
    PracticeSessionAssessmentQuestionToAudioMixin {}

export type RadicalQuestionType =
  | "AUDIO-TO-LOGOGRAM"
  | "LOGOGRAM-TO-AUDIO"
  | "LOGOGRAM-TO-MEANING"
  | "LOGOGRAM-TO-PINYIN"
  | "MEANING-TO-LOGOGRAM"
  | "PINYIN-TO-LOGOGRAM";

export type NgramQuestionType =
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
