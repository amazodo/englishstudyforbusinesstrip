"use client";

// 설정: 학습량, 트랙 비율, 발음, 테마, 진도 초기화, 설치 안내
import { PageHeader } from "@/components/app/PageHeader";
import { ResetProgress } from "@/components/settings/ResetProgress";
import { SettingsForm } from "@/components/settings/SettingsForm";
import { useHydrated } from "@/hooks/useHydrated";

/** 홈 화면 설치 안내 */
function InstallGuide() {
  return (
    <section className="space-y-2 rounded-2xl border p-4 text-sm">
      <h2 className="font-semibold">📱 홈 화면에 설치하기</h2>
      <p>
        <b>Android (Chrome)</b>: 오른쪽 위 ⋮ 메뉴 → &quot;홈 화면에 추가&quot; 또는 &quot;앱 설치&quot;
      </p>
      <p>
        <b>iPhone (Safari)</b>: 아래 공유 버튼 → &quot;홈 화면에 추가&quot;
      </p>
      <p className="text-muted-foreground">설치 후에는 비행기·공장처럼 인터넷이 없는 곳에서도 사용할 수 있습니다.</p>
    </section>
  );
}

/** 설정 화면 */
export default function SettingsPage() {
  const hydrated = useHydrated();
  return (
    <>
      <PageHeader title="설정" />
      {hydrated ? (
        <div className="space-y-6">
          <SettingsForm />
          <InstallGuide />
          <ResetProgress />
        </div>
      ) : (
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      )}
    </>
  );
}
