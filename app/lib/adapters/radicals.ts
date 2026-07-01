import { api } from "../api";
import type {
  Radical,
  RadicalPracticeSession,
  PracticeSessionAssessment,
  UUID,
  RadicalQuestionType,
} from "~/types";
import type {
  PaginatedEndpointParams,
  GetPracticeSessionAssessmentQuestionParams,
  AnswerPracticeSessionAssessmentQuestionRequestSchema,
  PaginatedForIdEndpointParams,
  GetPracticeSessionAssessmentQuestionResponseSchema,
  GetPracticeSessionAssessmentResultResponseSchema,
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

export async function getRadicalSessionAssessments({
  id,
  page,
}: PaginatedForIdEndpointParams): Promise<
  PaginatedBackendResponse<PracticeSessionAssessment>
> {
  const response = await api.get<
    PaginatedBackendResponse<PracticeSessionAssessment>
  >(`/api/radicals/sessions/${id}/assessments`, { params: { page } });
  return response.data;
}

export async function postRadicalSessionAssessmentCreate(
  sessionId: UUID,
): Promise<PracticeSessionAssessment> {
  const response = await api.post<PracticeSessionAssessment>(
    `/api/radicals/sessions/${sessionId}/assessments`,
  );
  return response.data;
}

export async function getRadicalSessionAssessmentQuestion({
  id,
  questionNum,
}: GetPracticeSessionAssessmentQuestionParams): Promise<GetPracticeSessionAssessmentQuestionResponseSchema> {
  const response =
    await api.get<GetPracticeSessionAssessmentQuestionResponseSchema>(
      `/api/radicals/assessment/${id}/question/${questionNum}`,
    );
  return response.data;
}

export async function postRadicalSessionAssessmentAnswer({
  id,
  questionNum,
  answer,
}: AnswerPracticeSessionAssessmentQuestionRequestSchema) {
  await api.post(`/api/radicals/assessment/${id}/answer`, {
    questionNum,
    answer,
  });
}

export async function postRadicalSessionAssessmentFinish(id: UUID) {
  await api.post(`/api/radicals/assessment/${id}/finish`);
}

export async function getRadicalSessionAssessmentResult(
  id: UUID,
): Promise<
  GetPracticeSessionAssessmentResultResponseSchema<RadicalQuestionType>
> {
  const response = await api.get<
    GetPracticeSessionAssessmentResultResponseSchema<RadicalQuestionType>
  >(`/api/radicals/sessions/assessments/${id}/result`);
  return response.data;
}
