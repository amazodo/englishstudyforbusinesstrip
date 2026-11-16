"use client";

// 하단 고정 내비게이션 (한 손 엄지 조작 기준)
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardCheck, House, List, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "홈", icon: House },
  { href: "/study/", label: "학습", icon: BookOpen },
  { href: "/quiz/", label: "테스트", icon: ClipboardCheck },
  { href: "/browse/", label: "목록", icon: List },
  { href: "/settings/", label: "설정", icon: Settings },
] as const;

/** 현재 경로가 메뉴에 해당하는지 */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

/** 하단 탭 바 */
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs",
                isActive(pathname, href) ? "text-primary font-semibold" : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" aria-hidden />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
