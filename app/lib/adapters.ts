import { api } from "./api";
import type {
  GetRadicalSessionTestQuestionResponseSchema,
  GetRadicalSessionTestResultResponseSchema,
  PaginatedBackendResponse,
  Radical,
  RadicalSession,
  RadicalSessionTest,
  User,
  UserStatistics,
  UUID,
} from "~/types";
import {
  makeDummyRadical,
  makeDummyRadicalSessions,
  makeDummyRadicalSessionTest,
  makeDummyRadicalSessionTestQuestion,
  makeDummyRadicalSessionTestResult,
  makeDummyUserStats,
} from "./dummies";

interface PostAuthenticateRequestSchema {
  username: string;
  password: string;
}

type PostUserCreateRequestSchema = PostAuthenticateRequestSchema;

export interface GetRadicalSessionsParams {
  page: number;
}

export interface GetRadicalSessionRadicalsParams {
  id: UUID;
  page: number;
}

export interface GetRadicalSessionTestQuestionParams {
  id: UUID | undefined;
  questionNum: number;
}

export interface GetRadicalSessionTestsParams {
  id: UUID;
  page?: number;
}

export interface GetRadicalSessionTestResultParams {
  id: UUID;
}

export interface PostRadicalSessionTestAnswerParams {
  id: UUID;
  questionNum: number;
  answer: "a" | "b" | "c" | "d" | "e";
}

export async function postAuthenticate(data: PostAuthenticateRequestSchema) {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return;
  }

  await api.post("/api/authenticate", data);
}

export async function postUserCreate(
  data: PostUserCreateRequestSchema,
): Promise<User> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return {
      id: "7e28eae1-f854-41e4-87b3-b582354b91ee",
      username: "user",
      password: "somepwd",
    };
  }

  const response = await api.post<User>("/api/users", data);
  return response.data;
}

export async function getStatisticsMe(): Promise<UserStatistics> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyUserStats();
  }

  const response = await api.get<UserStatistics>("/api/stats/me");
  return response.data;
}

export async function getRadicalSession(id: UUID): Promise<RadicalSession> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadicalSessions();
  }

  const response = await api.get<RadicalSession>(
    `/api/radicals/sessions/${id}`,
  );
  return response.data;
}

export async function getRadicalSessions({
  page,
}: GetRadicalSessionsParams): Promise<
  PaginatedBackendResponse<RadicalSession>
> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
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
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
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

export async function getRadicalSessionTests({
  id,
  page = 1,
}: GetRadicalSessionTestsParams): Promise<
  PaginatedBackendResponse<RadicalSessionTest>
> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
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
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
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
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return;
  }

  await api.post(`/api/radicals/test/${id}/finish`);
}

export async function getRadicalSessionTestResult({
  id,
}: GetRadicalSessionTestResultParams): Promise<GetRadicalSessionTestResultResponseSchema> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadicalSessionTestResult(id);
  }

  const response = await api.get<GetRadicalSessionTestResultResponseSchema>(
    `/api/radicals/sessions/tests/${id}/result`,
  );
  return response.data;
}
