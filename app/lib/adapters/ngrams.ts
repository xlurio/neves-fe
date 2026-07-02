import type {
  AnswerPracticeSessionAssessmentQuestionRequestSchema,
  PaginatedEndpointParams,
  PaginatedForIdEndpointParams,
  GetPracticeSessionAssessmentQuestionParams,
  GetPracticeSessionAssessmentResultResponseSchema,
  GetPracticeSessionAssessmentQuestionResponseSchema,
  PaginatedBackendResponse,
  GetNgramSessionNgramResponseSchema,
  GetNgramSessionNgramParams,
  GetNgramSessionNgramWordsParams,
  GetNgramWordResponseSchema,
  GetNgramSessionWordLogogramsParams,
  GetWordLogogramResponseSchema,
} from "~/types/adapters";
import { api } from "../api";
import type {
  PracticeSessionAssessment,
  NgramPracticeSession,
  NgramQuestionType,
  UUID,
} from "~/types";

export async function getNgramSession(id: UUID): Promise<NgramPracticeSession> {
  const response = await api.get<NgramPracticeSession>(
    `/api/ngrams/sessions/${id}`,
  );
  return response.data;
}

export async function postNgramSessions(): Promise<NgramPracticeSession> {
  const response = await api.post<NgramPracticeSession>(`/api/ngrams/sessions`);
  return response.data;
}

export async function getNgramSessions({
  page,
}: PaginatedEndpointParams): Promise<
  PaginatedBackendResponse<NgramPracticeSession>
> {
  const response = await api.get<
    PaginatedBackendResponse<NgramPracticeSession>
  >("/api/ngrams/sessions", { params: { page } });
  return response.data;
}

export async function getNgramSessionNgram({
  id,
  ngramNum,
}: GetNgramSessionNgramParams) {
  const response = await api.get<GetNgramSessionNgramResponseSchema>(
    `/api/ngrams/sessions/${id}/ngrams/${ngramNum}`,
  );
  return response.data;
}

export async function getNgramSessionNgramWords({
  id,
  ngramNum,
  wordNum,
}: GetNgramSessionNgramWordsParams) {
  const response = await api.get<GetNgramWordResponseSchema>(
    `/api/ngrams/sessions/${id}/ngram/${ngramNum}/word`,
    { params: { wordNum: wordNum } },
  );
  return response.data;
}

export async function getNgramSessionWordLogograms({
  id,
  ngramNum,
  wordNum,
  logogramNum,
}: GetNgramSessionWordLogogramsParams) {
  const response = await api.get<GetWordLogogramResponseSchema>(
    `/api/ngrams/sessions/${id}/ngram/${ngramNum}/word/${wordNum}/logogram`,
    { params: { logogramNum: logogramNum } },
  );
  return response.data;
}

export async function getNgramSessionAssessments({
  id,
  page,
}: PaginatedForIdEndpointParams): Promise<
  PaginatedBackendResponse<PracticeSessionAssessment>
> {
  const response = await api.get<
    PaginatedBackendResponse<PracticeSessionAssessment>
  >(`/api/ngrams/sessions/${id}/assessments`, { params: { page } });
  return response.data;
}

export async function postNgramSessionAssessmentCreate(
  sessionId: UUID,
): Promise<PracticeSessionAssessment> {
  const response = await api.post<PracticeSessionAssessment>(
    `/api/ngrams/sessions/${sessionId}/assessments`,
  );
  return response.data;
}

export async function getNgramSessionAssessmentQuestion({
  id,
  questionNum,
}: GetPracticeSessionAssessmentQuestionParams): Promise<GetPracticeSessionAssessmentQuestionResponseSchema> {
  const response =
    await api.get<GetPracticeSessionAssessmentQuestionResponseSchema>(
      `/api/ngrams/assessment/${id}/question/${questionNum}`,
    );
  return response.data;
}

export async function postNgramSessionAssessmentAnswer({
  id,
  questionNum,
  answer,
}: AnswerPracticeSessionAssessmentQuestionRequestSchema) {
  await api.post(`/api/ngrams/assessment/${id}/answer`, {
    questionNum,
    answer,
  });
}

export async function postNgramSessionAssessmentFinish(id: UUID) {
  if (import.meta.env.VITE_MOCK_THIRD_PARTIES) {
    return;
  }

  await api.post(`/api/ngrams/assessment/${id}/finish`);
}

export async function getNgramSessionAssessmentResult(
  id: UUID,
): Promise<
  GetPracticeSessionAssessmentResultResponseSchema<NgramQuestionType>
> {
  const response = await api.get<
    GetPracticeSessionAssessmentResultResponseSchema<NgramQuestionType>
  >(`/api/ngrams/sessions/assessments/${id}/result`);
  return response.data;
}
