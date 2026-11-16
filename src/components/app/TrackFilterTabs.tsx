"use client";

// 전체 / 점검 / 출장 트랙 필터 (학습·테스트·목록 공통)
import { cn } from "@/lib/utils";
import type { TrackFilter } from "@/lib/srs";
import { useProgressStore } from "@/store/useProgressStore";

const OPTIONS: { value: TrackFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "audit", label: "점검" },
  { value: "travel", label: "출장" },
];

/** 트랙 선택 세그먼트 버튼 */
export function TrackFilterTabs() {
  const filter = useProgressStore((s) => s.trackFilter);
  const setFilter = useProgressStore((s) => s.setTrackFilter);
  return (
    <div role="radiogroup" aria-label="학습 트랙" className="grid grid-cols-3 rounded-xl bg-muted p-1">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={filter === option.value}
          onClick={() => setFilter(option.value)}
          className={cn(
            "min-h-11 rounded-lg text-sm font-medium transition-colors",
            filter === option.value ? "bg-background shadow-sm" : "text-muted-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
