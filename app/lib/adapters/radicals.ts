import { api } from "../api";
import type {
  Radical,
  RadicalPracticeSession,
  PracticeSessionTest,
  UUID,
  RadicalQuestionType,
} from "~/types";
import type {
  PaginatedEndpointParams,
  GetPracticeSessionTestQuestionParams,
  AnswerPracticeSessionTestQuestionRequestSchema,
  PaginatedForIdEndpointParams,
  GetPracticeSessionTestQuestionResponseSchema,
  GetPracticeSessionTestResultResponseSchema,
  PaginatedBackendResponse,
} from "../../types/adapters";

export async function getRadicalSession(
  id: UUID,
): Promise<RadicalPracticeSession> {
  const response = await api.get<RadicalPracticeSession>(
    `/api/radicals/sessions/${id}`,
  );
  return response.data;
}

export async function postRadicalSessions(): Promise<RadicalPracticeSession> {
  const response = await api.post<RadicalPracticeSession>(
    `/api/radicals/sessions`,
  );
  return response.data;
}

export async function getRadicalSessions({
  page,
}: PaginatedEndpointParams): Promise<
  PaginatedBackendResponse<RadicalPracticeSession>
> {
  const response = await api.get<
    PaginatedBackendResponse<RadicalPracticeSession>
  >("/api/radicals/sessions", { params: { page } });
  return response.data;
}

export async function getRadicalSessionRadicals({
  id,
  page,
}: PaginatedForIdEndpointParams): Promise<PaginatedBackendResponse<Radical>> {
  const response = await api.get<PaginatedBackendResponse<Radical>>(
    `/api/radicals/sessions/${id}/radicals`,
    { params: { page } },
  );
  return response.data;
}

export async function postRadicalSessionsRadical(id: UUID) {
  const response = await api.post<Radical>(
    `/api/radicals/sessions/${id}/radicals`,
  );
  return response.data;
}

export async function getRadicalSessionTests({
  id,
  page,
}: PaginatedForIdEndpointParams): Promise<
  PaginatedBackendResponse<PracticeSessionTest>
> {
  const response = await api.get<PaginatedBackendResponse<PracticeSessionTest>>(
    `/api/radicals/sessions/${id}/tests`,
    { params: { page } },
  );
  return response.data;
}

export async function postRadicalSessionTestCreate(
  sessionId: UUID,
): Promise<PracticeSessionTest> {
  const response = await api.post<PracticeSessionTest>(
    `/api/radicals/sessions/${sessionId}/tests`,
  );
  return response.data;
}

export async function getRadicalSessionTestQuestion({
  id,
  questionNum,
}: GetPracticeSessionTestQuestionParams): Promise<GetPracticeSessionTestQuestionResponseSchema> {
  const response = await api.get<GetPracticeSessionTestQuestionResponseSchema>(
    `/api/radicals/test/${id}/question/${questionNum}`,
  );
  return response.data;
}

export async function postRadicalSessionTestAnswer({
  id,
  questionNum,
  answer,
}: AnswerPracticeSessionTestQuestionRequestSchema) {
  await api.post(`/api/radicals/test/${id}/answer`, { questionNum, answer });
}

export async function postRadicalSessionTestFinish(id: UUID) {
  await api.post(`/api/radicals/test/${id}/finish`);
}

export async function getRadicalSessionTestResult(
  id: UUID,
): Promise<GetPracticeSessionTestResultResponseSchema<RadicalQuestionType>> {
  const response = await api.get<
    GetPracticeSessionTestResultResponseSchema<RadicalQuestionType>
  >(`/api/radicals/sessions/tests/${id}/result`);
  return response.data;
}
