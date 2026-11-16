"use client";

// 영어 답 입력창 (폰 자동 대문자·자동 수정 끄기) + 확인 버튼
import type { FormEvent } from "react";

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
  multiline?: boolean;
}

const INPUT_CLASS = "w-full rounded-xl border bg-background px-3 py-3 text-base outline-none focus:ring-2 focus:ring-ring";

/** 답 입력 폼 */
export function AnswerInput({ value, onChange, onSubmit, placeholder, multiline = false }: AnswerInputProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };
  const common = {
    value,
    placeholder,
    autoCapitalize: "off",
    autoCorrect: "off",
    autoComplete: "off",
    spellCheck: false,
    className: INPUT_CLASS,
    lang: "en",
  } as const;
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {multiline ? (
        <textarea rows={3} {...common} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type="text" enterKeyHint="done" {...common} onChange={(e) => onChange(e.target.value)} />
      )}
      <button type="submit" className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground">
        확인
      </button>
    </form>
  );
}
