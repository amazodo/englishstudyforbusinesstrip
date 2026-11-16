"use client";

// 연습 모드 공통 설정: 범위(학습한 카드/전체), 종류(용어/문장)
import { useState } from "react";
import { TrackFilterTabs } from "@/components/app/TrackFilterTabs";
import { OptionGroup } from "@/components/quiz/OptionGroup";
import { QUIZ_QUESTION_COUNT } from "@/lib/constants";
import type { PracticeKind, PracticeScope } from "@/lib/practice";

export interface PracticeConfig {
  scope: PracticeScope;
  kind: PracticeKind;
}

interface PracticeSetupProps {
  description: string;
  error: string | null;
  showKind?: boolean;
  defaultKind?: PracticeKind;
  onStart: (config: PracticeConfig) => void;
}

/** 연습 설정 화면 */
export function PracticeSetup({ description, error, showKind = true, defaultKind = "sentence", onStart }: PracticeSetupProps) {
  const [config, setConfig] = useState<PracticeConfig>({ scope: "learned", kind: defaultKind });
  return (
    <div className="space-y-5">
      <p className="rounded-xl bg-muted p-3 text-sm leading-relaxed">{description}</p>
      <TrackFilterTabs />
      {showKind && (
        <OptionGroup label="종류" value={config.kind} onChange={(kind) => setConfig((c) => ({ ...c, kind }))}
          options={[{ value: "sentence", label: "문장" }, { value: "term", label: "용어" }]} />
      )}
      <OptionGroup label="범위" value={config.scope} onChange={(scope) => setConfig((c) => ({ ...c, scope }))}
        options={[{ value: "learned", label: "학습한 카드" }, { value: "all", label: "전체 카드" }]} />
      {error && (
        <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-500/15 dark:text-rose-200">{error}</p>
      )}
      <button type="button" onClick={() => onStart(config)}
        className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground">
        {QUIZ_QUESTION_COUNT}문제 시작
      </button>
    </div>
  );
}
