"use client";

// 받아쓰기 모드 (F12)
import { usePractice } from "@/hooks/usePractice";
import { QUIZ_QUESTION_COUNT } from "@/lib/constants";
import { type ListenQuestion, buildListen, practiceItems, sampleQuestions } from "@/lib/practice";
import { useProgressStore } from "@/store/useProgressStore";
import { DictationQuestionView } from "./DictationQuestionView";
import { type PracticeConfig, PracticeSetup } from "./PracticeSetup";
import { PracticeResultView } from "./PracticeResultView";

/** 받아쓰기 */
export function DictationPractice() {
  const practice = usePractice<ListenQuestion>();
  const filter = useProgressStore((s) => s.trackFilter);

  const start = (config: PracticeConfig) => {
    const progress = useProgressStore.getState().progress;
    const items = practiceItems({ ...config, filter, progress });
    practice.start(sampleQuestions(items, QUIZ_QUESTION_COUNT, buildListen));
  };

  if (practice.phase === "setup") {
    return (
      <PracticeSetup error={practice.error} onStart={start}
        description="미국식 발음을 듣고 들리는 대로 입력하세요. 듣기는 몇 번이든 반복할 수 있습니다. (소리를 켜 주세요)" />
    );
  }
  if (practice.phase === "playing" && practice.current) {
    const q = practice.current;
    return (
      <DictationQuestionView key={q.card.key} question={q} position={practice.position} total={practice.total}
        onAnswer={(correct, answer) => practice.submit(q, correct, answer)} />
    );
  }
  const rows = practice.outcomes.map(({ question, correct, userAnswer }) => ({
    key: question.card.key, id: question.card.item.data.id, correct, userAnswer,
    prompt: question.hintKo, correctAnswer: question.text,
  }));
  return <PracticeResultView rows={rows} onRetry={practice.reset} />;
}
