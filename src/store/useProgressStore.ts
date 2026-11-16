// 학습 진도·설정 저장소 (기기 localStorage에 저장, 외부 전송 없음)
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  DEFAULT_AUDIT_RATIO,
  DEFAULT_NEW_SENTENCES_PER_DAY,
  DEFAULT_NEW_TERMS_PER_DAY,
  DEFAULT_VISIT_DATE,
  SPEECH_RATE_NORMAL,
  STORAGE_KEY,
  STORAGE_VERSION,
} from "@/lib/constants";
import type { StudyItem } from "@/lib/cards";
import { todayString } from "@/lib/dates";
import { type Grade, type ProgressMap, type TrackFilter, nextProgress } from "@/lib/srs";

export type ThemeMode = "system" | "light" | "dark";

export interface Settings {
  visitDate: string;
  newTermsPerDay: number;
  newSentencesPerDay: number;
  auditRatio: number;
  includeLowPriority: boolean;
  speechRate: number;
  theme: ThemeMode;
}

export interface DailyStat {
  reviewed: number;
  newTerms: number;
  newSentences: number;
}

interface ProgressState {
  progress: ProgressMap;
  daily: Record<string, DailyStat>;
  settings: Settings;
  trackFilter: TrackFilter;
  gradeCard: (key: string, item: StudyItem, grade: Grade) => void;
  recordQuizAnswer: (key: string, correct: boolean) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  setTrackFilter: (filter: TrackFilter) => void;
  resetProgress: () => void;
}

export const DEFAULT_SETTINGS: Settings = {
  visitDate: DEFAULT_VISIT_DATE,
  newTermsPerDay: DEFAULT_NEW_TERMS_PER_DAY,
  newSentencesPerDay: DEFAULT_NEW_SENTENCES_PER_DAY,
  auditRatio: DEFAULT_AUDIT_RATIO,
  includeLowPriority: false,
  speechRate: SPEECH_RATE_NORMAL,
  theme: "system",
};

export const EMPTY_DAILY: DailyStat = { reviewed: 0, newTerms: 0, newSentences: 0 };

/** 오늘 통계에 학습 1건 반영 (처음 본 카드면 새 카드 수도 증가) */
function bumpDaily(stat: DailyStat | undefined, item: StudyItem, isNew: boolean): DailyStat {
  const base = stat ?? EMPTY_DAILY;
  return {
    reviewed: base.reviewed + 1,
    newTerms: base.newTerms + (isNew && item.kind === "term" ? 1 : 0),
    newSentences: base.newSentences + (isNew && item.kind === "sentence" ? 1 : 0),
  };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: {},
      daily: {},
      settings: DEFAULT_SETTINGS,
      trackFilter: "all",
      gradeCard: (key, item, grade) =>
        set((state) => {
          const today = todayString();
          const prev = state.progress[key];
          return {
            progress: { ...state.progress, [key]: nextProgress(prev, grade, today) },
            daily: { ...state.daily, [today]: bumpDaily(state.daily[today], item, !prev) },
          };
        }),
      // 테스트 결과 기록: 아직 학습하지 않은 카드라도 틀리면 Box 0으로 복습 대기열에 넣는다
      recordQuizAnswer: (key, correct) =>
        set((state) => {
          const prev = state.progress[key];
          if (!prev) {
            if (correct) return {};
            return { progress: { ...state.progress, [key]: nextProgress(undefined, "again", todayString()) } };
          }
          const updated = correct
            ? { ...prev, correctCount: prev.correctCount + 1 }
            : { ...prev, wrongCount: prev.wrongCount + 1 };
          return { progress: { ...state.progress, [key]: updated } };
        }),
      updateSettings: (patch) => set((state) => ({ settings: { ...state.settings, ...patch } })),
      setTrackFilter: (trackFilter) => set({ trackFilter }),
      resetProgress: () => set({ progress: {}, daily: {} }),
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => localStorage),
      // 새 설정 항목이 추가돼도 기본값이 채워지도록 병합
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<ProgressState>;
        return { ...current, ...saved, settings: { ...DEFAULT_SETTINGS, ...saved.settings } };
      },
    },
  ),
);
