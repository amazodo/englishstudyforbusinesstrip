"use client";

// 오답 목록
import Link from "next/link";
import { itemTexts } from "@/lib/cards";
import { MAX_BOX } from "@/lib/constants";
import type { MistakeEntry } from "@/lib/mistakes";

/** 오답 한 줄 */
function MistakeRow({ entry }: { entry: MistakeEntry }) {
  const { en, ko } = itemTexts(entry.card.item);
  const direction = entry.card.direction === "en2ko" ? "영→한" : "한→영";
  return (
    <li>
      <Link href={`/card/?id=${entry.card.item.data.id}`} className="flex items-start gap-3 rounded-xl px-2 py-3 active:bg-muted">
        <span className="mt-0.5 min-w-10 rounded-lg bg-rose-100 px-1.5 py-0.5 text-center text-xs font-bold text-rose-800 dark:bg-rose-500/20 dark:text-rose-200">
          ✗{entry.progress.wrongCount}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium">{en}</p>
          <p className="text-sm text-muted-foreground">{ko}</p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {direction} · Box {entry.progress.box}/{MAX_BOX}
        </span>
      </Link>
    </li>
  );
}

/** 오답 목록 */
export function MistakeList({ entries }: { entries: MistakeEntry[] }) {
  return (
    <ul className="divide-y">
      {entries.map((entry) => <MistakeRow key={entry.card.key} entry={entry} />)}
    </ul>
  );
}
