// 오늘의 학습 대기열 생성: 복습 카드 + 새 카드(하루 상한, 트랙 비율 적용)를 섞는다.
import { type CardRef, type StudyItem, makeRef, primaryDirection } from "./cards";
import {
  type ProgressMap,
  type TrackFilter,
  filteredItems,
  isDue,
  startedRefs,
  unstartedItems,
} from "./srs";

export interface QueueSettings {
  newTermsPerDay: number;
  newSentencesPerDay: number;
  auditRatio: number;
  includeLowPriority: boolean;
}

export interface DailyNewCount {
  newTerms: number;
  newSentences: number;
}

export interface QueueInput {
  progress: ProgressMap;
  settings: QueueSettings;
  filter: TrackFilter;
  todayNew: DailyNewCount;
  today: string;
}

export interface DailyQueue {
  reviews: CardRef[];
  news: CardRef[];
}

/** 오늘 복습할 카드 (낮은 박스 = 덜 외운 카드부터) */
function dueReviews(items: StudyItem[], input: QueueInput): CardRef[] {
  return startedRefs(items, input.progress)
    .filter((ref) => {
      const p = input.progress[ref.key];
      return p === undefined || isDue(p, input.today);
    })
    .sort((a, b) => (input.progress[a.key]?.box ?? 0) - (input.progress[b.key]?.box ?? 0));
}

/** 트랙 비율에 맞춰 새 항목 선택 (한쪽이 모자라면 다른 쪽으로 채움) */
function pickByRatio(candidates: StudyItem[], count: number, auditRatio: number): StudyItem[] {
  if (count <= 0) return [];
  const audit = candidates.filter((i) => i.data.track === "audit");
  const travel = candidates.filter((i) => i.data.track === "travel");
  const auditTarget = Math.min(audit.length, Math.round(count * auditRatio));
  const travelTarget = Math.min(travel.length, count - auditTarget);
  const auditFinal = Math.min(audit.length, count - travelTarget);
  return [...audit.slice(0, auditFinal), ...travel.slice(0, travelTarget)];
}

/** 오늘 새로 배울 카드 */
function newCards(items: StudyItem[], input: QueueInput): CardRef[] {
  const fresh = unstartedItems(items, input.progress);
  const { settings, todayNew, filter } = input;
  const ratio = filter === "all" ? settings.auditRatio : filter === "audit" ? 1 : 0;
  const terms = pickByRatio(
    fresh.filter((i) => i.kind === "term"),
    settings.newTermsPerDay - todayNew.newTerms,
    ratio,
  );
  const sentences = pickByRatio(
    fresh.filter((i) => i.kind === "sentence"),
    settings.newSentencesPerDay - todayNew.newSentences,
    ratio,
  );
  return interleave(terms, sentences).map((item) => makeRef(item, primaryDirection(item)));
}

/** 두 배열을 번갈아 섞기 */
export function interleave<T>(a: T[], b: T[]): T[] {
  const result: T[] = [];
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i += 1) {
    if (i < a.length) result.push(a[i]);
    if (i < b.length) result.push(b[i]);
  }
  return result;
}

/** 오늘의 대기열 계산 */
export function buildDailyQueue(input: QueueInput): DailyQueue {
  const items = filteredItems(input.filter, input.settings.includeLowPriority);
  return { reviews: dueReviews(items, input), news: newCards(items, input) };
}
