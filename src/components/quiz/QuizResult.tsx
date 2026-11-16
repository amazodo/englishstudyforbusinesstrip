"use client";

// 테스트 결과: 점수 + 틀린 문제 복습 링크
import Link from "next/link";
import { PERCENT } from "@/lib/constants";
import type { QuizAnswer } from "@/hooks/useQuiz";

interface QuizResultProps {
  answers: QuizAnswer[];
  onRetry: () => void;
}

/** 결과 화면 */
export function QuizResult({ answers, onRetry }: QuizResultProps) {
  const wrong = answers.filter((a) => a.chosen !== a.question.answerIndex);
  const correct = answers.length - wrong.length;
  const score = answers.length === 0 ? 0 : Math.round((correct / answers.length) * PERCENT);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border p-6 text-center">
        <p className="text-sm text-muted-foreground">점수</p>
        <p className="text-5xl font-bold">{score}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {answers.length}문제 중 {correct}개 정답
        </p>
      </div>
      {wrong.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-semibold">틀린 문제 ({wrong.length})</h2>
          <ul className="space-y-2">
            {wrong.map(({ question }) => (
              <li key={question.card.key}>
                <Link
                  href={`/card/?id=${question.card.item.data.id}`}
                  className="block rounded-xl border p-3 text-sm"
                >
                  <p className="font-medium">{question.prompt}</p>
                  <p className="text-emerald-700 dark:text-emerald-300">
                    → {question.options[question.answerIndex]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <button
        type="button"
        onClick={onRetry}
        className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground"
      >
        다시 테스트
      </button>
    </div>
  );
}
