import type { UUID } from "~/types";

interface PostAuthenticateRequestSchema {
  username: string;
  password: string;
}

export type PostUserCreateRequestSchema = PostAuthenticateRequestSchema;

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
