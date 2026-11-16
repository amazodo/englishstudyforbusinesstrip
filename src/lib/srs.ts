// 간격 반복(라이트너 5단계) 엔진: 채점 결과로 다음 복습일을 계산하고 오늘의 학습 대기열을 만든다.
import {
  KO2EN_UNLOCK_BOX,
  MAX_BOX,
  SRS_INTERVAL_DAYS,
} from "./constants";
import { addDays } from "./dates";
import {
  type CardRef,
  type StudyItem,
  allItems,
  cardKey,
  makeRef,
  primaryDirection,
} from "./cards";
import type { Track } from "./schema";

export type Grade = "again" | "hard" | "good";
export type Box = 0 | 1 | 2 | 3 | 4;
export type TrackFilter = Track | "all";

export interface CardProgress {
  box: Box;
  nextReviewDate: string;
  correctCount: number;
  wrongCount: number;
  lastReviewedDate: string;
}

export type ProgressMap = Record<string, CardProgress>;

const BOXES: readonly Box[] = [0, 1, 2, 3, 4];

/** 박스 번호를 0~MAX_BOX 범위로 고정 */
function clampBox(value: number): Box {
  return BOXES[Math.min(Math.max(value, 0), MAX_BOX)] ?? 0;
}

/** 채점 결과로 새 진도 계산 (몰랐음→Box 0, 애매함→유지, 알았음→한 단계 위) */
export function nextProgress(
  prev: CardProgress | undefined,
  grade: Grade,
  today: string,
): CardProgress {
  const currentBox = prev?.box ?? 0;
  const box =
    grade === "again" ? 0 : grade === "hard" ? currentBox : clampBox(currentBox + 1);
  return {
    box,
    nextReviewDate: addDays(today, SRS_INTERVAL_DAYS[box]),
    correctCount: (prev?.correctCount ?? 0) + (grade === "good" ? 1 : 0),
    wrongCount: (prev?.wrongCount ?? 0) + (grade === "again" ? 1 : 0),
    lastReviewedDate: today,
  };
}

/** 오늘 복습해야 하는 카드인지 */
export function isDue(progress: CardProgress, today: string): boolean {
  return progress.nextReviewDate <= today;
}

/** 세션 안에서 다시 보여줘야 하는 채점인지 (Box 0으로 남은 경우) */
export function needsRequeue(progress: CardProgress): boolean {
  return progress.box === 0;
}

/** 트랙 필터·우선순위 조건에 맞는 항목인지 */
export function matchesFilter(
  item: StudyItem,
  filter: TrackFilter,
  includeLowPriority: boolean,
): boolean {
  const trackOk = filter === "all" || item.data.track === filter;
  const priorityOk = includeLowPriority || item.data.priority < 3;
  return trackOk && priorityOk;
}

/** 이미 시작한 카드들 (용어는 숙달되면 한→영 카드가 추가로 열림) */
export function startedRefs(items: StudyItem[], progress: ProgressMap): CardRef[] {
  const refs: CardRef[] = [];
  for (const item of items) {
    const primary = makeRef(item, primaryDirection(item));
    const primaryProgress = progress[primary.key];
    if (!primaryProgress) continue;
    refs.push(primary);
    if (item.kind !== "term") continue;
    const reverseKey = cardKey(item.data.id, "ko2en");
    if (progress[reverseKey] || primaryProgress.box >= KO2EN_UNLOCK_BOX) {
      refs.push(makeRef(item, "ko2en"));
    }
  }
  return refs;
}

/** 아직 한 번도 학습하지 않은 항목 (콘텐츠 순서 = 학습 로드맵 순서) */
export function unstartedItems(items: StudyItem[], progress: ProgressMap): StudyItem[] {
  return items.filter((item) => !progress[cardKey(item.data.id, primaryDirection(item))]);
}

/** 필터에 맞는 전체 항목 */
export function filteredItems(filter: TrackFilter, includeLowPriority: boolean): StudyItem[] {
  return allItems.filter((item) => matchesFilter(item, filter, includeLowPriority));
}
