// 문장 안의 핵심 덩어리 표현(keyChunks)을 강조 표시
import { Fragment } from "react";

interface HighlightedTextProps {
  text: string;
  chunks: string[];
}

/** 정규식 특수문자 이스케이프 */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** "share ... on the screen"처럼 생략 기호가 있는 표현은 조각별로 강조 */
function toPatterns(chunks: string[]): string[] {
  return chunks
    .flatMap((chunk) => chunk.split("..."))
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
}

/** 핵심 표현을 <mark>로 감싼 문장 */
export function HighlightedText({ text, chunks }: HighlightedTextProps) {
  const patterns = toPatterns(chunks);
  if (patterns.length === 0) return <>{text}</>;
  const regex = new RegExp(`(${patterns.join("|")})`, "gi");
  const lowerSet = new Set(patterns.map((p) => p.replace(/\\/g, "").toLowerCase()));
  return (
    <>
      {text.split(regex).map((part, index) =>
        lowerSet.has(part.toLowerCase()) ? (
          <mark key={index} className="rounded bg-amber-200/70 px-0.5 text-inherit dark:bg-amber-500/30">
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
