// 화면 표시용 라벨
import type { Domain, ScenarioCode, TermCategory, Track } from "./schema";

export const TRACK_LABELS: Record<Track, string> = {
  audit: "점검",
  travel: "출장",
};

export const DOMAIN_LABELS: Record<Domain, string> = {
  iso26262: "ISO 26262",
  aspice: "ASPICE",
  sotif: "SOTIF",
  general: "일반",
};

export const CATEGORY_LABELS: Record<TermCategory, string> = {
  A1: "점검 일반",
  A2: "안전 관리 (Part 2)",
  A3: "컨셉 단계 (Part 3)",
  A4: "시스템 (Part 4)",
  A5: "하드웨어 (Part 5)",
  A6: "소프트웨어 (Part 6)",
  A7: "지원 프로세스 (Part 8)",
  A8: "분석 기법 (Part 9)",
  A9: "회의 진행 표현",
  A10: "ASPICE",
  A11: "SOTIF",
  A12: "질문·답변·반박·설득",
  A13: "비즈니스·회의 일반",
  B1: "공항·입국",
  B2: "교통",
  B3: "호텔",
  B4: "식당·비즈니스 디너",
  B5: "일상·긴급",
  B6: "독일 출장 팁",
};

export const SCENARIO_LABELS: Record<ScenarioCode, string> = {
  S1: "오프닝 미팅",
  S2: "증거·문서 요청",
  S3: "질문 (Audit·프로세스)",
  S4: "질문 (Assessment·산출물)",
  S5: "되묻기·확인",
  S6: "지적사항 설명",
  S7: "클로징 미팅",
  S8: "반박·설득·협상",
  T1: "공항·입국심사",
  T2: "교통",
  T3: "호텔",
  T4: "식당·비즈니스 디너",
  T5: "스몰토크·네트워킹",
  T6: "길찾기·쇼핑",
  T7: "긴급상황",
};

const GROUP_LABELS: Record<string, string> = { ...CATEGORY_LABELS, ...SCENARIO_LABELS };

/** 카테고리 또는 시나리오 코드를 화면 라벨로 */
export function groupLabel(code: string): string {
  return GROUP_LABELS[code] ?? code;
}
