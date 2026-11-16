"use client";

// 진도 초기화 (브라우저 확인창 대신 2단계 버튼으로 실수 방지)
import { useState } from "react";
import { useProgressStore } from "@/store/useProgressStore";

/** 진도 초기화 영역 */
export function ResetProgress() {
  const resetProgress = useProgressStore((s) => s.resetProgress);
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)}
        className="min-h-12 w-full rounded-xl border border-destructive/40 text-sm font-medium text-destructive">
        학습 진도 초기화
      </button>
    );
  }
  return (
    <div className="space-y-2 rounded-xl border border-destructive/40 p-3">
      <p className="text-sm">모든 학습 기록이 삭제되며 되돌릴 수 없습니다. 계속할까요?</p>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setConfirming(false)} className="min-h-12 rounded-xl border text-sm">
          취소
        </button>
        <button type="button"
          onClick={() => {
            resetProgress();
            setConfirming(false);
          }}
          className="min-h-12 rounded-xl bg-destructive text-sm font-semibold text-white">
          초기화
        </button>
      </div>
    </div>
  );
}
