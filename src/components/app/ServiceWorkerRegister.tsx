"use client";

// 오프라인 사용을 위한 Service Worker 등록 (운영 빌드에서만)
import { useEffect } from "react";
import { logger } from "@/lib/logger";
import { warmUpVoices } from "@/lib/tts";

/** SW 등록 + 음성 목록 미리 로드 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    warmUpVoices();
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => logger.info("Service Worker 등록 완료"))
      .catch((error: unknown) => logger.error("Service Worker 등록 실패", error));
  }, []);

  return null;
}
