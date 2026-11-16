// 카드 앞면: 방향(영→한 / 한→영)과 종류(용어/문장)에 따라 질문을 보여준다.
import type { CardRef } from "@/lib/cards";
import type { Sentence, Term } from "@/lib/schema";
import { SpeakButton } from "./SpeakButton";

/** 용어 영→한: 영어 단어 + 발음 */
function TermEnglishFront({ term }: { term: Term }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="flex items-center gap-1">
        <p className="text-3xl font-bold tracking-tight">{term.term}</p>
        <SpeakButton text={term.term} />
      </div>
      {term.fullForm && <p className="text-sm text-muted-foreground">({term.fullForm})</p>}
      <p className="font-[Arial,'Segoe_UI',sans-serif] text-base text-muted-foreground">{term.ipa}</p>
      <p className="text-sm font-medium text-primary">{term.stressHint}</p>
    </div>
  );
}

/** 용어 한→영: 한국어 뜻 + 영어 정의 힌트 */
function TermKoreanFront({ term }: { term: Term }) {
  return (
    <div className="space-y-2 text-center">
      <p className="text-2xl font-bold">{term.meaningKo}</p>
      <p className="text-sm text-muted-foreground">힌트: {term.definitionEn}</p>
    </div>
  );
}

/** 문장 한→영: 한국어 문장 */
function SentenceFront({ sentence }: { sentence: Sentence }) {
  return (
    <div className="space-y-2 text-center">
      <p className="text-xl font-semibold leading-snug">{sentence.ko}</p>
      <p className="text-sm text-muted-foreground">영어로 소리 내어 말해 보세요</p>
    </div>
  );
}

/** 카드 앞면 */
export function CardFront({ card }: { card: CardRef }) {
  const { item, direction } = card;
  if (item.kind === "sentence") return <SentenceFront sentence={item.data} />;
  return direction === "en2ko" ? (
    <TermEnglishFront term={item.data} />
  ) : (
    <TermKoreanFront term={item.data} />
  );
}
