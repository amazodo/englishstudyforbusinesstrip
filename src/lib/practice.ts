// 연습 모드(빈칸·받아쓰기·말하기) 공통: 출제 대상 선택과 문제 생성
import { type CardRef, type StudyItem, cardKey, makeRef, primaryDirection } from "./cards";
import { shuffle } from "./quiz";
import { type ProgressMap, type TrackFilter, filteredItems } from "./srs";

export type PracticeScope = "learned" | "all";
export type PracticeKind = StudyItem["kind"];

/** 출장 독일어 카테고리는 영어 TTS·입력 비교가 맞지 않으므로 제외 */
const NON_ENGLISH_CATEGORIES = new Set(["B6"]);
/** 빈칸이 너무 길면 폰으로 입력하기 어려우므로 단어 수 상한 */
const MAX_BLANK_WORDS = 5;

export interface PracticeQuery {
  filter: TrackFilter;
  scope: PracticeScope;
  kind: PracticeKind;
  progress: ProgressMap;
}

/** 조건에 맞는 출제 대상 항목 */
export function practiceItems({ filter, scope, kind, progress }: PracticeQuery): StudyItem[] {
  return filteredItems(filter, true).filter((item) => {
    if (item.kind !== kind) return false;
    if (item.kind === "term" && NON_ENGLISH_CATEGORIES.has(item.data.category)) return false;
    return scope === "all" || Boolean(progress[cardKey(item.data.id, primaryDirection(item))]);
  });
}

export interface ClozeQuestion {
  card: CardRef;
  before: string;
  answer: string;
  after: string;
  hintKo: string;
}

/** 빈칸 후보: 용어는 예문 속 용어, 문장은 핵심 덩어리 표현 */
function clozeSource(item: StudyItem): { text: string; hintKo: string; targets: string[] } {
  if (item.kind === "term") {
    const { example, term, meaningKo } = item.data;
    return { text: example.en, hintKo: `${example.ko} (${meaningKo})`, targets: [term] };
  }
  const targets = item.data.keyChunks.filter((chunk) => !chunk.includes("..."));
  return { text: item.data.en, hintKo: item.data.ko, targets };
}

/** 빈칸 문제 하나 (만들 수 없으면 null) */
export function buildCloze(item: StudyItem): ClozeQuestion | null {
  const { text, hintKo, targets } = clozeSource(item);
  const lower = text.toLowerCase();
  const spans = targets
    .filter((t) => t.split(/\s+/).length <= MAX_BLANK_WORDS)
    .map((t) => [lower.indexOf(t.toLowerCase()), t.length] as const)
    .filter(([start]) => start >= 0);
  const picked = shuffle([...spans])[0];
  if (!picked) return null;
  const [start, length] = picked;
  return {
    card: makeRef(item, primaryDirection(item)),
    before: text.slice(0, start),
    answer: text.slice(start, start + length),
    after: text.slice(start + length),
    hintKo,
  };
}

export interface ListenQuestion {
  card: CardRef;
  text: string;
  hintKo: string;
}

/** 받아쓰기·말하기 문제 하나 */
export function buildListen(item: StudyItem): ListenQuestion {
  return item.kind === "term"
    ? { card: makeRef(item, primaryDirection(item)), text: item.data.term, hintKo: item.data.meaningKo }
    : { card: makeRef(item, primaryDirection(item)), text: item.data.en, hintKo: item.data.ko };
}

/** 무작위로 count개 문제 생성 (만들 수 없는 항목은 건너뜀) */
export function sampleQuestions<Q>(items: StudyItem[], count: number, build: (i: StudyItem) => Q | null): Q[] {
  const result: Q[] = [];
  for (const item of shuffle(items)) {
    const question = build(item);
    if (question) result.push(question);
    if (result.length >= count) break;
  }
  return result;
}
