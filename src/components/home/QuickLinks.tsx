"use client";

// 홈 바로가기: 치트시트, 오답 노트
import Link from "next/link";
import { BookMarked, CircleAlert } from "lucide-react";
import { useMemo } from "react";
import { collectMistakes } from "@/lib/mistakes";
import { useProgressStore } from "@/store/useProgressStore";

/** 바로가기 카드 2개 */
export function QuickLinks() {
  const progress = useProgressStore((s) => s.progress);
  const mistakeCount = useMemo(() => collectMistakes(progress, "all").length, [progress]);
  const linkClass = "flex min-h-20 items-center gap-3 rounded-2xl border p-4 active:bg-muted";
  return (
    <div className="grid grid-cols-2 gap-3">
      <Link href="/cheatsheet/" className={linkClass}>
        <BookMarked className="size-6 text-primary" aria-hidden />
        <span>
          <span className="block font-semibold">치트시트</span>
          <span className="block text-xs text-muted-foreground">현장용 핵심 문장</span>
        </span>
      </Link>
      <Link href="/mistakes/" className={linkClass}>
        <CircleAlert className="size-6 text-rose-500" aria-hidden />
        <span>
          <span className="block font-semibold">오답 노트</span>
          <span className="block text-xs text-muted-foreground">{mistakeCount}장</span>
        </span>
      </Link>
    </div>
  );
}
