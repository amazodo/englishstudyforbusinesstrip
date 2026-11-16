"use client";

// 상황별 치트시트 (F13): 현장에서 바로 꺼내 보는 핵심 문장
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { ScenarioSection } from "@/components/cheatsheet/ScenarioSection";
import { OptionGroup } from "@/components/quiz/OptionGroup";
import { allSentences } from "@/content";
import { SCENARIOS, type Track } from "@/lib/schema";

const SCENARIO_PREFIX: Record<Track, string> = { audit: "S", travel: "T" };

/** 토글 스위치 한 줄 */
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-11 items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-5 accent-primary" />
      {label}
    </label>
  );
}

/** 치트시트 화면 */
export default function CheatsheetPage() {
  const [track, setTrack] = useState<Track>("audit");
  const [showKorean, setShowKorean] = useState(true);
  const [essentialOnly, setEssentialOnly] = useState(true);

  const sections = useMemo(() => {
    const scenarios = SCENARIOS.filter((code) => code.startsWith(SCENARIO_PREFIX[track]));
    return scenarios.map((scenario) => ({
      scenario,
      sentences: allSentences.filter((s) => s.scenario === scenario && (!essentialOnly || s.priority === 1)),
    }));
  }, [track, essentialOnly]);

  return (
    <>
      <PageHeader title="치트시트" subtitle="상황을 탭하면 핵심 문장이 펼쳐집니다" />
      <div className="space-y-3">
        <OptionGroup label="트랙" value={track} onChange={setTrack}
          options={[{ value: "audit", label: "점검" }, { value: "travel", label: "출장" }]} />
        <div className="flex gap-5">
          <Toggle label="필수 문장만" checked={essentialOnly} onChange={setEssentialOnly} />
          <Toggle label="한국어 뜻 보기" checked={showKorean} onChange={setShowKorean} />
        </div>
        {sections.map(({ scenario, sentences }) => (
          <ScenarioSection key={scenario} scenario={scenario} sentences={sentences} showKorean={showKorean} />
        ))}
      </div>
    </>
  );
}
