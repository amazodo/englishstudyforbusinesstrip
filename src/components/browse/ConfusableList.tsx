// 헷갈리는 쌍 목록
import type { Confusable } from "@/lib/schema";

/** 헷갈리는 쌍 카드 하나 */
function ConfusableCard({ item }: { item: Confusable }) {
  return (
    <article className="space-y-2 rounded-2xl border p-4">
      <h3 className="font-semibold">⚖️ {item.title}</h3>
      <ul className="space-y-1.5">
        {item.items.map((entry) => (
          <li key={entry.term} className="text-sm">
            <span className="font-semibold">{entry.term}</span>{" "}
            <span className="text-muted-foreground">({entry.meaningKo})</span> — {entry.explanationKo}
          </li>
        ))}
      </ul>
      <p className="rounded-lg bg-muted p-2 text-sm font-medium">👉 {item.keyDifferenceKo}</p>
      {item.example && (
        <p className="text-sm">
          {item.example.en}
          <br />
          <span className="text-muted-foreground">→ {item.example.ko}</span>
        </p>
      )}
      {item.mnemonic && <p className="text-sm">💡 {item.mnemonic}</p>}
    </article>
  );
}

/** 헷갈리는 쌍 전체 */
export function ConfusableList({ items }: { items: Confusable[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ConfusableCard key={item.id} item={item} />
      ))}
    </div>
  );
}
