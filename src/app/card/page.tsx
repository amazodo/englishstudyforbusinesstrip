"use client";

// 카드 상세: /card/?id=T-A1-001
// 카드마다 정적 페이지를 만들면 빌드가 수십 MB가 되므로, 페이지 하나에서 id로 찾아 그린다.
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { CardFront } from "@/components/card/CardFront";
import { CardMeta } from "@/components/card/CardMeta";
import { CardProgressInfo } from "@/components/card/CardProgressInfo";
import { SentenceDetails } from "@/components/card/SentenceDetails";
import { TermDetails } from "@/components/card/TermDetails";
import { getItem, makeRef } from "@/lib/cards";

/** 카드 상세 본문 */
function CardDetail() {
  const id = useSearchParams().get("id") ?? "";
  const item = getItem(id);
  if (!item) {
    return <p className="py-10 text-center text-sm text-muted-foreground">카드를 찾을 수 없습니다.</p>;
  }
  return (
    <article className="space-y-4 rounded-2xl border bg-card p-5">
      <CardMeta item={item} />
      {item.kind === "term" ? (
        <>
          <CardFront card={makeRef(item, "en2ko")} />
          <TermDetails term={item.data} />
        </>
      ) : (
        <SentenceDetails sentence={item.data} showKorean />
      )}
      <CardProgressInfo item={item} />
    </article>
  );
}

/** 카드 상세 화면 */
export default function CardPage() {
  return (
    <div className="space-y-4">
      <Link href="/browse/" className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground">
        <ChevronLeft className="size-4" aria-hidden /> 목록
      </Link>
      <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-muted" />}>
        <CardDetail />
      </Suspense>
    </div>
  );
}
