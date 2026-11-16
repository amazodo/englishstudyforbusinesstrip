"use client";

// 받아쓰기용 듣기 버튼 (보통 / 느리게)
import { Snail, Volume2 } from "lucide-react";
import { SPEECH_RATE_NORMAL, SPEECH_RATE_SLOW } from "@/lib/constants";
import { speak } from "@/lib/tts";

/** 듣기 버튼 두 개 */
export function ListenButtons({ text }: { text: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button type="button" onClick={() => speak(text, SPEECH_RATE_NORMAL)}
        className="flex min-h-16 items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground">
        <Volume2 className="size-6" aria-hidden /> 듣기
      </button>
      <button type="button" onClick={() => speak(text, SPEECH_RATE_SLOW)}
        className="flex min-h-16 items-center justify-center gap-2 rounded-xl border font-semibold">
        <Snail className="size-6" aria-hidden /> 느리게
      </button>
    </div>
  );
}
