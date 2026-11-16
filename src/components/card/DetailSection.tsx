// 카드 뒷면의 구획 (예문, 함께 쓰는 표현, 암기 팁 등)
import type { ReactNode } from "react";

interface DetailSectionProps {
  icon: string;
  title: string;
  children: ReactNode;
}

/** 제목 + 내용 블록 */
export function DetailSection({ icon, title, children }: DetailSectionProps) {
  return (
    <section className="border-t pt-3">
      <h3 className="mb-1 text-xs font-semibold text-muted-foreground">
        <span aria-hidden>{icon}</span> {title}
      </h3>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}
