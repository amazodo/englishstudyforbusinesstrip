"use client";

// 한→영 말하기 문제: 한국어를 보고 말하기 → 정답 확인 → 자기채점
import { useState } from "react";
import { HighlightedText } from "@/components/card/HighlightedText";
import { SpeakButton } from "@/components/card/SpeakButton";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { PERCENT } from "@/lib/constants";
import type { ListenQuestion } from "@/lib/practice";
import { similarity } from "@/lib/textMatch";
import { MicButton } from "./MicButton";
import { WordDiff } from "./WordDiff";

interface SpeakingQuestionViewProps {
  question: ListenQuestion;
  position: number;
  total: number;
  onAnswer: (correct: boolean, userAnswer: string) => void;
}

/** 정답과 (음성 인식 결과가 있으면) 비교 */
function SpeakingAnswer({ question, transcript }: { question: ListenQuestion; transcript: string }) {
  const item = question.card.item;
  const chunks = item.kind === "sentence" ? item.data.keyChunks : [];
  return (
    <div className="space-y-2 rounded-2xl border bg-card p-5">
      <div className="flex items-start gap-1">
        <p className="flex-1 text-lg font-semibold leading-snug"><HighlightedText text={question.text} chunks={chunks} /></p>
        <SpeakButton text={question.text} className="-mt-1" />
      </div>
      {transcript && (
        <div className="border-t pt-2">
          <p className="text-xs text-muted-foreground">
            내 발화 일치율 {Math.round(similarity(question.text, transcript) * PERCENT)}% · 빨간 밑줄 = 빠진 단어
          </p>
          <WordDiff expected={question.text} actual={transcript} />
        </div>
      )}
    </div>
  );
}

/** 자기채점 버튼 */
function SelfGrade({ onGrade }: { onGrade: (correct: boolean) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button type="button" onClick={() => onGrade(false)} className="min-h-14 rounded-xl bg-rose-600 font-semibold text-white">
        못 했음
      </button>
      <button type="button" onClick={() => onGrade(true)} className="min-h-14 rounded-xl bg-emerald-600 font-semibold text-white">
        말할 수 있었음
      </button>
    </div>
  );
}

/** 말하기 문제 화면 */
export function SpeakingQuestionView({ question, position, total, onAnswer }: SpeakingQuestionViewProps) {
  const speech = useSpeechRecognition();
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{position} / {total}</p>
      <div className="rounded-2xl border bg-card p-5 text-center">
        <p className="text-xl font-semibold leading-snug">{question.hintKo}</p>
      </div>
      <MicButton supported={speech.supported} listening={speech.listening} transcript={speech.transcript}
        error={speech.error} onStart={speech.start} onStop={speech.stop} />
      {revealed ? (
        <>
          <SpeakingAnswer question={question} transcript={speech.transcript} />
          <SelfGrade onGrade={(correct) => onAnswer(correct, speech.transcript)} />
        </>
      ) : (
        <button type="button" onClick={() => setRevealed(true)}
          className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground">
          정답 보기
        </button>
      )}
    </div>
  );
}
