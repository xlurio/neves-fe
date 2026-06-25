import type {
  GetRadicalSessionTestQuestionResponseSchema,
  GetRadicalSessionTestResultResponseSchema,
  Radical,
  RadicalSession,
  RadicalSessionTest,
  RadicalSessionTestQuestion,
  UserStatistics,
} from "~/types";

export function makeDummyUserStats(): UserStatistics {
  return {
    chineseLogographicSystem: {
      radicalsLearned: 0,
      totalRadicals: 100,
      progress: 0.0,
    },
  };
}

export function makeDummyRadicalSessions(): RadicalSession {
  return {
    id: "7e28eae1-f854-41e4-87b3-b582354b91ee",
    createdAt: new Date().toISOString(),
    numOfRadicals: 10,
    highestScore: 0,
  };
}

export function makeDummyRadical(): Radical {
  return {
    id: "7e28eae1-f854-41e4-87b3-b582354b91ee",
    mainRepresentation: 0x4eba,
    otherVars: [0x4eba, 0x4ebb],
    pinyin: "rén",
    meaning: "person",
    pronounce: "https://dictionary.writtenchinese.com/sounds/ren2.mp3",
  };
}

export function makeDummyRadicalSessionTest(): RadicalSessionTest {
  const now = new Date();
  now.setDate(now.getDate() - Math.floor(Math.random() * 7));
  return {
    id: "7e28eae1-f854-41e4-87b3-b582354b91ee",
    finishedAt: now.toISOString(),
    score: Math.floor(Math.random() * 100) + 1,
  };
}

export function makeDummyRadicalSessionTestQuestion(
  questionNum: number = 1,
): GetRadicalSessionTestQuestionResponseSchema {
  const questionId = "7e28eae1-f854-41e4-87b3-b582354b91ee";

  return [
    {
      count: 6,
      next: "https://example.com/question?questionNum=2",
      previous: null,
      id: questionId,
      payload: {
        type: "AUDIO-TO-LOGOGRAM" as const,
        question: "What logogram corresponds to the following audio?",
        audio: "https://dictionary.writtenchinese.com/sounds/ren2.mp3",
        alternatives: [
          { type: "TEXT" as const, payload: "人" },
          { type: "TEXT" as const, payload: "土" },
          { type: "TEXT" as const, payload: "木" },
          { type: "TEXT" as const, payload: "艹" },
          { type: "TEXT" as const, payload: "刂" },
        ],
        currAnswer: null,
      },
    },
    {
      count: 6,
      next: "https://example.com/question?questionNum=3",
      previous: "https://example.com/question?questionNum=1",
      id: questionId,
      payload: {
        type: "LOGOGRAM-TO-AUDIO" as const,
        question: "What pronounce corresponds the logogram 人?",
        alternatives: [
          {
            type: "AUDIO" as const,
            payload: "https://dictionary.writtenchinese.com/sounds/ren2.mp3",
          },
          {
            type: "AUDIO" as const,
            payload: "https://dictionary.writtenchinese.com/sounds/tu3.mp3",
          },
          {
            type: "AUDIO" as const,
            payload: "https://dictionary.writtenchinese.com/sounds/mu4.mp3",
          },
          {
            type: "AUDIO" as const,
            payload:
              "https://mandarintemple.com/wp-content/uploads/katemt_audio/c/cao/cao3.wav",
          },
          {
            type: "AUDIO" as const,
            payload:
              "https://mandarintemple.com/wp-content/uploads/katemt_audio/d/Dao/dao1.wav",
          },
        ],
        currAnswer: null,
      },
    },
    {
      count: 6,
      next: "https://example.com/question?questionNum=4",
      previous: "https://example.com/question?questionNum=2",
      id: questionId,
      payload: {
        type: "LOGOGRAM-TO-MEANING" as const,
        question: "What meaning corresponds to the logogram 人?",
        alternatives: [
          { type: "TEXT" as const, payload: "person" },
          { type: "TEXT" as const, payload: "earth" },
          { type: "TEXT" as const, payload: "tree" },
          { type: "TEXT" as const, payload: "grass" },
          { type: "TEXT" as const, payload: "knife, sword" },
        ],
        currAnswer: null,
      },
    },
    {
      count: 6,
      next: "https://example.com/question?questionNum=5",
      previous: "https://example.com/question?questionNum=3",
      id: questionId,
      payload: {
        type: "LOGOGRAM-TO-PINYIN" as const,
        question: "What pinyin corresponds to the logogram 人?",
        alternatives: [
          { type: "TEXT" as const, payload: "rén" },
          { type: "TEXT" as const, payload: "tǔ" },
          { type: "TEXT" as const, payload: "mù" },
          { type: "TEXT" as const, payload: "cǎo" },
          { type: "TEXT" as const, payload: "dāo" },
        ],
        currAnswer: null,
      },
    },
    {
      count: 6,
      next: "https://example.com/question?questionNum=6",
      previous: "https://example.com/question?questionNum=4",
      id: questionId,
      payload: {
        type: "MEANING-TO-LOGOGRAM" as const,
        question: 'What logogram corresponds to the mearning "person"?',
        alternatives: [
          { type: "TEXT" as const, payload: "人" },
          { type: "TEXT" as const, payload: "土" },
          { type: "TEXT" as const, payload: "木" },
          { type: "TEXT" as const, payload: "艹" },
          { type: "TEXT" as const, payload: "刂" },
        ],
        currAnswer: null,
      },
    },
    {
      count: 6,
      next: null,
      previous: "https://example.com/question?questionNum=5",
      id: questionId,
      payload: {
        type: "PINYIN-TO-LOGOGRAM" as const,
        question: 'What logogram corresponds to the mearning "rén"?',
        alternatives: [
          { type: "TEXT" as const, payload: "人" },
          { type: "TEXT" as const, payload: "土" },
          { type: "TEXT" as const, payload: "木" },
          { type: "TEXT" as const, payload: "艹" },
          { type: "TEXT" as const, payload: "刂" },
        ],
        currAnswer: null,
      },
    },
  ][questionNum - 1];
}

export function makeDummyRadicalSessionTestResult(
  id: string = "7e28eae1-f854-41e4-87b3-b582354b91ee",
): GetRadicalSessionTestResultResponseSchema {
  return {
    id,
    score: 83,
    questions: [
      {
        type: "AUDIO-TO-LOGOGRAM",
        question: "What logogram corresponds to the following audio?",
        audio: "https://dictionary.writtenchinese.com/sounds/ren2.mp3",
        alternatives: [
          { type: "TEXT", payload: "人" },
          { type: "TEXT", payload: "土" },
          { type: "TEXT", payload: "木" },
          { type: "TEXT", payload: "艹" },
          { type: "TEXT", payload: "刂" },
        ],
        currAnswer: "a",
        expectedAnswer: "a",
      },
      {
        type: "LOGOGRAM-TO-AUDIO",
        question: "What pronounce corresponds the logogram 人?",
        alternatives: [
          {
            type: "AUDIO",
            payload: "https://dictionary.writtenchinese.com/sounds/ren2.mp3",
          },
          {
            type: "AUDIO",
            payload: "https://dictionary.writtenchinese.com/sounds/tu3.mp3",
          },
          {
            type: "AUDIO",
            payload: "https://dictionary.writtenchinese.com/sounds/mu4.mp3",
          },
          {
            type: "AUDIO",
            payload:
              "https://mandarintemple.com/wp-content/uploads/katemt_audio/c/cao/cao3.wav",
          },
          {
            type: "AUDIO",
            payload:
              "https://mandarintemple.com/wp-content/uploads/katemt_audio/d/Dao/dao1.wav",
          },
        ],
        currAnswer: "b",
        expectedAnswer: "a",
      },
    ],
  };
}
