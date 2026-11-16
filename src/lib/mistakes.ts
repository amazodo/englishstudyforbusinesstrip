// 오답 노트: 틀린 적 있는 카드를 많이 틀린 순서로
import { type CardRef, refFromKey } from "./cards";
import type { CardProgress, ProgressMap, TrackFilter } from "./srs";

export interface MistakeEntry {
  card: CardRef;
  progress: CardProgress;
}

/** 오답 목록 (오답 수 많은 순 → 박스 낮은 순) */
export function collectMistakes(progress: ProgressMap, filter: TrackFilter): MistakeEntry[] {
  const entries: MistakeEntry[] = [];
  for (const [key, p] of Object.entries(progress)) {
    if (p.wrongCount === 0) continue;
    const card = refFromKey(key);
    if (!card) continue;
    if (filter !== "all" && card.item.data.track !== filter) continue;
    entries.push({ card, progress: p });
  }
  return entries.sort(
    (a, b) => b.progress.wrongCount - a.progress.wrongCount || a.progress.box - b.progress.box,
  );
}
