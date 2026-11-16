// 정답 문장을 단어별로 표시: 맞힌 단어는 초록, 빠지거나 틀린 단어는 빨강 밑줄
import { matchWords, toWords } from "@/lib/textMatch";
import { cn } from "@/lib/utils";

interface WordDiffProps {
  expected: string;
  actual: string;
}

/** 단어별 비교 결과 */
export function WordDiff({ expected, actual }: WordDiffProps) {
  const tokens = expected.split(/\s+/);
  const normalized = tokens.map((t) => toWords(t)[0] ?? "");
  const comparable = normalized.filter((w) => w.length > 0);
  const matched = matchWords(comparable, toWords(actual));
  let cursor = 0;
  return (
    <p className="text-lg leading-relaxed">
      {tokens.map((token, index) => {
        const ok = normalized[index] === "" ? true : matched[cursor++];
        return (
          <span key={index}>
            <span className={cn(ok ? "text-emerald-700 dark:text-emerald-300"
              : "text-rose-600 underline decoration-2 underline-offset-4 dark:text-rose-300")}>
              {token}
            </span>{" "}
          </span>
        );
      })}
    </p>
  );
}
