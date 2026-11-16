"use client";

// 카테고리/시나리오별 숙지율
import { useMemo } from "react";
import { PERCENT } from "@/lib/constants";
import { groupLabel } from "@/lib/labels";
import { type GroupStat, statsByGroup, sumStats } from "@/lib/stats";
import { filteredItems } from "@/lib/srs";
import { useProgressStore } from "@/store/useProgressStore";

/** 진행 막대 한 줄 */
function ProgressRow({ stat }: { stat: GroupStat }) {
  const startedPct = (stat.started / stat.total) * PERCENT;
  const masteredPct = (stat.mastered / stat.total) * PERCENT;
  return (
    <li className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{groupLabel(stat.group)}</span>
        <span className="tabular-nums text-muted-foreground">
          {stat.mastered}/{stat.total}
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 bg-primary/30" style={{ width: `${startedPct}%` }} />
        <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${masteredPct}%` }} />
      </div>
    </li>
  );
}

/** 용어 또는 문장 그룹 목록 */
function GroupList({ title, stats }: { title: string; stats: GroupStat[] }) {
  if (stats.length === 0) return null;
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
      <ul className="space-y-3">
        {stats.map((stat) => (
          <ProgressRow key={stat.group} stat={stat} />
        ))}
      </ul>
    </div>
  );
}

/** 숙지율 개요 */
export function ProgressOverview() {
  const progress = useProgressStore((s) => s.progress);
  const filter = useProgressStore((s) => s.trackFilter);
  const { termStats, sentenceStats } = useMemo(() => {
    const items = filteredItems(filter, true);
    return {
      termStats: statsByGroup(items.filter((i) => i.kind === "term"), progress),
      sentenceStats: statsByGroup(items.filter((i) => i.kind === "sentence"), progress),
    };
  }, [filter, progress]);
  const total = sumStats([...termStats, ...sentenceStats]);

  return (
    <section className="space-y-3 rounded-2xl border p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="font-semibold">숙지 현황</h2>
        <p className="text-sm text-muted-foreground">
          숙지 {total.mastered} · 학습 중 {total.started - total.mastered} · 전체 {total.total}
        </p>
      </div>
      <GroupList title="📖 용어" stats={termStats} />
      <GroupList title="💬 문장" stats={sentenceStats} />
      <p className="text-xs text-muted-foreground">진한 막대 = 숙지(Box 4), 연한 막대 = 학습 시작</p>
    </section>
  );
}
