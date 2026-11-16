// 빌드 전 콘텐츠 검증: 스키마, ID 중복, 참조 무결성, ASPICE·SOTIF 비중(20% 미만)을 확인한다.
// 실행: node scripts/validate-content.ts (Node 24 타입 스트리핑 사용)
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  confusableListSchema,
  sentenceListSchema,
  termListSchema,
} from "../src/lib/schema.ts";

const CONTENT_DIR = join(import.meta.dirname, "..", "src", "content");
const MAX_SUPPORT_RATIO = 0.2;
const PERCENT = 100;
// 의사소통 카테고리는 기술 콘텐츠 비중 계산에서 제외
const COMMUNICATION_CATEGORIES = new Set(["A9", "A12", "A13"]);

/** 폴더 안의 모든 JSON 배열을 합쳐서 읽기 */
function readDir(dir: string): unknown[] {
  return readdirSync(join(CONTENT_DIR, dir))
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => JSON.parse(readFileSync(join(CONTENT_DIR, dir, f), "utf8")) as unknown[]);
}

/** 중복 ID 찾기 */
function findDuplicates(ids: string[]): string[] {
  const seen = new Set<string>();
  return ids.filter((id) => (seen.has(id) ? true : (seen.add(id), false)));
}

function fail(message: string): never {
  process.stderr.write(`❌ ${message}\n`);
  process.exit(1);
}

/** 폴더의 JSON 파일이 모두 src/content/index.ts에 등록되어 있는지 확인 */
function checkIndexed(dir: string): void {
  const indexSource = readFileSync(join(CONTENT_DIR, "index.ts"), "utf8");
  const missing = readdirSync(join(CONTENT_DIR, dir))
    .filter((f) => f.endsWith(".json") && !indexSource.includes(`./${dir}/${f}`));
  if (missing.length > 0) fail(`index.ts에 등록되지 않은 파일: ${dir}/${missing.join(", ")}`);
}

checkIndexed("terms");
checkIndexed("sentences");

const terms = termListSchema.parse(readDir("terms"));
const sentences = sentenceListSchema.parse(readDir("sentences"));
const confusables = confusableListSchema.parse(
  JSON.parse(readFileSync(join(CONTENT_DIR, "confusables.json"), "utf8")),
);

const allIds = [...terms, ...sentences, ...confusables].map((x) => x.id);
const duplicates = findDuplicates(allIds);
if (duplicates.length > 0) fail(`중복 ID: ${duplicates.join(", ")}`);

const idSet = new Set(allIds);
const brokenRefs = [
  ...terms.flatMap((t) => t.confusableIds ?? []),
  ...sentences.flatMap((s) => s.relatedTermIds ?? []),
].filter((id) => !idSet.has(id));
if (brokenRefs.length > 0) fail(`존재하지 않는 참조 ID: ${[...new Set(brokenRefs)].join(", ")}`);

/** ASPICE+SOTIF 비중 (상한 이상이면 실패) */
function supportRatio(label: string, items: { domain: string }[]): number {
  const support = items.filter((x) => x.domain === "aspice" || x.domain === "sotif");
  const ratio = items.length === 0 ? 0 : support.length / items.length;
  if (ratio >= MAX_SUPPORT_RATIO) {
    fail(`${label} ASPICE+SOTIF 비중 ${(ratio * PERCENT).toFixed(1)}% (상한 ${MAX_SUPPORT_RATIO * PERCENT}% 미만)`);
  }
  return ratio;
}

const termRatio = supportRatio(
  "용어",
  terms.filter((t) => t.track === "audit" && !COMMUNICATION_CATEGORIES.has(t.category)),
);
const sentenceRatio = supportRatio(
  "문장",
  sentences.filter((s) => s.track === "audit"),
);

process.stdout.write(
  `✅ 콘텐츠 검증 통과 — 용어 ${terms.length}, 문장 ${sentences.length}, 혼동 쌍 ${confusables.length}, ` +
    `ASPICE+SOTIF 비중 용어 ${(termRatio * PERCENT).toFixed(1)}% / 문장 ${(sentenceRatio * PERCENT).toFixed(1)}%\n`,
);
