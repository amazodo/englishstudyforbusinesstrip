// 각 화면 상단 제목 영역
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

/** 화면 제목 + 오른쪽 액션 */
export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3 pb-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
