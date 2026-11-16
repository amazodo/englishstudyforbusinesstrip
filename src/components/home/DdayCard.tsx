"use client";

// D-Day 카운트와 연속 학습일
import { CalendarDays, Flame } from "lucide-react";
import { daysBetween, todayString } from "@/lib/dates";
import { computeStreak } from "@/lib/stats";
import { useProgressStore } from "@/store/useProgressStore";

/** D-Day 표기 문자열 */
function formatDday(days: number): string {
  if (days > 0) return `D-${days}`;
  if (days === 0) return "D-Day";
  return `D+${Math.abs(days)}`;
}

/** 방문일 카운트다운 카드 */
export function DdayCard() {
  const visitDate = useProgressStore((s) => s.settings.visitDate);
  const daily = useProgressStore((s) => s.daily);
  const today = todayString();
  const days = daysBetween(today, visitDate);
  const streak = computeStreak(daily, today);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl bg-primary p-4 text-primary-foreground">
        <p className="flex items-center gap-1 text-xs opacity-80">
          <CalendarDays className="size-3.5" aria-hidden /> 독일 방문 {visitDate}
        </p>
        <p className="mt-1 text-3xl font-bold">{formatDday(days)}</p>
      </div>
      <div className="rounded-2xl border p-4">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Flame className="size-3.5 text-orange-500" aria-hidden /> 연속 학습
        </p>
        <p className="mt-1 text-3xl font-bold">
          {streak}
          <span className="ml-1 text-base font-medium">일</span>
        </p>
      </div>
    </div>
  );
}
