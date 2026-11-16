"use client";

// 플래시카드: 앞면을 보고 먼저 떠올린 뒤(능동 회상) 탭해서 뒤집는다.
import type { CardRef } from "@/lib/cards";
import { CardFront } from "./CardFront";
import { CardMeta } from "./CardMeta";
import { SentenceDetails } from "./SentenceDetails";
import { TermDetails } from "./TermDetails";

interface FlashcardProps {
  card: CardRef;
  flipped: boolean;
  onFlip: () => void;
}

/** 뒷면: 용어는 영어 단어(발음 포함)를 위에 두고 뜻과 상세를 보여준다 */
function CardBack({ card }: { card: CardRef }) {
  const { item } = card;
  if (item.kind === "sentence") return <SentenceDetails sentence={item.data} />;
  return (
    <div className="space-y-4">
      <CardFront card={{ ...card, direction: "en2ko" }} />
      <TermDetails term={item.data} />
    </div>
  );
}

/** 학습용 카드 */
export function Flashcard({ card, flipped, onFlip }: FlashcardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={flipped ? "카드 뒷면" : "탭해서 정답 보기"}
      onClick={() => !flipped && onFlip()}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !flipped && onFlip()}
      className="min-h-[55vh] rounded-2xl border bg-card p-5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardMeta item={card.item} />
      <div className="py-6">
        {flipped ? (
          <CardBack card={card} />
        ) : (
          <div className="flex min-h-[38vh] flex-col items-center justify-center gap-6">
            <CardFront card={card} />
            <p className="text-xs text-muted-foreground">탭해서 정답 보기</p>
          </div>
        )}
      </div>
    </div>
  );
}
