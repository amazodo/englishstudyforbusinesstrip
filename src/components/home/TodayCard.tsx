"use client";

// 오늘 할 일: 복습 수, 새 카드 수, 학습 시작 버튼
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDailyQueue } from "@/hooks/useDailyQueue";
import { todayString } from "@/lib/dates";
import { EMPTY_DAILY, useProgressStore } from "@/store/useProgressStore";

/** 숫자 + 라벨 */
function Count({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/** 오늘의 학습 카드 */
export function TodayCard() {
  const { reviews, news } = useDailyQueue();
  const doneToday = useProgressStore((s) => (s.daily[todayString()] ?? EMPTY_DAILY).reviewed);
  const remaining = reviews.length + news.length;

  return (
    <div className="space-y-4 rounded-2xl border p-4">
      <div className="grid grid-cols-3 divide-x">
        <Count value={reviews.length} label="복습" />
        <Count value={news.length} label="새 카드" />
        <Count value={doneToday} label="오늘 학습함" />
      </div>
      {remaining > 0 ? (
        <Link
          href="/study/"
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary text-base font-semibold text-primary-foreground"
        >
          오늘 학습 시작 <ArrowRight className="size-5" aria-hidden />
        </Link>
      ) : (
        <p className="rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
          🎉 오늘 분량을 모두 마쳤습니다! 테스트로 실력을 확인해 보세요.
        </p>
      )}
    </div>
  );
}
