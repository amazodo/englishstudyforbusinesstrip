"use client";

// 테스트 모드 선택
import { CircleCheck, Headphones, Mic, PencilLine } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type QuizMode = "choice" | "cloze" | "dictation" | "speaking";

const MODES: { mode: QuizMode; title: string; desc: string; icon: LucideIcon }[] = [
  { mode: "choice", title: "객관식", desc: "4지선다로 뜻 확인", icon: CircleCheck },
  { mode: "cloze", title: "빈칸 채우기", desc: "예문 속 핵심 표현 입력", icon: PencilLine },
  { mode: "dictation", title: "받아쓰기", desc: "듣고 그대로 입력", icon: Headphones },
  { mode: "speaking", title: "말하기", desc: "한국어 보고 영어로 말하기", icon: Mic },
];

/** 모드 선택 카드 */
export function ModePicker({ onPick }: { onPick: (mode: QuizMode) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MODES.map(({ mode, title, desc, icon: Icon }) => (
        <button key={mode} type="button" onClick={() => onPick(mode)}
          className="flex min-h-32 flex-col items-start justify-between rounded-2xl border p-4 text-left active:bg-muted">
          <Icon className="size-7 text-primary" aria-hidden />
          <span>
            <span className="block font-semibold">{title}</span>
            <span className="block text-xs text-muted-foreground">{desc}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
