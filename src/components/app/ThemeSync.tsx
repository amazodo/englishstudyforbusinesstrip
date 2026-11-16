"use client";

// 설정(시스템/라이트/다크)에 맞춰 <html>에 dark 클래스를 적용
import { useEffect } from "react";
import { useProgressStore } from "@/store/useProgressStore";

const DARK_QUERY = "(prefers-color-scheme: dark)";

/** 테마 동기화 (화면에는 아무것도 그리지 않음) */
export function ThemeSync() {
  const theme = useProgressStore((s) => s.settings.theme);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const apply = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      document.documentElement.classList.toggle("dark", dark);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);

  return null;
}
