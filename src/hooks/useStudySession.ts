// 학습 세션 상태: 대기열 진행, 뒤집기, 채점, "몰랐음" 카드 재출제
import { useCallback, useState } from "react";
import type { CardRef } from "@/lib/cards";
import { QUICK_SESSION_SIZE, REQUEUE_OFFSET } from "@/lib/constants";
import { interleave } from "@/lib/queue";
import { type Grade, needsRequeue } from "@/lib/srs";
import { useProgressStore } from "@/store/useProgressStore";
import { useDailyQueue } from "./useDailyQueue";

export type SessionPhase = "ready" | "studying" | "done";
export type SessionMode = "full" | "quick";
export type GradeCounts = Record<Grade, number>;

const EMPTY_COUNTS: GradeCounts = { again: 0, hard: 0, good: 0 };

/** 카드를 지정 위치 뒤에 다시 끼워 넣기 */
function requeue(queue: CardRef[], index: number, card: CardRef): CardRef[] {
  const position = Math.min(queue.length, index + 1 + REQUEUE_OFFSET);
  return [...queue.slice(0, position), card, ...queue.slice(position)];
}

/** 학습 세션 훅 */
export function useStudySession() {
  const daily = useDailyQueue();
  const gradeCard = useProgressStore((s) => s.gradeCard);
  const [phase, setPhase] = useState<SessionPhase>("ready");
  const [queue, setQueue] = useState<CardRef[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [counts, setCounts] = useState<GradeCounts>(EMPTY_COUNTS);

  // 지정한 카드들로 세션 시작 (오답 노트 등에서 사용)
  const startWith = useCallback((cards: CardRef[]) => {
    setQueue(cards);
    setIndex(0);
    setFlipped(false);
    setCounts(EMPTY_COUNTS);
    setPhase(cards.length > 0 ? "studying" : "done");
  }, []);

  // 오늘의 대기열로 세션 시작
  const start = useCallback(
    (mode: SessionMode) => {
      const all = interleave(daily.reviews, daily.news);
      startWith(mode === "quick" ? all.slice(0, QUICK_SESSION_SIZE) : all);
    },
    [daily, startWith],
  );

  const grade = useCallback(
    (value: Grade) => {
      const card = queue[index];
      if (!card) return;
      gradeCard(card.key, card.item, value);
      const updated = useProgressStore.getState().progress[card.key];
      const nextQueue = updated && needsRequeue(updated) ? requeue(queue, index, card) : queue;
      setQueue(nextQueue);
      setCounts((c) => ({ ...c, [value]: c[value] + 1 }));
      setFlipped(false);
      if (index + 1 >= nextQueue.length) setPhase("done");
      else setIndex(index + 1);
    },
    [queue, index, gradeCard],
  );

  return {
    phase,
    card: queue[index],
    position: index + 1,
    total: queue.length,
    flipped,
    flip: () => setFlipped(true),
    grade,
    start,
    startWith,
    counts,
    available: { reviews: daily.reviews.length, news: daily.news.length },
  };
}
