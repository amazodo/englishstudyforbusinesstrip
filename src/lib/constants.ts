// 앱 전역 상수 (매직 넘버 금지 원칙에 따라 한곳에 모음)

/** 독일 협력사 방문 예정일 (설정에서 변경 가능) */
export const DEFAULT_VISIT_DATE = "2026-11-30";

/** 라이트너 박스별 다음 복습까지의 일수 (Box 0 ~ 4) */
export const SRS_INTERVAL_DAYS = [0, 1, 2, 4, 7] as const;
export const MAX_BOX = 4;
/** 이 박스 이상이 되면 용어의 한→영 카드가 열린다 */
export const KO2EN_UNLOCK_BOX = 3;
/** "몰랐음" 카드를 세션 안에서 다시 보여줄 때 뒤로 미루는 칸 수 */
export const REQUEUE_OFFSET = 4;

export const DEFAULT_NEW_TERMS_PER_DAY = 26;
export const DEFAULT_NEW_SENTENCES_PER_DAY = 18;
/** 새 카드 중 점검 트랙 비율 (나머지는 출장 트랙) */
export const DEFAULT_AUDIT_RATIO = 0.8;
export const MAX_NEW_PER_DAY = 60;

/** "5분만 하기" 세션의 카드 수 */
export const QUICK_SESSION_SIZE = 20;

export const QUIZ_QUESTION_COUNT = 10;
export const QUIZ_OPTION_COUNT = 4;

export const SPEECH_RATE_NORMAL = 0.9;
export const SPEECH_RATE_SLOW = 0.7;
export const SPEECH_LANG = "en-US";

/** ASPICE + SOTIF 비중 상한 (점검 트랙 기술 콘텐츠 대비) */
export const MAX_SUPPORT_DOMAIN_RATIO = 0.2;

export const STORAGE_KEY = "audit-english-progress";
export const STORAGE_VERSION = 1;

export const PERCENT = 100;
