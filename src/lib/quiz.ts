// 객관식 테스트 문제 생성: 오답 보기는 같은 카테고리/시나리오에서 우선 뽑아 변별력을 높인다.
import { QUIZ_OPTION_COUNT } from "./constants";
import { type CardRef, type Direction, type StudyItem, itemGroup, makeRef } from "./cards";

export type QuizKind = StudyItem["kind"];

export interface QuizQuestion {
  card: CardRef;
  prompt: string;
  options: string[];
  answerIndex: number;
}

/** 배열 섞기 (Fisher–Yates) */
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 방향에 따른 문제/정답 텍스트 */
export function questionTexts(item: StudyItem, direction: Direction): { prompt: string; answer: string } {
  const en = item.kind === "term" ? item.data.term : item.data.en;
  const ko = item.kind === "term" ? item.data.meaningKo : item.data.ko;
  return direction === "en2ko" ? { prompt: en, answer: ko } : { prompt: ko, answer: en };
}

/** 오답 보기 선택: 같은 그룹 → 나머지 순 */
function pickDistractors(target: StudyItem, pool: StudyItem[], direction: Direction): string[] {
  const answer = questionTexts(target, direction).answer;
  const others = pool.filter((i) => i.data.id !== target.data.id);
  const sameGroup = shuffle(others.filter((i) => itemGroup(i) === itemGroup(target)));
  const rest = shuffle(others.filter((i) => itemGroup(i) !== itemGroup(target)));
  const texts = [...sameGroup, ...rest]
    .map((i) => questionTexts(i, direction).answer)
    .filter((text) => text !== answer);
  return [...new Set(texts)].slice(0, QUIZ_OPTION_COUNT - 1);
}

/** 문제 하나 생성 */
function buildQuestion(target: StudyItem, pool: StudyItem[], direction: Direction): QuizQuestion {
  const { prompt, answer } = questionTexts(target, direction);
  const options = shuffle([answer, ...pickDistractors(target, pool, direction)]);
  return { card: makeRef(target, direction), prompt, options, answerIndex: options.indexOf(answer) };
}

/**
 * 문제 세트 생성
 * @param targets 출제 대상 항목
 * @param pool 오답 보기를 뽑을 전체 항목 (같은 종류)
 */
export function buildQuiz(
  targets: StudyItem[],
  pool: StudyItem[],
  direction: Direction,
  count: number,
): QuizQuestion[] {
  return shuffle(targets)
    .slice(0, count)
    .map((target) => buildQuestion(target, pool, direction));
}
