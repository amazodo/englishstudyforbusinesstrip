"use client";

// 발음 듣기 버튼 (탭하면 카드 뒤집기 등 부모 동작이 실행되지 않도록 전파 차단)
import { Volume2 } from "lucide-react";
import type { MouseEvent } from "react";
import { speak } from "@/lib/tts";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/useProgressStore";

interface SpeakButtonProps {
  text: string;
  className?: string;
  label?: string;
}

/** 영어 텍스트를 미국식 발음으로 읽어주는 버튼 */
export function SpeakButton({ text, className, label = "발음 듣기" }: SpeakButtonProps) {
  const rate = useProgressStore((s) => s.settings.speechRate);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    speak(text, rate);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-primary hover:bg-muted",
        className,
      )}
    >
      <Volume2 className="size-5" aria-hidden />
    </button>
  );
}
