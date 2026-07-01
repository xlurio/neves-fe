import type {
  AnswerPracticeSessionAssessmentQuestionRequestSchema,
  PaginatedEndpointParams,
  PaginatedForIdEndpointParams,
  GetPracticeSessionAssessmentQuestionParams,
  GetPracticeSessionAssessmentResultResponseSchema,
  GetPracticeSessionAssessmentQuestionResponseSchema,
  PaginatedBackendResponse,
  GetSentenceSessionSentenceResponseSchema,
  GetSentenceSessionSentenceParams,
  GetSentenceSessionSentenceWordsParams,
  GetSentenceWordResponseSchema,
  GetSentenceSessionWordLogogramsParams,
  GetWordLogogramResponseSchema,
} from "~/types/adapters";
import { api } from "../api";
import type {
  PracticeSessionAssessment,
  SentencePracticeSession,
  SentenceQuestionType,
  UUID,
} from "~/types";

export async function getSentenceSession(
  id: UUID,
): Promise<SentencePracticeSession> {
  const response = await api.get<SentencePracticeSession>(
    `/api/sentences/sessions/${id}`,
  );
  return response.data;
}

export async function postSentenceSessions(): Promise<SentencePracticeSession> {
  const response = await api.post<SentencePracticeSession>(
    `/api/sentences/sessions`,
  );
  return response.data;
}

export async function getSentenceSessions({
  page,
}: PaginatedEndpointParams): Promise<
  PaginatedBackendResponse<SentencePracticeSession>
> {
  const response = await api.get<
    PaginatedBackendResponse<SentencePracticeSession>
  >("/api/sentences/sessions", { params: { page } });
  return response.data;
}

export async function getSentenceSessionSentence({
  id,
  sentenceNum,
}: GetSentenceSessionSentenceParams) {
  const response = await api.get<GetSentenceSessionSentenceResponseSchema>(
    `/api/sentences/sessions/${id}/sentences/${sentenceNum}`,
  );
  return response.data;
}

export async function getSentenceSessionSentenceWords({
  id,
  sentenceNum,
  wordNum,
}: GetSentenceSessionSentenceWordsParams) {
  const response = await api.get<GetSentenceWordResponseSchema>(
    `/api/sentences/sessions/${id}/sentence/${sentenceNum}/word`,
    { params: { wordNum: wordNum } },
  );
  return response.data;
}

export async function getSentenceSessionWordLogograms({
  id,
  sentenceNum,
  wordNum,
  logogramNum,
}: GetSentenceSessionWordLogogramsParams) {
  const response = await api.get<GetWordLogogramResponseSchema>(
    `/api/sentences/sessions/${id}/sentence/${sentenceNum}/word/${wordNum}/logogram`,
    { params: { logogramNum: logogramNum } },
  );
  return response.data;
}

export async function getSentenceSessionAssessments({
  id,
  page,
}: PaginatedForIdEndpointParams): Promise<
  PaginatedBackendResponse<PracticeSessionAssessment>
> {
  const response = await api.get<
    PaginatedBackendResponse<PracticeSessionAssessment>
  >(`/api/sentences/sessions/${id}/assessments`, { params: { page } });
  return response.data;
}

export async function postSentenceSessionAssessmentCreate(
  sessionId: UUID,
): Promise<PracticeSessionAssessment> {
  const response = await api.post<PracticeSessionAssessment>(
    `/api/sentences/sessions/${sessionId}/assessments`,
  );
  return response.data;
}

export async function getSentenceSessionAssessmentQuestion({
  id,
  questionNum,
}: GetPracticeSessionAssessmentQuestionParams): Promise<GetPracticeSessionAssessmentQuestionResponseSchema> {
  const response =
    await api.get<GetPracticeSessionAssessmentQuestionResponseSchema>(
      `/api/sentences/assessment/${id}/question/${questionNum}`,
    );
  return response.data;
}

export async function postSentenceSessionAssessmentAnswer({
  id,
  questionNum,
  answer,
}: AnswerPracticeSessionAssessmentQuestionRequestSchema) {
  await api.post(`/api/sentences/assessment/${id}/answer`, {
    questionNum,
    answer,
  });
}

export async function postSentenceSessionAssessmentFinish(id: UUID) {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return;
  }

  await api.post(`/api/sentences/assessment/${id}/finish`);
}

export async function getSentenceSessionAssessmentResult(
  id: UUID,
): Promise<
  GetPracticeSessionAssessmentResultResponseSchema<SentenceQuestionType>
> {
  const response = await api.get<
    GetPracticeSessionAssessmentResultResponseSchema<SentenceQuestionType>
  >(`/api/sentences/sessions/assessments/${id}/result`);
  return response.data;
}
