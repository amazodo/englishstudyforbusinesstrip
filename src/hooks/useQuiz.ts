// 객관식 테스트 상태 관리
import { useCallback, useState } from "react";
import { type Direction, cardKey, primaryDirection } from "@/lib/cards";
import { QUIZ_QUESTION_COUNT } from "@/lib/constants";
import { type QuizKind, type QuizQuestion, buildQuiz } from "@/lib/quiz";
import { filteredItems } from "@/lib/srs";
import { useProgressStore } from "@/store/useProgressStore";

export type QuizScope = "learned" | "all";
export type QuizPhase = "setup" | "playing" | "result";

export interface QuizConfig {
  kind: QuizKind;
  direction: Direction;
  scope: QuizScope;
}

export interface QuizAnswer {
  question: QuizQuestion;
  chosen: number;
}

/** 테스트 훅 */
export function useQuiz() {
  const filter = useProgressStore((s) => s.trackFilter);
  const recordQuizAnswer = useProgressStore((s) => s.recordQuizAnswer);
  const [phase, setPhase] = useState<QuizPhase>("setup");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(
    (config: QuizConfig) => {
      const progress = useProgressStore.getState().progress;
      const pool = filteredItems(filter, true).filter((i) => i.kind === config.kind);
      const targets =
        config.scope === "all"
          ? pool
          : pool.filter((i) => progress[cardKey(i.data.id, primaryDirection(i))]);
      if (targets.length === 0) {
        setError("아직 학습한 카드가 없습니다. 먼저 학습하거나 범위를 '전체'로 바꿔 주세요.");
        return;
      }
      setError(null);
      setQuestions(buildQuiz(targets, pool, config.direction, QUIZ_QUESTION_COUNT));
      setAnswers([]);
      setPhase("playing");
    },
    [filter],
  );

  // 답을 기록하고 다음 문제로 (마지막 문제면 결과 화면)
  const answer = useCallback(
    (question: QuizQuestion, chosen: number) => {
      recordQuizAnswer(question.card.key, chosen === question.answerIndex);
      setAnswers((prev) => [...prev, { question, chosen }]);
      if (answers.length + 1 >= questions.length) setPhase("result");
    },
    [recordQuizAnswer, answers.length, questions.length],
  );

  return {
    phase,
    questions,
    answers,
    current: questions[answers.length],
    error,
    start,
    answer,
    reset: () => setPhase("setup"),
  };
}
