// 치트시트의 시나리오 한 묶음 (탭하면 펼침)
import { SpeakButton } from "@/components/card/SpeakButton";
import { SCENARIO_LABELS } from "@/lib/labels";
import type { ScenarioCode, Sentence } from "@/lib/schema";

interface ScenarioSectionProps {
  scenario: ScenarioCode;
  sentences: Sentence[];
  showKorean: boolean;
}

/** 시나리오별 핵심 문장 목록 */
export function ScenarioSection({ scenario, sentences, showKorean }: ScenarioSectionProps) {
  if (sentences.length === 0) return null;
  return (
    <details className="group rounded-2xl border">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-4 font-semibold">
        <span>{SCENARIO_LABELS[scenario]}</span>
        <span className="text-sm font-normal text-muted-foreground">
          {sentences.length} <span className="inline-block transition-transform group-open:rotate-90">›</span>
        </span>
      </summary>
      <ul className="divide-y border-t">
        {sentences.map((s) => (
          <li key={s.id} className="flex items-start gap-1 px-4 py-3">
            <div className="flex-1">
              <p className="text-lg font-medium leading-snug">{s.en}</p>
              {showKorean && <p className="mt-0.5 text-sm text-muted-foreground">{s.ko}</p>}
            </div>
            <SpeakButton text={s.en} />
          </li>
        ))}
      </ul>
    </details>
  );
}
