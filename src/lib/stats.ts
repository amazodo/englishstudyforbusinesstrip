// 홈·통계 화면용 집계 함수
import { MAX_BOX } from "./constants";
import { type StudyItem, cardKey, itemGroup, primaryDirection } from "./cards";
import { addDays } from "./dates";
import type { ProgressMap } from "./srs";

export interface GroupStat {
  group: string;
  total: number;
  started: number;
  mastered: number;
}

/** 연속 학습일 (오늘 아직 안 했으면 어제까지 기준) */
export function computeStreak(daily: Record<string, { reviewed: number }>, today: string): number {
  let cursor = (daily[today]?.reviewed ?? 0) > 0 ? today : addDays(today, -1);
  let streak = 0;
  while ((daily[cursor]?.reviewed ?? 0) > 0) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** 항목의 기본 방향 진도 박스 (미시작이면 -1) */
function primaryBox(item: StudyItem, progress: ProgressMap): number {
  return progress[cardKey(item.data.id, primaryDirection(item))]?.box ?? -1;
}

/** 카테고리/시나리오별 시작·숙지 개수 (콘텐츠 순서 유지) */
export function statsByGroup(items: StudyItem[], progress: ProgressMap): GroupStat[] {
  const map = new Map<string, GroupStat>();
  for (const item of items) {
    const group = itemGroup(item);
    const stat = map.get(group) ?? { group, total: 0, started: 0, mastered: 0 };
    const box = primaryBox(item, progress);
    stat.total += 1;
    if (box >= 0) stat.started += 1;
    if (box >= MAX_BOX) stat.mastered += 1;
    map.set(group, stat);
  }
  return [...map.values()];
}

/** 전체 합계 */
export function sumStats(stats: GroupStat[]): Omit<GroupStat, "group"> {
  return stats.reduce(
    (acc, s) => ({
      total: acc.total + s.total,
      started: acc.started + s.started,
      mastered: acc.mastered + s.mastered,
    }),
    { total: 0, started: 0, mastered: 0 },
  );
}
