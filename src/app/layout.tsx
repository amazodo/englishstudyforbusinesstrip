import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BottomNav } from "@/components/app/BottomNav";
import { ServiceWorkerRegister } from "@/components/app/ServiceWorkerRegister";
import { ThemeSync } from "@/components/app/ThemeSync";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audit English 26262",
  description: "ISO 26262 현장 점검과 독일 출장을 위한 영어 단어·문장 암기 앱",
  applicationName: "Audit English",
  appleWebApp: { capable: true, title: "Audit English", statusBarStyle: "default" },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/** 공통 레이아웃: 모바일 폭 컨테이너 + 하단 탭 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeSync />
        <ServiceWorkerRegister />
        <main className="mx-auto min-h-dvh max-w-md px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-28">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
