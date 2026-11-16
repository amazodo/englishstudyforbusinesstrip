"use client";

// 연습 결과: 점수 + 틀린 문제 (정답 / 내 답) + 카드 상세 링크
import Link from "next/link";
import { PERCENT } from "@/lib/constants";

export interface ResultRow {
  key: string;
  id: string;
  prompt: string;
  correctAnswer: string;
  userAnswer: string;
  correct: boolean;
}

interface PracticeResultViewProps {
  rows: ResultRow[];
  onRetry: () => void;
}

/** 틀린 문제 한 줄 */
function WrongRow({ row }: { row: ResultRow }) {
  return (
    <li>
      <Link href={`/card/?id=${row.id}`} className="block space-y-0.5 rounded-xl border p-3 text-sm">
        <p className="text-muted-foreground">{row.prompt}</p>
        <p className="font-medium text-emerald-700 dark:text-emerald-300">✓ {row.correctAnswer}</p>
        {row.userAnswer && <p className="text-rose-700 dark:text-rose-300">✗ {row.userAnswer}</p>}
      </Link>
    </li>
  );
}

/** 결과 화면 */
export function PracticeResultView({ rows, onRetry }: PracticeResultViewProps) {
  const wrong = rows.filter((r) => !r.correct);
  const score = rows.length === 0 ? 0 : Math.round(((rows.length - wrong.length) / rows.length) * PERCENT);
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border p-6 text-center">
        <p className="text-sm text-muted-foreground">점수</p>
        <p className="text-5xl font-bold">{score}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {rows.length}문제 중 {rows.length - wrong.length}개 정답
        </p>
      </div>
      {wrong.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-semibold">틀린 문제 ({wrong.length}) — 오답 노트에 추가됨</h2>
          <ul className="space-y-2">
            {wrong.map((row) => <WrongRow key={row.key} row={row} />)}
          </ul>
        </section>
      )}
      <button type="button" onClick={onRetry}
        className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground">
        다시 하기
      </button>
    </div>
  );
}
