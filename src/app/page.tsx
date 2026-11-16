"use client";

// 홈: D-Day, 트랙 필터, 오늘 학습, 숙지 현황
import { PageHeader } from "@/components/app/PageHeader";
import { TrackFilterTabs } from "@/components/app/TrackFilterTabs";
import { DdayCard } from "@/components/home/DdayCard";
import { ProgressOverview } from "@/components/home/ProgressOverview";
import { QuickLinks } from "@/components/home/QuickLinks";
import { TodayCard } from "@/components/home/TodayCard";
import { useHydrated } from "@/hooks/useHydrated";

/** 홈 화면 */
export default function HomePage() {
  const hydrated = useHydrated();
  return (
    <>
      <PageHeader title="Audit English 26262" subtitle="ISO 26262 점검 · 독일 출장 영어" />
      {hydrated ? (
        <div className="space-y-4">
          <DdayCard />
          <TrackFilterTabs />
          <TodayCard />
          <QuickLinks />
          <ProgressOverview />
        </div>
      ) : (
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      )}
    </>
  );
}
