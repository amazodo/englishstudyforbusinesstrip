"use client";

// 학습 시작 화면: 전체 학습 / 5분만 하기
import { Timer } from "lucide-react";
import { TrackFilterTabs } from "@/components/app/TrackFilterTabs";
import { QUICK_SESSION_SIZE } from "@/lib/constants";
import type { SessionMode } from "@/hooks/useStudySession";

interface SessionStartProps {
  reviews: number;
  news: number;
  onStart: (mode: SessionMode) => void;
}

/** 세션 시작 선택 */
export function SessionStart({ reviews, news, onStart }: SessionStartProps) {
  const total = reviews + news;
  return (
    <div className="space-y-4">
      <TrackFilterTabs />
      <div className="rounded-2xl border p-5 text-center">
        <p className="text-sm text-muted-foreground">오늘 학습할 카드</p>
        <p className="mt-1 text-4xl font-bold">{total}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          복습 {reviews} · 새 카드 {news}
        </p>
      </div>
      <button
        type="button"
        disabled={total === 0}
        onClick={() => onStart("full")}
        className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground disabled:opacity-40"
      >
        전체 학습 시작
      </button>
      <button
        type="button"
        disabled={total === 0}
        onClick={() => onStart("quick")}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border text-base font-semibold disabled:opacity-40"
      >
        <Timer className="size-5" aria-hidden /> 5분만 하기 ({Math.min(total, QUICK_SESSION_SIZE)}장)
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        💡 카드 앞면을 보고 <b>먼저 떠올리거나 소리 내어 말한 뒤</b> 뒤집으세요. 바로 뒤집으면 기억 효과가 크게
        줄어듭니다.
      </p>
    </div>
  );
}
