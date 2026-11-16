"use client";

// 용어/문장 목록 (그룹별 묶음 + 진도 표시)
import Link from "next/link";
import { type StudyItem, cardKey, itemGroup, itemTexts, primaryDirection } from "@/lib/cards";
import { MAX_BOX } from "@/lib/constants";
import { groupLabel } from "@/lib/labels";
import { useProgressStore } from "@/store/useProgressStore";

/** 진도 점 표시: 회색=미학습, 파랑=학습 중, 초록=숙지 */
function StatusDot({ item }: { item: StudyItem }) {
  const box = useProgressStore((s) => s.progress[cardKey(item.data.id, primaryDirection(item))]?.box);
  const color = box === undefined ? "bg-muted-foreground/30" : box >= MAX_BOX ? "bg-emerald-500" : "bg-blue-500";
  return <span className={`mt-2 size-2 shrink-0 rounded-full ${color}`} aria-hidden />;
}

/** 항목 한 줄 */
function ItemRow({ item }: { item: StudyItem }) {
  const { en, ko } = itemTexts(item);
  return (
    <li>
      <Link href={`/card/?id=${item.data.id}`} className="flex gap-3 rounded-xl px-2 py-3 active:bg-muted">
        <StatusDot item={item} />
        <div className="min-w-0">
          <p className="font-medium">{en}</p>
          <p className="text-sm text-muted-foreground">{ko}</p>
        </div>
      </Link>
    </li>
  );
}

/** 그룹 순서를 유지하며 묶기 */
function groupItems(items: StudyItem[]): [string, StudyItem[]][] {
  const map = new Map<string, StudyItem[]>();
  for (const item of items) {
    const group = itemGroup(item);
    map.set(group, [...(map.get(group) ?? []), item]);
  }
  return [...map.entries()];
}

/** 그룹별 목록 */
export function ItemList({ items }: { items: StudyItem[] }) {
  if (items.length === 0) {
    return <p className="py-10 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</p>;
  }
  return (
    <div className="space-y-5">
      {groupItems(items).map(([group, groupItemsList]) => (
        <section key={group}>
          <h2 className="sticky top-0 z-10 bg-background/95 py-1 text-sm font-semibold text-muted-foreground backdrop-blur">
            {groupLabel(group)} ({groupItemsList.length})
          </h2>
          <ul className="divide-y">
            {groupItemsList.map((item) => (
              <ItemRow key={item.data.id} item={item} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
