import type { NextConfig } from "next";

// 정적 export: 서버 없이 Vercel/GitHub Pages에 올리고 PWA로 오프라인 캐시하기 위함
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
