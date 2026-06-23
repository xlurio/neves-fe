import { randomUUID } from "crypto";
import { NotImplementedError } from "./errors";
import type {
  PaginatedBackendResponse,
  Radical,
  RadicalSession,
  RadicalSessionTest,
  GetRadicalSessionTestQuestionResponseSchema,
  GetRadicalSessionTestResultResponseSchema,
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

export async function postAuthenticate(data: PostAuthenticateRequestSchema) {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return;
  } else {
    throw new NotImplementedError(
      "`POST /api/authenticate` endpoint was not integrated yet",
    );
  }
}

export async function postUserCreate(
  data: PostUserCreateRequestSchema,
): Promise<User> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return {
      id: randomUUID(),
      username: "user",
      password: "somepwd",
    };
  } else {
    throw new NotImplementedError(
      "`POST /api/users` endpoint was not integrated yet",
    );
  }
}

export async function getStatisticsMe(): Promise<UserStatistics> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyUserStats();
  } else {
    throw new NotImplementedError(
      "`GET /api/stats/me` endpoint was not integrated yet",
    );
  }
}

export async function getRadicalSession(id: UUID) {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadicalSessions();
  } else {
    throw new NotImplementedError(
      "`GET /api/radicals/sessions/{id}` endpoint was not integrated yet",
    );
  }
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
  } else {
    throw new NotImplementedError(
      "`GET /api/radicals/sessions` endpoint was not integrated yet",
    );
  }
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
  } else {
    throw new NotImplementedError(
      "`GET /api/radicals/sessions/{id}/radicals` endpoint was not integrated yet",
    );
  }
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
  } else {
    throw new NotImplementedError(
      "`GET /api/radicals/sessions/{id}/tests` endpoint was not integrated yet",
    );
  }
}

export async function getRadicalSessionTestQuestion({
  id,
  questionNum,
}: GetRadicalSessionTestQuestionParams): Promise<GetRadicalSessionTestQuestionResponseSchema> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadicalSessionTestQuestion(questionNum);
  } else {
    throw new NotImplementedError(
      "`GET /api/radicals/sessions/{id}/radicals` endpoint was not integrated yet",
    );
  }
}

export async function postRadicalSessionTestFinish(id: UUID) {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return
  } else {
    throw new NotImplementedError(
      "`GET /api/radicals/sessions/{id}/radicals` endpoint was not integrated yet",
    );
  }
}

export async function getRadicalSessionTestResult({
  id,
}: GetRadicalSessionTestResultParams): Promise<GetRadicalSessionTestResultResponseSchema> {
  if (!!import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return makeDummyRadicalSessionTestResult(id);
  } else {
    throw new NotImplementedError(
      "`GET /api/radicals/sessions/tests/{id}/result` endpoint was not integrated yet",
    );
  }
}
