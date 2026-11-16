"use client";

// 카드 상세의 학습 상태 (박스, 정답/오답 횟수, 다음 복습일)
import { cardKey, primaryDirection, type StudyItem } from "@/lib/cards";
import { MAX_BOX } from "@/lib/constants";
import { useHydrated } from "@/hooks/useHydrated";
import { useProgressStore } from "@/store/useProgressStore";

/** 학습 상태 한 줄 */
export function CardProgressInfo({ item }: { item: StudyItem }) {
  const hydrated = useHydrated();
  const progress = useProgressStore((s) => s.progress[cardKey(item.data.id, primaryDirection(item))]);
  if (!hydrated) return null;
  if (!progress) return <p className="text-xs text-muted-foreground">아직 학습하지 않은 카드</p>;
  return (
    <p className="text-xs text-muted-foreground">
      Box {progress.box}/{MAX_BOX} · 정답 {progress.correctCount} · 오답 {progress.wrongCount} · 다음 복습{" "}
      {progress.nextReviewDate}
    </p>
  );
}
