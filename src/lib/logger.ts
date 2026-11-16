// 경량 로거: 개발 모드에서만 debug/info를 출력하고, 경고·오류는 항상 남긴다.

type LogArgs = readonly unknown[];

const PREFIX = "[audit-english]";
const isDev = process.env.NODE_ENV !== "production";

/** 앱 전용 로거 (console 직접 호출 대신 사용) */
export const logger = {
  debug: (...args: LogArgs): void => {
    if (isDev) console.debug(PREFIX, ...args);
  },
  info: (...args: LogArgs): void => {
    if (isDev) console.info(PREFIX, ...args);
  },
  warn: (...args: LogArgs): void => {
    console.warn(PREFIX, ...args);
  },
  error: (...args: LogArgs): void => {
    console.error(PREFIX, ...args);
  },
};
