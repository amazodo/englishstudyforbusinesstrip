# Audit English 26262

ISO 26262 현장 점검과 독일 출장을 위한 영어 단어·문장 암기 PWA. 요구사항은 [PRD.md](PRD.md) 참고.

## 개발 명령어

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (http://localhost:3000) |
| `npm run validate` | 콘텐츠 검증 (스키마, ID 중복, 참조, ASPICE·SOTIF 비중 20% 미만) |
| `npm run build` | 검증 → 정적 빌드(`out/`) → Service Worker 생성 |
| `npm run preview` | 빌드 결과를 http://localhost:4173 에서 확인 (오프라인 동작 포함) |
| `npm run typecheck` / `npm run lint` | 타입 체크 / 린트 |
| `npm run icons` | 앱 아이콘 PNG 다시 생성 |

> Service Worker는 운영 빌드(`npm run build`)에서만 등록된다. 오프라인 확인은 `preview`로 한다.

## 폰에 배포하기 (Vercel 무료)

1. GitHub에 새 저장소를 만들고 이 폴더를 push
2. https://vercel.com 에서 GitHub로 로그인 → **Add New Project** → 저장소 선택
3. 설정은 기본값 그대로 (Framework: Next.js, Build Command: `npm run build`, Output Directory: `out`) → **Deploy**
4. 발급된 `https://<프로젝트>.vercel.app` 주소를 폰에서 열기
   - Android Chrome: ⋮ 메뉴 → "홈 화면에 추가" / "앱 설치"
   - iPhone Safari: 공유 버튼 → "홈 화면에 추가"
5. 이후 콘텐츠를 수정해 push하면 약 1분 뒤 자동 반영된다 (앱을 한 번 닫았다 열면 새 버전 적용).

## 콘텐츠 추가하기

```
src/content/
  terms/a1.json …      # 용어 (카테고리별 파일: a1~a12 점검, b1~b6 출장)
  sentences/s1.json …  # 문장 (시나리오별 파일: s1~s8 점검, t1~t7 출장)
  confusables.json     # 헷갈리는 쌍
  index.ts             # ← 새 파일을 만들면 여기에 import 추가 (배열 순서 = 학습 순서)
```

- ID 규칙: 용어 `T-A3-007`, 문장 `S-S2-004`, 혼동 쌍 `C-001`
- 필드 정의는 [src/lib/schema.ts](src/lib/schema.ts) (PRD 5장과 같음)
- `index.ts`에 등록하지 않은 파일이 있으면 `npm run validate`가 실패한다.

## 구조

| 경로 | 역할 |
|---|---|
| `src/lib/srs.ts`, `src/lib/queue.ts` | 라이트너 5단계 간격 반복, 오늘의 대기열 (하루 상한·트랙 비율) |
| `src/store/useProgressStore.ts` | 진도·설정 (Zustand + localStorage, 외부 전송 없음) |
| `src/lib/tts.ts` | 미국식(en-US) 발음 듣기 (Web Speech API) |
| `src/lib/quiz.ts` | 객관식 문제 생성 (같은 카테고리에서 오답 보기 선택) |
| `src/lib/practice.ts` | 빈칸 채우기·받아쓰기·말하기 문제 생성 |
| `src/lib/textMatch.ts` | 입력 채점 (대소문자·문장부호 무시, 단어 단위 LCS 비교) |
| `src/hooks/useSpeechRecognition.ts` | 말하기 연습용 음성 인식 (en-US, 인터넷 필요) |
| `src/lib/mistakes.ts` | 오답 노트 (틀린 횟수 순) |

## 화면

| 경로 | 내용 |
|---|---|
| `/` | D-Day, 오늘 학습, 치트시트·오답 노트 바로가기, 숙지 현황 |
| `/study/` | 플래시카드 간격 반복 학습 |
| `/quiz/` | 객관식 / 빈칸 채우기 / 받아쓰기 / 말하기 |
| `/browse/`, `/card/?id=…` | 목록·검색, 카드 상세 |
| `/cheatsheet/` | 상황별 핵심 문장 (현장 참조용) |
| `/mistakes/` | 오답 노트 + 집중 학습 |
| `/settings/` | 학습량, 발음 속도, 테마, 초기화 |
| `scripts/generate-sw.mjs` | 빌드 결과 전체를 사전 캐시하는 Service Worker 생성 |
