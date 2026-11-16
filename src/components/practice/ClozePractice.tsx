"use client";

// 빈칸 채우기 모드 (F10)
import { usePractice } from "@/hooks/usePractice";
import { QUIZ_QUESTION_COUNT } from "@/lib/constants";
import { type ClozeQuestion, buildCloze, practiceItems, sampleQuestions } from "@/lib/practice";
import { useProgressStore } from "@/store/useProgressStore";
import { ClozeQuestionView } from "./ClozeQuestionView";
import { type PracticeConfig, PracticeSetup } from "./PracticeSetup";
import { PracticeResultView } from "./PracticeResultView";

/** 빈칸 채우기 */
export function ClozePractice() {
  const practice = usePractice<ClozeQuestion>();
  const filter = useProgressStore((s) => s.trackFilter);

  const start = (config: PracticeConfig) => {
    const progress = useProgressStore.getState().progress;
    const items = practiceItems({ ...config, filter, progress });
    practice.start(sampleQuestions(items, QUIZ_QUESTION_COUNT, buildCloze));
  };

  if (practice.phase === "setup") {
    return (
      <PracticeSetup error={practice.error} onStart={start}
        description="예문에서 가려진 핵심 표현을 영어로 입력하세요. 대소문자와 문장부호는 채점에서 무시합니다." />
    );
  }
  if (practice.phase === "playing" && practice.current) {
    const q = practice.current;
    return (
      <ClozeQuestionView key={q.card.key} question={q} position={practice.position} total={practice.total}
        onAnswer={(correct, answer) => practice.submit(q, correct, answer)} />
    );
  }
  const rows = practice.outcomes.map(({ question, correct, userAnswer }) => ({
    key: question.card.key, id: question.card.item.data.id, correct, userAnswer,
    prompt: question.hintKo, correctAnswer: question.answer,
  }));
  return <PracticeResultView rows={rows} onRetry={practice.reset} />;
}
