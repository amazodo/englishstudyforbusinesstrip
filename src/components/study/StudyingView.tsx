"use client";

// 플래시카드 학습 진행 화면 (오늘의 학습·오답 노트 공통)
import { Flashcard } from "@/components/card/Flashcard";
import { GradeButtons } from "@/components/card/GradeButtons";
import { Progress } from "@/components/ui/progress";
import type { useStudySession } from "@/hooks/useStudySession";
import { PERCENT } from "@/lib/constants";

type Session = ReturnType<typeof useStudySession>;

/** 진행 막대 + 카드 + 하단 버튼 */
export function StudyingView({ session }: { session: Session }) {
  const { card, position, total, flipped, flip, grade } = session;
  if (!card) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Progress value={(position / total) * PERCENT} className="flex-1" />
        <span className="text-sm tabular-nums text-muted-foreground">
          {position}/{total}
        </span>
      </div>
      <Flashcard card={card} flipped={flipped} onFlip={flip} />
      <div className="sticky bottom-20 z-10 bg-background/90 py-2 backdrop-blur">
        {flipped ? (
          <GradeButtons onGrade={grade} />
        ) : (
          <button type="button" onClick={flip}
            className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground">
            정답 보기
          </button>
        )}
      </div>
    </div>
  );
}
