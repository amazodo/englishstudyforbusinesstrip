// 카드 상단 태그: 트랙(색 구분) + 카테고리/시나리오 + 출처 표준
import type { StudyItem } from "@/lib/cards";
import { CATEGORY_LABELS, DOMAIN_LABELS, SCENARIO_LABELS, TRACK_LABELS } from "@/lib/labels";
import { cn } from "@/lib/utils";

const TRACK_STYLES = {
  audit: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200",
  travel: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200",
} as const;

/** 카드 분류 태그 묶음 */
export function CardMeta({ item }: { item: StudyItem }) {
  const group =
    item.kind === "term" ? CATEGORY_LABELS[item.data.category] : SCENARIO_LABELS[item.data.scenario];
  const showDomain = item.data.domain === "aspice" || item.data.domain === "sotif";
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs">
      <span className={cn("rounded-full px-2 py-0.5 font-semibold", TRACK_STYLES[item.data.track])}>
        {TRACK_LABELS[item.data.track]}
      </span>
      <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{group}</span>
      {showDomain && (
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-violet-800 dark:bg-violet-500/20 dark:text-violet-200">
          {DOMAIN_LABELS[item.data.domain]}
        </span>
      )}
      {item.data.priority === 1 && (
        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-800 dark:bg-rose-500/20 dark:text-rose-200">
          필수
        </span>
      )}
    </div>
  );
}
