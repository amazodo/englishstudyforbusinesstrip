// 용어 카드 뒷면 상세: 뜻, 표준 참조, 예문, 연어, 암기 팁, 함정, 헷갈리는 쌍
import { allConfusables } from "@/content";
import type { Term } from "@/lib/schema";
import { DetailSection } from "./DetailSection";
import { HighlightedText } from "./HighlightedText";
import { SpeakButton } from "./SpeakButton";

/** 용어의 뜻 영역 */
function MeaningBlock({ term }: { term: Term }) {
  return (
    <div className="space-y-1">
      <p className="text-lg font-bold">{term.meaningKo}</p>
      {term.fullForm && <p className="text-sm font-medium">{term.fullForm}</p>}
      <p className="text-sm text-muted-foreground">{term.definitionEn}</p>
      {term.descriptionKo && <p className="text-sm">{term.descriptionKo}</p>}
      {term.standardRef && <p className="text-xs text-muted-foreground">📘 {term.standardRef}</p>}
    </div>
  );
}

/** 연결된 헷갈리는 쌍 요약 */
function ConfusableBlock({ ids }: { ids: string[] }) {
  const items = allConfusables.filter((c) => ids.includes(c.id));
  if (items.length === 0) return null;
  return (
    <DetailSection icon="⚖️" title="헷갈림 주의">
      {items.map((c) => (
        <p key={c.id}>
          <span className="font-semibold">{c.title}</span> — {c.keyDifferenceKo}
        </p>
      ))}
    </DetailSection>
  );
}

/** 용어 상세 전체 */
export function TermDetails({ term }: { term: Term }) {
  return (
    <div className="space-y-3">
      <MeaningBlock term={term} />
      <DetailSection icon="💬" title="예문">
        <div className="flex items-start gap-1">
          <p className="flex-1 font-medium">
            <HighlightedText text={term.example.en} chunks={[term.term]} />
          </p>
          <SpeakButton text={term.example.en} label="예문 발음 듣기" className="-mt-2" />
        </div>
        <p className="text-sm text-muted-foreground">→ {term.example.ko}</p>
      </DetailSection>
      {term.collocations.length > 0 && (
        <DetailSection icon="🔗" title="함께 쓰는 표현">
          {term.collocations.join(" · ")}
        </DetailSection>
      )}
      {term.mnemonic && <DetailSection icon="💡" title="암기 팁">{term.mnemonic}</DetailSection>}
      {term.pitfall && <DetailSection icon="⚠️" title="주의">{term.pitfall}</DetailSection>}
      {term.localTip && <DetailSection icon="🇩🇪" title="현지 팁">{term.localTip}</DetailSection>}
      {term.confusableIds && <ConfusableBlock ids={term.confusableIds} />}
    </div>
  );
}
