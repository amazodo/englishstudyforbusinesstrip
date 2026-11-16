"use client";

// 테스트: 객관식 / 빈칸 채우기 / 받아쓰기 / 말하기
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { ClozePractice } from "@/components/practice/ClozePractice";
import { DictationPractice } from "@/components/practice/DictationPractice";
import { SpeakingPractice } from "@/components/practice/SpeakingPractice";
import { ChoiceQuiz } from "@/components/quiz/ChoiceQuiz";
import { ModePicker, type QuizMode } from "@/components/quiz/ModePicker";
import { useHydrated } from "@/hooks/useHydrated";

const MODE_TITLES: Record<QuizMode, string> = {
  choice: "객관식",
  cloze: "빈칸 채우기",
  dictation: "받아쓰기",
  speaking: "말하기",
};

/** 선택한 모드 화면 */
function ModeView({ mode }: { mode: QuizMode }) {
  if (mode === "cloze") return <ClozePractice />;
  if (mode === "dictation") return <DictationPractice />;
  if (mode === "speaking") return <SpeakingPractice />;
  return <ChoiceQuiz />;
}

/** 테스트 화면 */
export default function QuizPage() {
  const hydrated = useHydrated();
  const [mode, setMode] = useState<QuizMode | null>(null);
  const back = (
    <button type="button" onClick={() => setMode(null)}
      className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground">
      <ChevronLeft className="size-4" aria-hidden /> 모드 선택
    </button>
  );

  return (
    <>
      <PageHeader title={mode ? MODE_TITLES[mode] : "테스트"} subtitle={mode ? undefined : "연습 방식을 고르세요"}
        action={mode ? back : undefined} />
      {!hydrated && <div className="h-64 animate-pulse rounded-2xl bg-muted" />}
      {hydrated && (mode ? <ModeView mode={mode} /> : <ModePicker onPick={setMode} />)}
    </>
  );
}
