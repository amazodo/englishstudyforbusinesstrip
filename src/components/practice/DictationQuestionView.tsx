"use client";

// 받아쓰기 문제: 미국식 발음을 듣고 그대로 입력 → 단어별 비교
import { useState } from "react";
import { PERCENT } from "@/lib/constants";
import type { ListenQuestion } from "@/lib/practice";
import { isSameText, similarity } from "@/lib/textMatch";
import { AnswerInput } from "./AnswerInput";
import { ListenButtons } from "./ListenButtons";
import { NextButton } from "./NextButton";
import { WordDiff } from "./WordDiff";

interface DictationQuestionViewProps {
  question: ListenQuestion;
  position: number;
  total: number;
  onAnswer: (correct: boolean, userAnswer: string) => void;
}

/** 채점 후 비교 결과 */
function DictationFeedback({ question, input }: { question: ListenQuestion; input: string }) {
  const percent = Math.round(similarity(question.text, input) * PERCENT);
  return (
    <div className="space-y-2 rounded-2xl border bg-card p-5">
      <p className="text-xs text-muted-foreground">단어 일치율 {percent}% · 빨간 밑줄 = 빠지거나 틀린 단어</p>
      <WordDiff expected={question.text} actual={input} />
      <p className="text-sm text-muted-foreground">→ {question.hintKo}</p>
    </div>
  );
}

/** 받아쓰기 화면 */
export function DictationQuestionView({ question, position, total, onAnswer }: DictationQuestionViewProps) {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const correct = isSameText(question.text, input);
  const isSentence = question.card.item.kind === "sentence";

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{position} / {total}</p>
      <ListenButtons text={question.text} />
      {checked ? (
        <>
          <DictationFeedback question={question} input={input} />
          <NextButton correct={correct} isLast={position === total} onNext={() => onAnswer(correct, input)} />
        </>
      ) : (
        <AnswerInput value={input} onChange={setInput} onSubmit={() => setChecked(true)}
          multiline={isSentence} placeholder="들리는 영어를 그대로 입력" />
      )}
    </div>
  );
}
