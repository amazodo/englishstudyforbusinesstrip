"use client";

// 한→영 말하기 모드 (F11)
import { usePractice } from "@/hooks/usePractice";
import { QUIZ_QUESTION_COUNT } from "@/lib/constants";
import { type ListenQuestion, buildListen, practiceItems, sampleQuestions } from "@/lib/practice";
import { useProgressStore } from "@/store/useProgressStore";
import { type PracticeConfig, PracticeSetup } from "./PracticeSetup";
import { PracticeResultView } from "./PracticeResultView";
import { SpeakingQuestionView } from "./SpeakingQuestionView";

/** 말하기 연습 */
export function SpeakingPractice() {
  const practice = usePractice<ListenQuestion>();
  const filter = useProgressStore((s) => s.trackFilter);

  const start = (config: PracticeConfig) => {
    const progress = useProgressStore.getState().progress;
    const items = practiceItems({ ...config, filter, progress });
    practice.start(sampleQuestions(items, QUIZ_QUESTION_COUNT, buildListen));
  };

  if (practice.phase === "setup") {
    return (
      <PracticeSetup error={practice.error} onStart={start} showKind={false}
        description="한국어 문장을 보고 영어로 소리 내어 말하세요. 음성 인식을 지원하는 기기(Android Chrome, iPhone Safari)에서는 일치율도 보여줍니다. 음성 인식은 인터넷 연결이 필요합니다." />
    );
  }
  if (practice.phase === "playing" && practice.current) {
    const q = practice.current;
    return (
      <SpeakingQuestionView key={q.card.key} question={q} position={practice.position} total={practice.total}
        onAnswer={(correct, answer) => practice.submit(q, correct, answer)} />
    );
  }
  const rows = practice.outcomes.map(({ question, correct, userAnswer }) => ({
    key: question.card.key, id: question.card.item.data.id, correct, userAnswer,
    prompt: question.hintKo, correctAnswer: question.text,
  }));
  return <PracticeResultView rows={rows} onRetry={practice.reset} />;
}
