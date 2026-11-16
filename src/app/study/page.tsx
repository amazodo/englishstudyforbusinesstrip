"use client";

// 학습: 플래시카드 + 간격 반복 세션
import { PageHeader } from "@/components/app/PageHeader";
import { SessionDone } from "@/components/study/SessionDone";
import { SessionStart } from "@/components/study/SessionStart";
import { StudyingView } from "@/components/study/StudyingView";
import { useHydrated } from "@/hooks/useHydrated";
import { useStudySession } from "@/hooks/useStudySession";

/** 학습 화면 */
export default function StudyPage() {
  const hydrated = useHydrated();
  const session = useStudySession();
  const remaining = session.available.reviews + session.available.news;

  return (
    <>
      <PageHeader title="오늘의 학습" subtitle="떠올리기 → 뒤집기 → 스스로 채점" />
      {!hydrated && <div className="h-64 animate-pulse rounded-2xl bg-muted" />}
      {hydrated && session.phase === "ready" && (
        <SessionStart reviews={session.available.reviews} news={session.available.news} onStart={session.start} />
      )}
      {hydrated && session.phase === "studying" && <StudyingView session={session} />}
      {hydrated && session.phase === "done" && (
        <SessionDone counts={session.counts} remaining={remaining} onRestart={() => session.start("full")} />
      )}
    </>
  );
}
