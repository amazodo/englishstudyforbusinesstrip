"use client";

// 목록·검색: 용어 / 문장 / 헷갈리는 쌍
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { TrackFilterTabs } from "@/components/app/TrackFilterTabs";
import { ConfusableList } from "@/components/browse/ConfusableList";
import { ItemList } from "@/components/browse/ItemList";
import { OptionGroup } from "@/components/quiz/OptionGroup";
import { Input } from "@/components/ui/input";
import { allConfusables } from "@/content";
import { useHydrated } from "@/hooks/useHydrated";
import { type StudyItem, itemTexts } from "@/lib/cards";
import { filteredItems } from "@/lib/srs";
import { useProgressStore } from "@/store/useProgressStore";

type BrowseTab = "term" | "sentence" | "confusable";

/** 영어·한국어 통합 검색 */
function matchesQuery(item: StudyItem, query: string): boolean {
  if (!query) return true;
  const { en, ko } = itemTexts(item);
  const q = query.toLowerCase();
  const abbreviation = item.kind === "term" ? (item.data.abbreviation ?? "") : "";
  return [en, ko, abbreviation].some((text) => text.toLowerCase().includes(q));
}

/** 목록 화면 */
export default function BrowsePage() {
  const hydrated = useHydrated();
  const filter = useProgressStore((s) => s.trackFilter);
  const [tab, setTab] = useState<BrowseTab>("term");
  const [query, setQuery] = useState("");

  const items = useMemo(
    () =>
      filteredItems(filter, true).filter(
        (item) => item.kind === tab && matchesQuery(item, query.trim()),
      ),
    [filter, tab, query],
  );

  return (
    <>
      <PageHeader title="목록" subtitle="카테고리별 보기 · 영어/한국어 검색" />
      <div className="space-y-4">
        <TrackFilterTabs />
        <OptionGroup
          label="종류"
          value={tab}
          onChange={setTab}
          options={[
            { value: "term", label: "용어" },
            { value: "sentence", label: "문장" },
            { value: "confusable", label: "헷갈리는 쌍" },
          ]}
        />
        {tab !== "confusable" && (
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색 (예: ASIL, 증거, evidence)"
              className="h-12 pl-9 text-base"
            />
          </div>
        )}
        {tab === "confusable" ? (
          <ConfusableList items={allConfusables} />
        ) : hydrated ? (
          <ItemList items={items} />
        ) : null}
      </div>
    </>
  );
}
