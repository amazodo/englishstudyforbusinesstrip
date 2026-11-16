"use client";

// 오답 노트 (F14): 틀린 카드만 모아 플래시카드로 집중 학습
import { useMemo } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/app/PageHeader";
import { TrackFilterTabs } from "@/components/app/TrackFilterTabs";
import { MistakeList } from "@/components/mistakes/MistakeList";
import { StudyingView } from "@/components/study/StudyingView";
import { useHydrated } from "@/hooks/useHydrated";
import { useStudySession } from "@/hooks/useStudySession";
import { type MistakeEntry, collectMistakes } from "@/lib/mistakes";
import { useProgressStore } from "@/store/useProgressStore";

/** 한 번에 집중 학습할 최대 카드 수 */
const FOCUS_SESSION_SIZE = 30;

interface OverviewProps {
  entries: MistakeEntry[];
  justFinished: boolean;
  onFocus: () => void;
}

/** 오답 목록 화면 */
function MistakesOverview({ entries, justFinished, onFocus }: OverviewProps) {
  return (
    <div className="space-y-4">
      <TrackFilterTabs />
      {justFinished && (
        <p className="rounded-xl bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
          집중 학습을 마쳤습니다. 다시 맞힌 카드도 오답 기록은 남아 있어요.
        </p>
      )}
      {entries.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          아직 틀린 카드가 없습니다. <Link href="/quiz/" className="underline">테스트</Link>로 실력을 확인해 보세요.
        </p>
      ) : (
        <>
          <button type="button" onClick={onFocus}
            className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground">
            오답 집중 학습 ({Math.min(entries.length, FOCUS_SESSION_SIZE)}장)
          </button>
          <MistakeList entries={entries} />
        </>
      )}
    </div>
  );
}

/** 오답 노트 화면 */
export default function MistakesPage() {
  const hydrated = useHydrated();
  const session = useStudySession();
  const progress = useProgressStore((s) => s.progress);
  const filter = useProgressStore((s) => s.trackFilter);
  const entries = useMemo(() => collectMistakes(progress, filter), [progress, filter]);
  const studying = session.phase === "studying";

  return (
    <>
      <PageHeader title={studying ? "오답 집중 학습" : "오답 노트"}
        subtitle={studying ? undefined : "학습·테스트에서 틀린 카드 (많이 틀린 순)"} />
      {hydrated && studying && <StudyingView session={session} />}
      {hydrated && !studying && (
        <MistakesOverview entries={entries} justFinished={session.phase === "done"}
          onFocus={() => session.startWith(entries.slice(0, FOCUS_SESSION_SIZE).map((e) => e.card))} />
      )}
    </>
  );
}
