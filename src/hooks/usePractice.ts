// 연습 모드 공통 진행 상태: 설정 → 문제 풀이 → 결과
import { useCallback, useState } from "react";
import type { CardRef } from "@/lib/cards";
import { useProgressStore } from "@/store/useProgressStore";

export type PracticePhase = "setup" | "playing" | "result";

export interface PracticeOutcome<Q> {
  question: Q;
  correct: boolean;
  userAnswer: string;
}

const EMPTY_MESSAGE = "출제할 카드가 없습니다. 먼저 학습하거나 범위를 '전체 카드'로 바꿔 주세요.";

/** 연습 진행 훅 */
export function usePractice<Q extends { card: CardRef }>() {
  const recordQuizAnswer = useProgressStore((s) => s.recordQuizAnswer);
  const [phase, setPhase] = useState<PracticePhase>("setup");
  const [questions, setQuestions] = useState<Q[]>([]);
  const [outcomes, setOutcomes] = useState<PracticeOutcome<Q>[]>([]);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback((next: Q[]) => {
    if (next.length === 0) {
      setError(EMPTY_MESSAGE);
      return;
    }
    setError(null);
    setQuestions(next);
    setOutcomes([]);
    setPhase("playing");
  }, []);

  // 답을 기록하고 다음 문제로 (마지막이면 결과 화면)
  const submit = useCallback(
    (question: Q, correct: boolean, userAnswer: string) => {
      recordQuizAnswer(question.card.key, correct);
      setOutcomes((prev) => [...prev, { question, correct, userAnswer }]);
      if (outcomes.length + 1 >= questions.length) setPhase("result");
    },
    [recordQuizAnswer, outcomes.length, questions.length],
  );

  return {
    phase,
    error,
    current: questions[outcomes.length],
    position: outcomes.length + 1,
    total: questions.length,
    outcomes,
    start,
    submit,
    reset: () => setPhase("setup"),
  };
}
