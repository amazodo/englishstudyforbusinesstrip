// 문장 카드 뒷면 상세: 영어 정답(핵심 표현 강조), 대체 표현, 사용 팁
import type { Sentence } from "@/lib/schema";
import { DetailSection } from "./DetailSection";
import { HighlightedText } from "./HighlightedText";
import { SpeakButton } from "./SpeakButton";

interface SentenceDetailsProps {
  sentence: Sentence;
  showKorean?: boolean;
}

/** 대체 표현 (더 정중하게 / 더 간단하게) */
function Alternatives({ sentence }: { sentence: Sentence }) {
  const alt = sentence.alternatives;
  if (!alt?.polite && !alt?.simple) return null;
  return (
    <DetailSection icon="🔁" title="대체 표현">
      {alt.polite && (
        <p>
          <span className="text-xs text-muted-foreground">더 정중하게 </span>
          {alt.polite}
        </p>
      )}
      {alt.simple && (
        <p>
          <span className="text-xs text-muted-foreground">더 간단하게 </span>
          {alt.simple}
        </p>
      )}
    </DetailSection>
  );
}

/** 문장 상세 전체 */
export function SentenceDetails({ sentence, showKorean = false }: SentenceDetailsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-1">
        <p className="flex-1 text-lg font-semibold leading-snug">
          <HighlightedText text={sentence.en} chunks={sentence.keyChunks} />
        </p>
        <SpeakButton text={sentence.en} className="-mt-1" />
      </div>
      {showKorean && <p className="text-sm text-muted-foreground">→ {sentence.ko}</p>}
      <Alternatives sentence={sentence} />
      {sentence.usageNote && <DetailSection icon="💡" title="사용 팁">{sentence.usageNote}</DetailSection>}
      {sentence.localTip && <DetailSection icon="🇩🇪" title="현지 팁">{sentence.localTip}</DetailSection>}
    </div>
  );
}
