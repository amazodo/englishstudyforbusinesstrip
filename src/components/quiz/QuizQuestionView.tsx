"use client";

// 객관식 문제 1개: 보기 선택 → 정답/오답 표시 → 다음
import { useState } from "react";
import { Check, X } from "lucide-react";
import { SpeakButton } from "@/components/card/SpeakButton";
import type { QuizQuestion } from "@/lib/quiz";
import { cn } from "@/lib/utils";

interface QuizQuestionViewProps {
  question: QuizQuestion;
  position: number;
  total: number;
  onAnswer: (chosen: number) => void;
}

/** 보기 버튼 스타일 (선택 후 정답은 초록, 고른 오답은 빨강) */
function optionClass(index: number, chosen: number | null, answer: number): string {
  if (chosen === null) return "border";
  if (index === answer) return "border-emerald-600 bg-emerald-50 dark:bg-emerald-500/15";
  if (index === chosen) return "border-rose-600 bg-rose-50 dark:bg-rose-500/15";
  return "border opacity-60";
}

/** 문제 화면 */
export function QuizQuestionView({ question, position, total, onAnswer }: QuizQuestionViewProps) {
  const [chosen, setChosen] = useState<number | null>(null);
  const isEnglishPrompt = question.card.direction === "en2ko";

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {position} / {total}
      </p>
      <div className="flex min-h-32 items-center justify-center gap-1 rounded-2xl border bg-card p-5 text-center">
        <p className="text-xl font-semibold leading-snug">{question.prompt}</p>
        {isEnglishPrompt && <SpeakButton text={question.prompt} />}
      </div>
      <ul className="space-y-2">
        {question.options.map((option, index) => (
          <li key={option}>
            <button
              type="button"
              disabled={chosen !== null}
              onClick={() => setChosen(index)}
              className={cn(
                "flex min-h-14 w-full items-center gap-2 rounded-xl p-3 text-left text-[15px]",
                optionClass(index, chosen, question.answerIndex),
              )}
            >
              <span className="flex-1">{option}</span>
              {chosen !== null && index === question.answerIndex && <Check className="size-5 text-emerald-600" />}
              {chosen === index && index !== question.answerIndex && <X className="size-5 text-rose-600" />}
            </button>
          </li>
        ))}
      </ul>
      {chosen !== null && (
        <button
          type="button"
          onClick={() => onAnswer(chosen)}
          className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground"
        >
          {position === total ? "결과 보기" : "다음"}
        </button>
      )}
    </div>
  );
}
