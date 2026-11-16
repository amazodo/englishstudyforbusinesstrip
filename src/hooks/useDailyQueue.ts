// 현재 진도·설정으로 오늘의 학습 대기열을 계산하는 훅
import { useMemo } from "react";
import { todayString } from "@/lib/dates";
import { type DailyQueue, buildDailyQueue } from "@/lib/queue";
import { EMPTY_DAILY, useProgressStore } from "@/store/useProgressStore";

/** 오늘 복습할 카드와 새 카드 목록 */
export function useDailyQueue(): DailyQueue {
  const progress = useProgressStore((s) => s.progress);
  const settings = useProgressStore((s) => s.settings);
  const daily = useProgressStore((s) => s.daily);
  const filter = useProgressStore((s) => s.trackFilter);

  return useMemo(() => {
    const today = todayString();
    return buildDailyQueue({
      progress,
      settings,
      filter,
      todayNew: daily[today] ?? EMPTY_DAILY,
      today,
    });
  }, [progress, settings, daily, filter]);
}
