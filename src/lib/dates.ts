// 날짜 유틸: 복습일은 시간대 문제를 피하려고 로컬 날짜 문자열(YYYY-MM-DD)로 저장한다.

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const PAD_LENGTH = 2;

/** Date를 로컬 기준 YYYY-MM-DD 문자열로 변환 */
export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(PAD_LENGTH, "0");
  const d = String(date.getDate()).padStart(PAD_LENGTH, "0");
  return `${y}-${m}-${d}`;
}

/** 오늘 날짜 문자열 */
export function todayString(): string {
  return toDateString(new Date());
}

/** YYYY-MM-DD 문자열을 로컬 자정 Date로 변환 */
function parseDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** 날짜 문자열에 일수를 더한 날짜 문자열 */
export function addDays(value: string, days: number): string {
  const date = parseDate(value);
  date.setDate(date.getDate() + days);
  return toDateString(date);
}

/** from에서 to까지의 일수 (to가 미래면 양수) */
export function daysBetween(from: string, to: string): number {
  return Math.round((parseDate(to).getTime() - parseDate(from).getTime()) / MS_PER_DAY);
}
