import { api } from "../api";
import type {
  GetRadicalSessionTestQuestionResponseSchema,
  GetRadicalSessionTestResultResponseSchema,
  PaginatedBackendResponse,
  Radical,
  RadicalSession,
  RadicalSessionTest,
  UUID,
} from "~/types";
import {
  makeDummyRadical,
  makeDummyRadicalSessions,
  makeDummyRadicalSessionTest,
  makeDummyRadicalSessionTestQuestion,
  makeDummyRadicalSessionTestResult,
} from "../dummies";
import type {
  GetRadicalSessionRadicalsParams,
  GetRadicalSessionsParams,
  GetRadicalSessionTestQuestionParams,
  GetRadicalSessionTestResultParams,
  GetRadicalSessionTestsParams,
  PostRadicalSessionTestAnswerParams,
} from "./types";

export async function getRadicalSession(id: UUID): Promise<RadicalSession> {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadicalSessions();
  }

  const response = await api.get<RadicalSession>(
    `/api/radicals/sessions/${id}`,
  );
  return response.data;
}

export async function postRadicalSessions(): Promise<RadicalSession> {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadicalSessions();
  }

  const response = await api.post<RadicalSession>(`/api/radicals/sessions`);
  return response.data;
}

export async function getRadicalSessions({
  page,
}: GetRadicalSessionsParams): Promise<
  PaginatedBackendResponse<RadicalSession>
> {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return {
      count: 1,
      next: null,
      previous: null,
      results: [makeDummyRadicalSessions()],
    };
  }

  const response = await api.get<PaginatedBackendResponse<RadicalSession>>(
    "/api/radicals/sessions",
    { params: { page } },
  );
  return response.data;
}

export async function getRadicalSessionRadicals({
  id,
  page,
}: GetRadicalSessionRadicalsParams): Promise<
  PaginatedBackendResponse<Radical>
> {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return {
      count: 1,
      next: null,
      previous: null,
      results: [makeDummyRadical()],
    };
  }

  const response = await api.get<PaginatedBackendResponse<Radical>>(
    `/api/radicals/sessions/${id}/radicals`,
    { params: { page } },
  );
  return response.data;
}

export async function postRadicalSessionsRadical(id: UUID) {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadical();
  }

  const response = await api.post<Radical>(
    `/api/radicals/sessions/${id}/radicals`,
  );
  return response.data;
}

export async function getRadicalSessionTests({
  id,
  page = 1,
}: GetRadicalSessionTestsParams): Promise<
  PaginatedBackendResponse<RadicalSessionTest>
> {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return {
      count: 3,
      next: null,
      previous: null,
      results: [
        makeDummyRadicalSessionTest(),
        makeDummyRadicalSessionTest(),
        makeDummyRadicalSessionTest(),
      ],
    };
  }

  const response = await api.get<PaginatedBackendResponse<RadicalSessionTest>>(
    `/api/radicals/sessions/${id}/tests`,
    { params: { page } },
  );
  return response.data;
}

export async function postRadicalSessionTestCreate(
  sessionId: UUID,
): Promise<RadicalSessionTest> {
  const response = await api.post<RadicalSessionTest>(
    `/api/radicals/sessions/${sessionId}/tests`,
  );
  return response.data;
}

export async function getRadicalSessionTestQuestion({
  id,
  questionNum,
}: GetRadicalSessionTestQuestionParams): Promise<GetRadicalSessionTestQuestionResponseSchema> {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadicalSessionTestQuestion(questionNum);
  }

  const response = await api.get<GetRadicalSessionTestQuestionResponseSchema>(
    `/api/radicals/test/${id}/question/${questionNum}`,
  );
  return response.data;
}

export async function postRadicalSessionTestAnswer({
  id,
  questionNum,
  answer,
}: PostRadicalSessionTestAnswerParams) {
  await api.post(`/api/radicals/test/${id}/answer`, { questionNum, answer });
}

export async function postRadicalSessionTestFinish(id: UUID) {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return;
  }

  await api.post(`/api/radicals/test/${id}/finish`);
}

export async function getRadicalSessionTestResult({
  id,
}: GetRadicalSessionTestResultParams): Promise<GetRadicalSessionTestResultResponseSchema> {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadicalSessionTestResult(id);
  }

  const response = await api.get<GetRadicalSessionTestResultResponseSchema>(
    `/api/radicals/sessions/tests/${id}/result`,
  );
  return response.data;
}
