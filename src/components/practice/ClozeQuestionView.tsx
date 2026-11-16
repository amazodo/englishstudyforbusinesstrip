"use client";

// 빈칸 채우기 문제: 한국어 힌트를 보고 가려진 영어 표현을 입력
import { useState } from "react";
import { SpeakButton } from "@/components/card/SpeakButton";
import type { ClozeQuestion } from "@/lib/practice";
import { isSameText } from "@/lib/textMatch";
import { AnswerInput } from "./AnswerInput";
import { NextButton } from "./NextButton";

interface ClozeQuestionViewProps {
  question: ClozeQuestion;
  position: number;
  total: number;
  onAnswer: (correct: boolean, userAnswer: string) => void;
}

/** 첫 글자 힌트: "raise a finding" → "r____ a f______" */
function firstLetterHint(answer: string): string {
  return answer.split(" ").map((w) => w[0] + "_".repeat(Math.max(w.length - 1, 0))).join(" ");
}

/** 빈칸 문제 화면 */
export function ClozeQuestionView({ question, position, total, onAnswer }: ClozeQuestionViewProps) {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const correct = isSameText(question.answer, input);
  const blank = checked ? question.answer : showHint ? firstLetterHint(question.answer) : "______";

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{position} / {total}</p>
      <div className="space-y-3 rounded-2xl border bg-card p-5">
        <p className="text-sm text-muted-foreground">{question.hintKo}</p>
        <p className="text-lg font-medium leading-relaxed">
          {question.before}
          <span className="mx-0.5 rounded bg-amber-200/70 px-1 font-semibold dark:bg-amber-500/30">{blank}</span>
          {question.after}
        </p>
        {checked && <SpeakButton text={question.before + question.answer + question.after} />}
      </div>
      {checked ? (
        <NextButton correct={correct} isLast={position === total} onNext={() => onAnswer(correct, input)} />
      ) : (
        <>
          <AnswerInput value={input} onChange={setInput} onSubmit={() => setChecked(true)} placeholder="빈칸에 들어갈 영어" />
          {!showHint && (
            <button type="button" onClick={() => setShowHint(true)} className="min-h-11 w-full text-sm text-muted-foreground">
              💡 첫 글자 힌트 보기
            </button>
          )}
        </>
      )}
    </div>
  );
}
