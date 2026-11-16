// 입력한 영어와 정답 비교: 대소문자·문장부호·둥근 따옴표 차이는 무시하고 단어 단위로 비교한다.

const CURLY_APOSTROPHES = /[’‘`]/g;
const NON_WORD_CHARS = /[^a-z0-9'/-]/g;
const EDGE_APOSTROPHES = /^'+|'+$/g;

/** 단어 하나 정규화 ("Checked'?" → "checked") */
function normalizeToken(token: string): string {
  return token
    .replace(CURLY_APOSTROPHES, "'")
    .toLowerCase()
    .replace(NON_WORD_CHARS, "")
    .replace(EDGE_APOSTROPHES, "");
}

/** 문장을 정규화된 단어 배열로 */
export function toWords(text: string): string[] {
  return text.split(/\s+/).map(normalizeToken).filter((w) => w.length > 0);
}

/** 정규화 후 완전히 같은지 */
export function isSameText(expected: string, actual: string): boolean {
  return toWords(expected).join(" ") === toWords(actual).join(" ");
}

/** LCS 길이 표 */
function lcsTable(a: string[], b: string[]): number[][] {
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  return dp;
}

/** 정답 단어마다 입력에 순서대로 들어 있는지 표시 (최장 공통 부분열) */
export function matchWords(expected: string[], actual: string[]): boolean[] {
  const dp = lcsTable(expected, actual);
  const matched = new Array<boolean>(expected.length).fill(false);
  let i = 0;
  let j = 0;
  while (i < expected.length && j < actual.length) {
    if (expected[i] === actual[j]) {
      matched[i] = true;
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i += 1;
    else j += 1;
  }
  return matched;
}

/** 정답 대비 일치율 (0~1) */
export function similarity(expected: string, actual: string): number {
  const words = toWords(expected);
  if (words.length === 0) return 0;
  return matchWords(words, toWords(actual)).filter(Boolean).length / words.length;
}
