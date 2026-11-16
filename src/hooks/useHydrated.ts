// 정적 HTML과 localStorage 진도가 다를 때 생기는 하이드레이션 불일치를 막기 위한 훅
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** 클라이언트에서 마운트된 뒤에만 true */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
