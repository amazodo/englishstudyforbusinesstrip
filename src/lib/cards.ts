// 용어·문장을 하나의 "학습 카드"로 다루기 위한 모델과 조회 함수
import { allSentences, allTerms } from "@/content";
import type { Priority, Sentence, Term, Track } from "./schema";

export type Direction = "en2ko" | "ko2en";

export type StudyItem =
  | { kind: "term"; data: Term }
  | { kind: "sentence"; data: Sentence };

/** 실제로 복습되는 단위: 항목 + 방향 */
export interface CardRef {
  item: StudyItem;
  direction: Direction;
  key: string;
}

export const allItems: StudyItem[] = [
  ...allTerms.map((data): StudyItem => ({ kind: "term", data })),
  ...allSentences.map((data): StudyItem => ({ kind: "sentence", data })),
];

const itemById = new Map(allItems.map((item) => [item.data.id, item]));

/** 진도 저장소의 키 */
export function cardKey(id: string, direction: Direction): string {
  return `${id}:${direction}`;
}

/** 항목의 기본(처음 학습하는) 방향: 용어는 영→한, 문장은 한→영 */
export function primaryDirection(item: StudyItem): Direction {
  return item.kind === "term" ? "en2ko" : "ko2en";
}

/** 카드 참조 생성 */
export function makeRef(item: StudyItem, direction: Direction): CardRef {
  return { item, direction, key: cardKey(item.data.id, direction) };
}

/** 진도 저장소 키("T-A1-001:en2ko")로 카드 참조 복원 */
export function refFromKey(key: string): CardRef | undefined {
  const [id, direction] = key.split(":");
  const item = itemById.get(id);
  if (!item || (direction !== "en2ko" && direction !== "ko2en")) return undefined;
  return makeRef(item, direction);
}

/** id로 항목 조회 */
export function getItem(id: string): StudyItem | undefined {
  return itemById.get(id);
}

export function itemTrack(item: StudyItem): Track {
  return item.data.track;
}

export function itemPriority(item: StudyItem): Priority {
  return item.data.priority;
}

/** 카테고리(용어) 또는 시나리오(문장) 코드 */
export function itemGroup(item: StudyItem): string {
  return item.kind === "term" ? item.data.category : item.data.scenario;
}

/** 목록·검색에 표시할 영어/한국어 대표 텍스트 */
export function itemTexts(item: StudyItem): { en: string; ko: string } {
  return item.kind === "term"
    ? { en: item.data.term, ko: item.data.meaningKo }
    : { en: item.data.en, ko: item.data.ko };
}
