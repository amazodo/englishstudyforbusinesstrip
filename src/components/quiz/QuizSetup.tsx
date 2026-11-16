"use client";

// 테스트 설정: 종류(용어/문장), 방향(영→한/한→영), 범위(학습한 카드/전체)
import { useState } from "react";
import { TrackFilterTabs } from "@/components/app/TrackFilterTabs";
import { QUIZ_QUESTION_COUNT } from "@/lib/constants";
import type { QuizConfig } from "@/hooks/useQuiz";
import { OptionGroup } from "./OptionGroup";

interface QuizSetupProps {
  error: string | null;
  onStart: (config: QuizConfig) => void;
}

const DEFAULT_CONFIG: QuizConfig = { kind: "term", direction: "en2ko", scope: "learned" };

/** 테스트 설정 화면 */
export function QuizSetup({ error, onStart }: QuizSetupProps) {
  const [config, setConfig] = useState<QuizConfig>(DEFAULT_CONFIG);
  const update = (patch: Partial<QuizConfig>) => setConfig((c) => ({ ...c, ...patch }));

  return (
    <div className="space-y-5">
      <TrackFilterTabs />
      <OptionGroup
        label="종류"
        value={config.kind}
        onChange={(kind) => update({ kind })}
        options={[
          { value: "term", label: "용어" },
          { value: "sentence", label: "문장" },
        ]}
      />
      <OptionGroup
        label="방향"
        value={config.direction}
        onChange={(direction) => update({ direction })}
        options={[
          { value: "en2ko", label: "영어 → 한국어" },
          { value: "ko2en", label: "한국어 → 영어" },
        ]}
      />
      <OptionGroup
        label="범위"
        value={config.scope}
        onChange={(scope) => update({ scope })}
        options={[
          { value: "learned", label: "학습한 카드" },
          { value: "all", label: "전체 카드" },
        ]}
      />
      {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-500/15 dark:text-rose-200">{error}</p>}
      <button
        type="button"
        onClick={() => onStart(config)}
        className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground"
      >
        {QUIZ_QUESTION_COUNT}문제 시작
      </button>
    </div>
  );
}
