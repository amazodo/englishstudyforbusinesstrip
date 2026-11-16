"use client";

// 음성 인식 버튼 + 인식 결과
import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface MicButtonProps {
  supported: boolean;
  listening: boolean;
  transcript: string;
  error: string | null;
  onStart: () => void;
  onStop: () => void;
}

/** 말하기 버튼 */
export function MicButton({ supported, listening, transcript, error, onStart, onStop }: MicButtonProps) {
  if (!supported) {
    return (
      <p className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">
        이 브라우저는 음성 인식을 지원하지 않습니다. 소리 내어 말한 뒤 정답을 보고 스스로 채점하세요.
      </p>
    );
  }
  return (
    <div className="space-y-2">
      <button type="button" onClick={listening ? onStop : onStart}
        className={cn("flex min-h-16 w-full items-center justify-center gap-2 rounded-xl text-base font-semibold",
          listening ? "animate-pulse bg-rose-600 text-white" : "border-2 border-primary text-primary")}>
        {listening ? <MicOff className="size-6" aria-hidden /> : <Mic className="size-6" aria-hidden />}
        {listening ? "듣는 중… (탭하면 종료)" : "🎙 영어로 말하기"}
      </button>
      {transcript && <p className="rounded-xl bg-muted p-3 text-base">“{transcript}”</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
