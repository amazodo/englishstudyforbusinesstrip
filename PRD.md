# PRD: ISO 26262 현장 점검 + 해외출장 영어 학습 앱 (가칭 "Audit English 26262")

| 항목 | 내용 |
|---|---|
| 문서 버전 | v1.2 |
| 작성일 | 2026-11-16 |
| 목표 사용 시점 | 2026-11-30 전후 독일 협력사 방문 점검 (D-14) |
| 사용자 | ISO 26262 기능안전 점검 담당자 1인 (본인) |
| 사용 기기 | 스마트폰 (주 사용), PC (콘텐츠 관리) |

### 변경 이력
| 버전 | 일자 | 내용 |
|---|---|---|
| v0.1 | 2026-11-16 | 초안 |
| v1.0 | 2026-11-16 | 확인 사항 반영: 점검 유형 Audit + Assessment/Confirmation Review 둘 다, 시스템/HW/SW 전체, ASPICE·SOTIF 포함 (기술 콘텐츠의 20% 미만), 미국식 발음, 해외출장 회화 트랙 추가, 체크리스트 처리 방침 결정 |
| v1.2 | 2026-11-16 | 표준 용어 50% 축소(157 → 78), 회의 표현(A9 +12), 질문·반박·설득(A12 +20), 비즈니스 일반(A13 신설 35), 출장 용어(+12)로 대체. 총 용어 350 유지 |
| v1.1 | 2026-11-16 | 분량 확대: 용어 270 → **350** (A12 질문·답변·반박·설득 용어 80개 추가), 문장 210 → **250** (S8 반박·설득·협상 문장 40개 추가). 하루 학습량 조정 |

---

## 1. 배경 및 문제 정의

### 1.1 배경
- 2주 뒤 독일 협력사를 방문해 ISO 26262 기능안전 점검을 진행한다. 점검은 **프로세스 중심의 Functional Safety Audit**과 **작업 산출물 중심의 Functional Safety Assessment / Confirmation Review**를 모두 포함한다.
- 점검 범위는 **시스템, 하드웨어, 소프트웨어 전체**(ISO 26262 Part 2~9)다.
- 점검은 영어로 진행된다. 회의 진행, 증거 요청, 질문, 지적사항 설명, 종료 회의까지 모두 영어로 해야 한다.
- 점검 외에 **출장 생활(공항, 교통, 호텔, 식당, 비즈니스 디너, 스몰토크)**에서도 영어가 필요하다.
- 최근 영어 사용이 줄어 단어와 표현이 바로 떠오르지 않는다.

### 1.2 해결할 문제
1. **시간 부족**: 남은 기간은 14일이고, 출퇴근·이동 같은 자투리 시간에 폰으로만 공부할 수 있다.
2. **일반 영어 앱과 맞지 않음**: 시중 앱에는 ASIL, Safety Goal, Confirmation Measure 같은 ISO 26262 용어와 점검 상황 문장이 없다.
3. **"아는 것"과 "말할 수 있는 것"의 차이**: 단어 뜻을 아는 것과 회의 중에 영어 문장으로 바로 말하는 것은 다르다.
4. **현장 네트워크 제약**: 비행기 안, 협력사 공장, 보안구역에서는 인터넷이 안 될 수 있다.

### 1.3 목표
| 목표 | 측정 지표 |
|---|---|
| 점검 핵심 용어 암기 | 필수(우선순위 1) 기술 용어 중 90% 이상을 "숙지"(Box 4) 상태로 만들기 |
| 점검 상황 문장 구사 | 필수 점검 문장 중 80% 이상을 한→영 변환으로 통과 |
| 출장 회화 대응 | 필수 출장 회화 문장 중 80% 이상을 한→영 변환으로 통과 |
| 매일 꾸준히 학습 | D-14 ~ D-1 중 12일 이상 학습 |
| 현장에서 빠른 참조 | 앱 실행 후 원하는 표현을 3초 안에 찾기 (검색·상황별 치트시트) |

### 1.4 범위 밖 (Non-Goals)
- 여러 사용자, 회원가입, 로그인
- ISO 21434(사이버보안) 용어
- 독일어 학습 (단, 출장에 유용한 독일어 인사말 몇 개와 독일 문화 팁은 참고로 포함)
- AI 실시간 대화 롤플레이 (2차 확장 후보)

---

## 2. 전달 방식 분석 및 결정

### 2.1 후보 비교

| 평가 기준 (가중치) | 텔레그램 봇 | 카카오톡 채널/챗봇 | Streamlit (Community Cloud) | **PWA 웹앱 (Next.js 정적 배포)** |
|---|---|---|---|---|
| 접속 편의성 (25%) | ◎ 앱 안에서 바로 사용 | ◎ 익숙함 | △ URL 접속, 처음 열 때 느림(슬립) | ◎ 홈 화면 아이콘으로 한 번에 실행 |
| 오프라인 사용 (20%) | ✕ | ✕ | ✕ | ◎ Service Worker 캐시 |
| 학습 UI 표현력 (20%) | △ 텍스트·버튼·퀴즈 투표만 가능 | ✕ 템플릿 제약이 큼 | ○ 가능하지만 모바일 UX가 투박함 | ◎ 카드 뒤집기, 스와이프, 발음 듣기 등 자유 |
| 테스트·진도 관리 (15%) | ○ 서버 DB 필요 | △ 스킬 서버 필요 | ○ 세션이 끊기면 상태가 날아감 | ◎ 기기 로컬 저장 (localStorage/IndexedDB) |
| 구축·운영 부담 (10%) | △ 봇 서버를 계속 띄워야 함 | ✕ 채널 개설·심사·스킬 서버 | ○ 무료 호스팅 가능 | ◎ 무료 정적 호스팅, 서버 없음 |
| 발음 듣기 (TTS) (10%) | △ 음성 파일을 미리 만들어야 함 | ✕ | △ | ◎ 브라우저 내장 Web Speech API |
| **종합** | 2위 | 4위 | 3위 | **1위** |

### 2.2 결정: **PWA 웹앱 (Next.js 정적 export + Vercel 무료 배포)**

**결정 이유**
1. **오프라인 필수**: 비행기와 공장 현장에서도 써야 하는데, 오프라인을 지원하는 후보는 PWA뿐이다. 출장 회화 트랙은 특히 공항·이동 중에 볼 일이 많다.
2. **접속이 가장 빠름**: 한 번 "홈 화면에 추가"하면 일반 앱처럼 아이콘을 눌러 바로 실행된다. Streamlit처럼 처음 열 때 수십 초씩 기다리지 않는다.
3. **학습 효과를 내는 UI 구현 가능**: 간격 반복(SRS), 카드 뒤집기, 빈칸 채우기, 받아쓰기 같은 학습 방식을 제약 없이 만들 수 있다.
4. **운영 부담 없음**: 서버와 DB가 없다. 콘텐츠는 이 프로젝트의 JSON 파일로 관리하고, 수정한 뒤 다시 배포하면 폰에 반영된다.
5. **선호 기술 스택과 일치**: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Zustand.

**보조 채널 (2차 확장, 선택)**: 텔레그램 봇으로 매일 아침 "오늘의 복습 N개 + 앱 링크"를 알림으로 보낸다. 학습은 PWA에서 하고, 텔레그램은 리마인더로만 쓴다.

### 2.3 폰에서 쓰기까지의 흐름
```
[PC] 콘텐츠 JSON 작성/수정 → git push
        ↓ (Vercel 자동 배포, 약 1분)
[폰] https://<프로젝트>.vercel.app 접속
        → Android Chrome: 메뉴 → "홈 화면에 추가"
        → iPhone Safari: 공유 → "홈 화면에 추가"
        → 이후 아이콘으로 실행, 오프라인에서도 동작
```

---

## 3. 학습 설계 (영어 학습 전문가 관점)

### 3.1 적용하는 학습 원칙
| 원칙 | 근거 | 앱 적용 방식 |
|---|---|---|
| **간격 반복 (Spaced Repetition)** | 잊어버리기 직전에 복습하면 기억이 가장 오래 간다 (망각 곡선) | 라이트너 5단계 박스. 14일 일정에 맞게 간격을 줄임 (아래 3.4) |
| **능동 회상 (Active Recall)** | 다시 읽기보다 떠올려보는 것이 기억에 2~3배 효과적이다 | 카드 앞면만 보고 먼저 떠올린 다음 뒤집기. 정답은 스스로 채점 |
| **맥락 학습 (Context)** | 단어만 외우면 회의에서 바로 꺼내 쓰기 어렵다 | 모든 단어에 실제 사용 상황 예문을 붙임 |
| **덩어리 표현 (Chunking/Collocation)** | 원어민은 단어가 아니라 덩어리로 말한다 | `conduct an audit`, `raise a finding`, `check in`처럼 연어(collocation) 표현을 함께 학습 |
| **양방향 학습** | 영→한(이해)과 한→영(말하기)은 다른 능력이다 | 단어는 영→한부터 시작해 숙달되면 한→영. 문장은 한→영 중심 |
| **이중 부호화 (Dual Coding)** | 소리와 글자를 함께 접하면 기억이 강화된다 | 모든 카드에 TTS 발음 듣기(**미국식 en-US**), 발음 기호, 강세 표시 |
| **혼동 쌍 대비 (Contrast)** | 비슷한 개념은 나란히 놓고 비교해야 구분된다 | Verification vs Validation, Audit vs Assessment 등 "헷갈리는 쌍" 카드 |
| **기억 고리 (Mnemonic)** | 어원이나 연상이 있으면 오래 기억한다 | 어원 분해, 연상법, 한국어 발음 함정 메모 |
| **상황 시뮬레이션** | 실제 쓸 상황 순서대로 연습하면 꺼내 쓰기 쉽다 | 점검 일정 순서, 출장 동선 순서로 문장 묶음 구성 |
| **인터리빙 (섞어서 학습)** | 한 주제만 몰아서 하는 것보다 섞어서 하면 오래 기억한다 | 하루 세션에 점검 트랙과 출장 트랙을 섞어서 출제 (비율은 설정에서 조정) |

### 3.2 학습 트랙
앱은 두 개의 트랙으로 나뉜다. 홈 화면에서 "전체 / 점검 / 출장"으로 필터링할 수 있다.

| 트랙 | 내용 | 콘텐츠 비중 |
|---|---|---|
| **점검 트랙 (Audit)** | ISO 26262 (주력) + ASPICE·SOTIF (보조) 용어, 질문·답변·반박·설득 표현, 점검 상황 문장 | 약 80% |
| **출장 트랙 (Travel)** | 공항, 교통, 호텔, 식당, 비즈니스 디너, 스몰토크, 긴급상황 | 약 20% |

**점검 트랙 내부 비중 원칙**: ASPICE + SOTIF 콘텐츠는 점검 트랙 기술 콘텐츠의 **20% 미만**(목표 약 12%)으로 제한한다. ISO 26262는 시스템(Part 4), HW(Part 5), SW(Part 6)를 고르게 다룬다.

### 3.3 콘텐츠 구성

#### A. 점검 트랙 용어 — 278개
> v1.2: 사용자가 표준 용어에 익숙하므로 **표준 용어(A2~A8, A10, A11)를 157개 → 78개로 50% 축소**하고, 줄어든 분량을 회의·협상·비즈니스 일반 표현으로 채운다. 표준 용어는 실무자가 헷갈리기 쉬운 것과 발음·영어 표현이 까다로운 것 위주로 남긴다.

| 카테고리 | 예시 | 개수(목표) |
|---|---|---|
| A1. 점검 일반 | audit, assessment, finding, observation, nonconformity, evidence, corrective action, root cause, scope, sampling | 35 |
| A2. 안전 관리 (Part 2) | safety plan, safety case, confirmation measures, confirmation review, independence, tailoring, impact analysis | 11 |
| A3. 컨셉 단계 (Part 3) | item definition, HARA, severity, exposure, controllability, ASIL, safety goal, safe state, FTTI | 11 |
| A4. 시스템 (Part 4) | TSC, safety mechanism, redundancy, fault injection, safety validation, verification | 9 |
| A5. 하드웨어 (Part 5) | SPFM, LFM, PMHF, diagnostic coverage, single-point fault, latent fault | 9 |
| A6. 소프트웨어 (Part 6) | freedom from interference, MC/DC, static analysis, coding guidelines, back-to-back test | 9 |
| A7. 지원 프로세스 (Part 8) | configuration management, change management, tool qualification, DIA, traceability | 9 |
| A8. 분석 기법 (Part 9) | FMEA, FTA, DFA, ASIL decomposition, common cause failure, cascading failure | 6 |
| A9. 회의 진행 동사·표현 | clarify, elaborate, walk through, justify, go over, wrap up, align, escalate | 30 |
| **A10. ASPICE** (보조) | capability level, base practice, rating (N/P/L/F), bidirectional traceability, VDA scope | 8 |
| **A11. SOTIF** (보조) | triggering condition, functional insufficiency, unknown unsafe scenario, ODD | 6 |
| A12. 질문·답변·반박·설득 | 질문: inquire, specify, substantiate / 답변: acknowledge, concede, confirm / 반박: dispute, contradict, insufficient, inconsistent / 설득: compelling, rationale, consequence, mandatory / 협상: compromise, interim measure, commitment | 100 |
| **A13. 비즈니스·회의 일반** (신설) | reschedule, attendee, minutes, deliverable, milestone, lead time, prototype, defect, ramp-up, out of office | 35 |
| **소계** | 표준 용어 78개 (전 버전 157개 대비 50%). ASPICE+SOTIF 14개 / 기술 용어 113개(A1~A8, A10, A11) = **약 12%** (A9·A12·A13은 의사소통 용어라 비중 계산에서 제외) | **278** |

#### B. 점검 트랙 문장 — 약 150개, 점검 진행 순서대로
| 상황(시나리오) | 예시 문장 | 개수 |
|---|---|---|
| S1. 오프닝 미팅 | "The purpose of today's audit is to evaluate compliance with ISO 26262." | 18 |
| S2. 증거·문서 요청 | "Could you show me the evidence for this requirement?" | 22 |
| S3. 질문·인터뷰 (Audit: 프로세스) | "How do you ensure that changes are assessed for their safety impact?" | 22 |
| S4. 질문·인터뷰 (Assessment/Confirmation Review: 산출물) | "Is this safety requirement traceable to the safety goal?" | 25 |
| S5. 되묻기·확인 | "Could you elaborate on that?" / "Just to make sure I understand correctly, ..." | 18 |
| S6. 지적사항 설명 | "We identified a gap in the confirmation review records." | 22 |
| S7. 클로징 미팅 | "To summarize, we have two major findings and three observations." | 13 |
| S8. 반박·설득·협상 | "I understand your point, but the standard explicitly requires this evidence." / "Would it be acceptable to provide an interim measure by the end of this month?" | 40 |
| (S3·S4 중 ASPICE/SOTIF 관련 문장은 각 시나리오 안에서 20% 미만으로 포함) | | |
| **소계** | | **180** |

#### C. 헷갈리는 쌍 (Confusables) — 약 20쌍
예: Verification ↔ Validation, Audit ↔ Assessment, Fault ↔ Error ↔ Failure, Hazard ↔ Risk, Requirement ↔ Specification, Major ↔ Minor finding, ISO 26262 Assessment ↔ ASPICE Assessment, Safety Goal (26262) ↔ SOTIF 수용 기준(Acceptance Criteria)

#### D. 출장 트랙 용어 — 72개
| 카테고리 | 예시 | 개수 |
|---|---|---|
| B1. 공항·입국 | boarding pass, carry-on, layover, customs, baggage claim | 12 |
| B2. 교통 | platform, one-way ticket, fare, delay, rental car | 10 |
| B3. 호텔 | reservation, check-out, amenities, front desk, late check-out | 12 |
| B4. 식당·비즈니스 디너 | reservation for two, recommendation, still/sparkling water, check (bill), tip | 16 |
| B5. 일상·긴급 | pharmacy, receipt, lost and found, exchange rate | 16 |
| B6. 독일 출장 팁 | Danke(감사), Bitte, Prost(건배), Deutsche Bahn, Trinkgeld(팁 문화) | 6 |

#### E. 출장 트랙 문장 — 약 70개, 출장 동선 순서대로
| 상황(시나리오) | 예시 문장 | 개수 |
|---|---|---|
| T1. 공항·입국심사 | "I'm here on business for one week." | 12 |
| T2. 교통 (택시·기차·렌터카) | "Could you take me to this address, please?" | 10 |
| T3. 호텔 | "I have a reservation under the name Kim." | 10 |
| T4. 식당·비즈니스 디너 | "What would you recommend?" / "Thank you for the wonderful dinner." | 14 |
| T5. 스몰토크·네트워킹 | "How long have you been working here?" / "Is this your first time in Korea?" | 14 |
| T6. 길찾기·쇼핑 | "Is it within walking distance?" | 5 |
| T7. 긴급상황 | "I've lost my passport. Where is the nearest police station?" | 5 |

#### 전체 콘텐츠 규모
| 구분 | 용어 | 문장 | 혼동 쌍 |
|---|---|---|---|
| 점검 트랙 | 278 | 180 | 20 |
| 출장 트랙 | 72 | 70 | – |
| **합계** | **350** | **250** | **20** |

> 분량이 많으므로 모든 카드에 우선순위(1=필수, 2=중요, 3=참고)를 매긴다. **기본 학습 대기열에는 우선순위 1·2만** 넣고(약 80%), 우선순위 3은 목록·검색과 "추가 학습"에서만 다룬다.

### 3.4 간격 반복(SRS) 규칙 — 14일 압축형
| 박스 | 의미 | 다음 복습 |
|---|---|---|
| Box 0 | 새 카드 / 틀림 | 같은 세션 안에서 다시 |
| Box 1 | 1회 맞춤 | 1일 후 |
| Box 2 | 2회 연속 맞춤 | 2일 후 |
| Box 3 | 3회 연속 맞춤 | 4일 후 |
| Box 4 | 숙지 | 7일 후 (D-1에는 강제 총복습) |

- 자기채점 버튼 3개: **몰랐음**(→ Box 0) / **애매함**(→ 현재 박스 유지) / **알았음**(→ 한 단계 위)
- 하루 새 카드 상한 (기본값, 설정에서 변경 가능): 용어 26개 + 문장 18개
- 트랙 혼합 비율 (기본값): 점검 80% : 출장 20%

### 3.5 14일 학습 로드맵
| 기간 | 점검 트랙 초점 | 출장 트랙 초점 | 하루 새 카드 | 하루 예상 시간 |
|---|---|---|---|---|
| D-14 ~ D-11 | 점검 일반(A1), Part 2·3(A2·A3), 질문·답변 용어(A9, A12 앞부분) + 오프닝·증거요청(S1·S2) | 공항·교통(B1·B2, T1·T2) | 용어 26 + 문장 18 | 40분 |
| D-10 ~ D-7 | 시스템·HW·SW(A4~A6), 반박·설득 용어(A12 뒷부분), 비즈니스 일반(A13) + 질문·되묻기(S3~S5) | 호텔·식당(B3·B4, T3·T4) | 용어 26 + 문장 18 | 40분 |
| D-6 ~ D-4 | Part 8·9, ASPICE, SOTIF(A7·A8·A10·A11) + 지적·클로징·반박(S6~S8) + 혼동 쌍 | 스몰토크·긴급(B5·B6, T5~T7) | 용어 24 + 문장 16 | 40분 |
| D-3 ~ D-1 | 새 카드 없이 약한 카드 집중 + 점검 시나리오 통 연습 | 출장 동선 통 연습 (공항 → 호텔 → 식당) | 0 | 20~30분 |
| 출국·현장 | 치트시트 빠른 참조 | 출장 치트시트 | – | 수시 |

---

## 4. 기능 요구사항

### 4.1 기능 목록 및 우선순위
| ID | 기능 | 설명 | 우선순위 |
|---|---|---|---|
| F1 | 홈 대시보드 | D-Day 카운트, 오늘 복습할 카드 수, 연속 학습일, 트랙·카테고리별 숙지율 | P0 |
| F2 | 플래시카드 학습 | 앞면 → 탭해서 뒤집기 → 자기채점 3버튼. 스와이프도 지원 | P0 |
| F3 | SRS 엔진 | 3.4 규칙에 따라 다음 복습일 계산, 트랙 혼합 비율에 맞춰 오늘 학습 대기열 생성 | P0 |
| F4 | 발음 듣기 | Web Speech API TTS, **기본 en-US**, 속도 0.8x/1.0x | P0 |
| F5 | 오프라인 지원 | PWA manifest + Service Worker, 콘텐츠·앱 전체 캐시 | P0 |
| F6 | 진도 저장 | 기기 로컬 저장 (Zustand persist → localStorage) | P0 |
| F7 | 객관식 테스트 | 영→한 / 한→영 4지선다, 오답 보기는 같은 카테고리에서 뽑음 | P0 |
| F8 | 목록·검색 | 트랙/카테고리/시나리오별 목록, 영·한 통합 검색 | P0 |
| F9 | 트랙 필터 | 전체 / 점검 / 출장 선택. 학습·테스트·목록에 공통 적용 | P0 |
| F10 | 빈칸 채우기 테스트 (Cloze) | 예문에서 핵심 단어를 가리고 입력 또는 선택 | P1 |
| F11 | 한→영 문장 말하기 연습 | 한국어 문장을 보고 소리 내어 말한 뒤 정답을 보고 자기채점. (선택) 음성 인식으로 비교 | P1 |
| F12 | 받아쓰기 (Listening) | TTS로 듣고 단어나 문장 입력, 철자 비교 | P1 |
| F13 | 상황별 치트시트 | 점검 시나리오(S1~S7)와 출장 시나리오(T1~T7)별 핵심 문장을 한 화면에 모음, 큰 글씨 | P1 |
| F14 | 오답 노트 | 틀린 횟수가 많은 카드만 모아 집중 학습 | P1 |
| F15 | 즐겨찾기 ★ | 카드를 별표하고 별표 카드만 학습 | P2 |
| F16 | 진도 백업/복원 | JSON 내보내기/가져오기 (기기를 바꿀 때) | P2 |
| F17 | 텔레그램 리마인더 | 매일 정해진 시간에 오늘 복습 수 + 링크 발송 | P2 (선택) |

### 4.2 카드 화면 구성 (용어 카드)

**앞면 (영→한 모드)**
```
┌─────────────────────────────┐
│  [점검 · A3 컨셉 단계] ★ 🔊   │
│                             │
│        Controllability       │
│     /kənˌtroʊləˈbɪləti/     │
│        con-TROL-la-BIL-i-ty  │
│                             │
│     (탭해서 뜻 보기)          │
└─────────────────────────────┘
```

**뒷면**
```
┌─────────────────────────────┐
│ 통제 가능성                  │
│ 운전자 등이 위험 상황을 피할    │
│ 수 있는 정도 (C0~C3)          │
│ 📘 ISO 26262-3 Clause 6      │
├─────────────────────────────┤
│ 💬 예문  🔊                   │
│ How did you determine the    │
│ controllability class for    │
│ this hazardous event?        │
│ → 이 위험 사건의 통제 가능성    │
│   등급은 어떻게 결정했나요?     │
├─────────────────────────────┤
│ 🔗 함께 쓰는 표현              │
│ assess controllability /     │
│ controllability class C2     │
├─────────────────────────────┤
│ 💡 암기 팁                    │
│ control + able + ity         │
│ = "통제할 수 있는 정도"         │
│ ⚠️ 강세는 'BIL'에 있음         │
├─────────────────────────────┤
│ ⚖️ 헷갈림 주의: Severity(심각도),│
│   Exposure(노출도)와 함께 S/E/C│
├─────────────────────────────┤
│  [몰랐음]  [애매함]  [알았음]   │
└─────────────────────────────┘
```

**문장 카드 (한→영 모드)**: 앞면에 한국어 문장과 상황 태그, 뒷면에 영어 정답, 핵심 덩어리 표현 하이라이트, 대체 표현(더 정중하게/더 간단하게), TTS.

**출장 카드 추가 요소**: 독일 현지 문화 팁(예: 식당에서 팁은 보통 5~10%, 계산할 때 직접 말함)을 "🇩🇪 현지 팁" 칸에 표시.

### 4.3 UI/UX 요구사항
- **모바일 우선**: 375px 폭 기준으로 설계하고 반응형으로 만든다. 한 손 엄지로 조작할 수 있게 주요 버튼은 화면 하단에 둔다.
- 버튼 터치 영역은 최소 44×44px.
- 트랙을 색으로 구분한다 (예: 점검 = 파랑, 출장 = 초록).
- 다크 모드 지원 (비행기, 야간 학습).
- 세션 길이는 기본 5분 단위로 끊을 수 있게 한다 ("5분만 하기" 버튼). 자투리 시간 학습용.
- 첫 화면에서 "오늘 학습 시작" 버튼까지 한 번 탭.

---

## 5. 데이터 설계

### 5.1 콘텐츠 파일 구조
```
/content
  terms.json          # 용어 (점검 + 출장)
  sentences.json      # 문장 (점검 + 출장)
  confusables.json    # 헷갈리는 쌍
```

### 5.2 공통 타입
```ts
/** 학습 트랙 */
type Track = "audit" | "travel";

/** 출처 표준 (출장 트랙은 general) */
type Domain = "iso26262" | "aspice" | "sotif" | "general";

/** 용어 카테고리: 점검 A1~A13, 출장 B1~B6 */
type TermCategory =
  | "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "A8" | "A9" | "A10" | "A11" | "A12" | "A13"
  | "B1" | "B2" | "B3" | "B4" | "B5" | "B6";

/** 문장 시나리오: 점검 S1~S8, 출장 T1~T7 */
type ScenarioCode =
  | "S1" | "S2" | "S3" | "S4" | "S5" | "S6" | "S7" | "S8"
  | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7";
```

### 5.3 용어 스키마
```ts
/** 용어 카드 */
interface Term {
  id: string;               // "T-A3-007"
  track: Track;
  domain: Domain;
  term: string;             // "Controllability"
  abbreviation?: string;    // 약어 예: "ASIL"
  fullForm?: string;        // 약어 원문 예: "Automotive Safety Integrity Level"
  ipa: string;              // 미국식 발음 기호
  stressHint: string;       // 강세 표시 "con-TROL-la-BIL-i-ty"
  meaningKo: string;        // 한국어 뜻
  definitionEn: string;     // 쉬운 영어 정의 (1문장)
  descriptionKo?: string;   // 보충 설명
  standardRef?: string;     // "ISO 26262-3:2018 Clause 6", "ASPICE 3.1 SWE.4" 등
  category: TermCategory;
  priority: 1 | 2 | 3;      // 1=필수, 2=중요, 3=참고
  example: { en: string; ko: string };
  collocations: string[];   // 함께 쓰는 표현
  mnemonic?: string;        // 암기 팁 (어원·연상)
  pitfall?: string;         // 발음·용법 함정
  localTip?: string;        // 독일 현지 팁 (출장 트랙)
  confusableIds?: string[]; // 헷갈리는 쌍 참조
}
```

### 5.4 문장 스키마
```ts
/** 문장 카드 */
interface Sentence {
  id: string;               // "S-S2-004", "S-T3-002"
  track: Track;
  domain: Domain;
  scenario: ScenarioCode;
  en: string;               // 영어 문장
  ko: string;               // 한국어 뜻
  keyChunks: string[];      // 하이라이트할 덩어리 표현
  alternatives?: {          // 대체 표현
    polite?: string;
    simple?: string;
  };
  usageNote?: string;       // 언제 쓰는지
  localTip?: string;        // 독일 현지 팁 (출장 트랙)
  relatedTermIds?: string[];
  priority: 1 | 2 | 3;
}
```

### 5.5 학습 진도 (로컬 저장)
```ts
/** 카드별 학습 상태 */
interface CardProgress {
  cardId: string;
  direction: "en2ko" | "ko2en";
  box: 0 | 1 | 2 | 3 | 4;
  nextReviewAt: string;     // ISO 날짜
  correctCount: number;
  wrongCount: number;
  lastReviewedAt?: string;
  starred: boolean;
}
```

### 5.6 콘텐츠 품질 기준
- ISO 26262 용어 정의는 ISO 26262:2018 (2nd edition) Part 1과, ASPICE 용어는 Automotive SPICE PAM 3.1/4.0과, SOTIF 용어는 ISO 21448:2022와 의미가 어긋나지 않아야 한다. 표준 원문을 그대로 옮기지 않고 쉬운 말로 다시 쓴다 (저작권).
- 점검 예문은 실제 점검에서 쓸 수 있는 문장으로, 정중하고 중립적인 비즈니스 영어로 쓴다.
- 독일 엔지니어와 대화하는 상황을 고려해 관용구와 슬랭은 피하고, 비원어민끼리 잘 통하는 명확한 표현을 우선한다.
- 출장 회화는 실제로 바로 쓸 수 있는 짧은 문장을 우선한다 (한 문장 12단어 이내 권장).
- 철자와 발음 기호는 미국식으로 통일한다 (예: analyze, behavior, color).
- **콘텐츠 비중 검증**: 빌드할 때 스크립트로 ASPICE+SOTIF 비중이 점검 트랙 기술 콘텐츠의 20% 미만인지 자동으로 확인한다.
- 사용자가 실무 검토를 한 뒤 콘텐츠를 확정한다.

### 5.7 점검 체크리스트·질문지 처리 방침
- **현재 결정**: 사용자의 기존 체크리스트는 반영하지 않는다. 대신 ISO 26262 Part 2~9 작업 산출물과 Audit/Assessment 관점의 **표준 점검 질문**을 직접 만들어 S3·S4 시나리오에 넣는다.
- **나중에 추가**: 사용자가 체크리스트나 질문지(엑셀, 워드, 텍스트)를 이 프로젝트에 넣으면, 그 질문들을 같은 스키마의 문장 카드로 바꿔 `sentences.json`에 추가한다. 앱 기능은 필요 없고 콘텐츠 작업으로 처리한다.
- 이렇게 하면 회사에서 실제로 쓰는 질문을 그대로 영어로 연습할 수 있으므로, 가능하면 D-10 전에 제공하는 것을 권장한다.

---

## 6. 기술 요구사항

| 항목 | 선택 |
|---|---|
| 프레임워크 | Next.js 15 (App Router, `output: "export"` 정적 빌드), React 19 |
| 언어 | TypeScript (strict, `any` 금지) |
| 스타일 | Tailwind CSS + shadcn/ui |
| 상태관리 | Zustand (+ persist 미들웨어로 localStorage 저장) |
| 폼 | React Hook Form + Zod (설정 화면, 백업 가져오기 검증) |
| 콘텐츠 검증 | Zod 스키마로 빌드할 때 JSON 검증 + 도메인 비중 검사 |
| PWA | Web App Manifest + Service Worker (Serwist 또는 next-pwa 계열) |
| TTS | Web Speech API (`speechSynthesis`), `lang: "en-US"` 음성 우선 선택 |
| 음성 인식 (P1, 선택) | Web Speech API (`SpeechRecognition`), 지원 안 되면 기능 숨김 |
| 배포 | Vercel 무료 플랜 (또는 GitHub Pages) |
| 로깅 | 개발 시 경량 로거 유틸 사용 (console.log 직접 사용 금지) |

### 비기능 요구사항
- 첫 로딩 3초 이내 (4G 기준), 이후 실행은 캐시로 1초 이내
- 오프라인에서 P0 기능 전체 동작
- Android Chrome, iOS Safari 최신 2개 버전 지원
- 개인 데이터를 외부로 보내지 않음 (진도는 기기에만 저장)

---

## 7. 화면 목록
| 화면 | 경로 | 주요 내용 |
|---|---|---|
| 홈 | `/` | D-Day, 트랙 필터, 오늘 복습 수, 학습 시작, 숙지율 |
| 학습 | `/study` | 플래시카드 SRS 세션 |
| 테스트 | `/quiz` | 객관식, 빈칸, 받아쓰기, 말하기 모드 선택 |
| 목록 | `/browse` | 트랙/카테고리/시나리오별 목록 + 검색 |
| 카드 상세 | `/card/[id]` | 카드 전체 정보 |
| 치트시트 | `/cheatsheet` | 점검·출장 시나리오별 핵심 문장 |
| 통계 | `/stats` | 박스별 분포, 트랙별 숙지율, 약한 카드, 학습 기록 |
| 설정 | `/settings` | 하루 학습량, 트랙 혼합 비율, 발음 속도, 백업 |

---

## 8. 개발 일정 (학습 시간 확보를 위해 앱은 빠르게 완성)

| 일자 | 작업 | 결과물 |
|---|---|---|
| D-14 (11/16) | PRD 확정, 콘텐츠 1차 (우선순위 1 위주: 점검 용어 90 + 점검 문장 50 + 출장 문장 25) | PRD v1.0, JSON 1차 |
| D-13 (11/17) | P0 기능 개발 (플래시카드, SRS, TTS, 트랙 필터, 목록) + Vercel 배포 + PWA | **MVP 폰 설치** |
| D-12 (11/18) | 콘텐츠 2차 (전체 용어 350 + 문장 250 + 혼동 쌍 20), 객관식 테스트 | 콘텐츠 완성 |
| D-11 ~ D-10 | P1 기능 (빈칸, 말하기, 받아쓰기, 치트시트, 오답 노트) | v1.0 |
| 이후 | 사용하면서 콘텐츠 보완 (체크리스트 제공 시 문장 카드로 변환해 추가) | 수시 배포 |

> 핵심: **D-13에 폰에서 학습을 시작할 수 있어야 한다.** 나머지 기능은 학습과 병행하며 추가한다.

---

## 9. 리스크 및 대응
| 리스크 | 영향 | 대응 |
|---|---|---|
| 콘텐츠 분량(용어 350, 문장 250)이 14일에 비해 많음 | 학습 미완료 | 우선순위 1·2만 기본 대기열에 넣음, 우선순위 3은 선택 학습 |
| iOS Safari에서 오래 쓰지 않으면 로컬 저장소가 지워질 수 있음 | 진도 손실 | 홈 화면 설치 시 보존됨을 안내, JSON 백업 기능 (F16) |
| 기기마다 TTS 음성 품질이 다름 | 발음 학습 품질 | en-US 음성 중 품질 좋은 음성 자동 선택, 발음 기호와 강세 표시를 함께 제공 |
| 콘텐츠 정확성 (표준 용어 오해) | 점검 시 오용 | 표준 Part/Clause 참조 표기, 사용자 검토 후 확정 |
| ASPICE·SOTIF 비중 초과 | 핵심 학습 분산 | 빌드할 때 비중 자동 검사 (20% 이상이면 빌드 실패) |
| 개발이 늦어져 학습 시간 감소 | 목표 미달 | P0만으로 D-13 배포, 나머지는 점진 배포 |

---

## 10. 확인 사항 결정 내역
| # | 질문 | 결정 |
|---|---|---|
| 1 | 점검 유형 | Audit(프로세스)과 Assessment/Confirmation Review(산출물) **둘 다**. 추가로 **해외출장 회화 트랙** 포함 |
| 2 | 점검 대상 범위 | 시스템, HW, SW **모두** (Part 4·5·6 균등 배분) |
| 3 | 추가 표준 | **ASPICE, SOTIF 포함** (점검 트랙 기술 콘텐츠의 20% 미만, 목표 약 15%). ISO 21434 제외 |
| 4 | 발음 기준 | **미국식** (en-US) |
| 5 | 기존 체크리스트 반영 | 미정 → **표준 기반 질문을 직접 생성**하고, 체크리스트를 제공하면 나중에 카드로 추가 (5.7) |
| 6 | 텔레그램 리마인더 | P2 선택 기능으로 유지, MVP 이후 결정 |

---

## 11. 다음 단계
1. 콘텐츠 JSON 1차 생성 (우선순위 1 카드) → 사용자 검토
2. Next.js 프로젝트 생성 및 P0 개발 → Vercel 배포 → 폰에 설치
3. 콘텐츠 2차 생성 및 P1 기능 추가
