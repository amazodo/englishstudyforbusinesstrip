"use client";

// 채점 결과 배너 + 다음 버튼
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NextButtonProps {
  correct: boolean;
  isLast: boolean;
  onNext: () => void;
}

/** 정답/오답 표시와 다음 문제 버튼 */
export function NextButton({ correct, isLast, onNext }: NextButtonProps) {
  return (
    <div className="space-y-3">
      <p className={cn("flex items-center justify-center gap-2 rounded-xl p-3 font-semibold",
        correct ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200"
          : "bg-rose-50 text-rose-800 dark:bg-rose-500/15 dark:text-rose-200")}>
        {correct ? <Check className="size-5" aria-hidden /> : <X className="size-5" aria-hidden />}
        {correct ? "정답입니다!" : "다시 확인해 보세요"}
      </p>
      <button type="button" onClick={onNext}
        className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground">
        {isLast ? "결과 보기" : "다음"}
      </button>
    </div>
  );
}
