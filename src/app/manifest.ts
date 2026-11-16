// PWA 매니페스트: 홈 화면 설치 시 앱 이름·아이콘·색상
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/** 웹 앱 매니페스트 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Audit English 26262",
    short_name: "Audit English",
    description: "ISO 26262 현장 점검과 독일 출장을 위한 영어 학습",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#1d4ed8",
    lang: "ko",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
