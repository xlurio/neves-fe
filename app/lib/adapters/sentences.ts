import type {
  AnswerPracticeSessionTestQuestionRequestSchema,
  PaginatedEndpointParams,
  PaginatedForIdEndpointParams,
  GetPracticeSessionTestQuestionParams,
  GetPracticeSessionTestResultResponseSchema,
  GetPracticeSessionTestQuestionResponseSchema,
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
  PracticeSessionTest,
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
    `/api/sentences/sessions/${id}/sentence`,
    { params: { sentenceNum: sentenceNum } },
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

export async function getSentenceSessionTests({
  id,
  page,
}: PaginatedForIdEndpointParams): Promise<
  PaginatedBackendResponse<PracticeSessionTest>
> {
  const response = await api.get<PaginatedBackendResponse<PracticeSessionTest>>(
    `/api/sentences/sessions/${id}/tests`,
    { params: { page } },
  );
  return response.data;
}

export async function postSentenceSessionTestCreate(
  sessionId: UUID,
): Promise<PracticeSessionTest> {
  const response = await api.post<PracticeSessionTest>(
    `/api/sentences/sessions/${sessionId}/tests`,
  );
  return response.data;
}

export async function getSentenceSessionTestQuestion({
  id,
  questionNum,
}: GetPracticeSessionTestQuestionParams): Promise<GetPracticeSessionTestQuestionResponseSchema> {
  const response = await api.get<GetPracticeSessionTestQuestionResponseSchema>(
    `/api/sentences/test/${id}/question/${questionNum}`,
  );
  return response.data;
}

export async function postSentenceSessionTestAnswer({
  id,
  questionNum,
  answer,
}: AnswerPracticeSessionTestQuestionRequestSchema) {
  await api.post(`/api/sentences/test/${id}/answer`, { questionNum, answer });
}

export async function postSentenceSessionTestFinish(id: UUID) {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return;
  }

  await api.post(`/api/sentences/test/${id}/finish`);
}

export async function getSentenceSessionTestResult(
  id: UUID,
): Promise<GetPracticeSessionTestResultResponseSchema<SentenceQuestionType>> {
  const response = await api.get<
    GetPracticeSessionTestResultResponseSchema<SentenceQuestionType>
  >(`/api/sentences/sessions/tests/${id}/result`);
  return response.data;
}
