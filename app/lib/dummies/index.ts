import type {
  Radical,
  RadicalSession,
  RadicalSessionTest,
  UserStatistics,
} from "~/types";
export {
  makeDummyRadicalSessionTestQuestion,
  makeDummyRadicalSessionTestResult,
} from "./radicalTests";

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
    id: "人",
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
