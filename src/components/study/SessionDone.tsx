"use client";

// 세션 완료 요약
import Link from "next/link";
import { Trophy } from "lucide-react";
import type { GradeCounts } from "@/hooks/useStudySession";

interface SessionDoneProps {
  counts: GradeCounts;
  remaining: number;
  onRestart: () => void;
}

/** 완료 화면 */
export function SessionDone({ counts, remaining, onRestart }: SessionDoneProps) {
  const total = counts.again + counts.hard + counts.good;
  return (
    <div className="space-y-5 text-center">
      <Trophy className="mx-auto size-14 text-amber-500" aria-hidden />
      <div>
        <p className="text-2xl font-bold">{total > 0 ? "수고하셨습니다!" : "오늘 할 카드가 없습니다"}</p>
        {total > 0 && <p className="text-sm text-muted-foreground">이번 세션에서 {total}장을 학습했습니다.</p>}
      </div>
      {total > 0 && (
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="rounded-xl bg-rose-50 p-3 dark:bg-rose-500/15">몰랐음 {counts.again}</div>
          <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-500/15">애매함 {counts.hard}</div>
          <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/15">알았음 {counts.good}</div>
        </div>
      )}
      {remaining > 0 && (
        <button
          type="button"
          onClick={onRestart}
          className="min-h-14 w-full rounded-xl bg-primary font-semibold text-primary-foreground"
        >
          남은 {remaining}장 계속하기
        </button>
      )}
      <Link href="/quiz/" className="flex min-h-14 items-center justify-center rounded-xl border font-semibold">
        테스트 해보기
      </Link>
    </div>
  );
}
