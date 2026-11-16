// 콘텐츠 진입점: 카테고리별 JSON을 모아 스키마 검증 후 내보낸다.
// 새 콘텐츠 파일을 추가하면 아래 목록에도 추가할 것 (배열 순서 = 학습 로드맵 순서).
import {
  confusableListSchema,
  sentenceListSchema,
  termListSchema,
} from "@/lib/schema";
import confusables from "./confusables.json";
import sentencesS1 from "./sentences/s1.json";
import sentencesS2 from "./sentences/s2.json";
import sentencesS3 from "./sentences/s3.json";
import sentencesS4 from "./sentences/s4.json";
import sentencesS5 from "./sentences/s5.json";
import sentencesS6 from "./sentences/s6.json";
import sentencesS7 from "./sentences/s7.json";
import sentencesS8 from "./sentences/s8.json";
import sentencesT1 from "./sentences/t1.json";
import sentencesT2 from "./sentences/t2.json";
import sentencesT3 from "./sentences/t3.json";
import sentencesT4 from "./sentences/t4.json";
import sentencesT5 from "./sentences/t5.json";
import sentencesT6 from "./sentences/t6.json";
import sentencesT7 from "./sentences/t7.json";
import termsA1 from "./terms/a1.json";
import termsA10 from "./terms/a10.json";
import termsA11 from "./terms/a11.json";
import termsA12 from "./terms/a12.json";
import termsA12b from "./terms/a12b.json";
import termsA12c from "./terms/a12c.json";
import termsA13 from "./terms/a13.json";
import termsA2 from "./terms/a2.json";
import termsA3 from "./terms/a3.json";
import termsA4 from "./terms/a4.json";
import termsA5 from "./terms/a5.json";
import termsA6 from "./terms/a6.json";
import termsA7 from "./terms/a7.json";
import termsA8 from "./terms/a8.json";
import termsA9 from "./terms/a9.json";
import termsB1 from "./terms/b1.json";
import termsB2 from "./terms/b2.json";
import termsB3 from "./terms/b3.json";
import termsB4 from "./terms/b4.json";
import termsB5 from "./terms/b5.json";
import termsB6 from "./terms/b6.json";

// 로드맵 순서: D-14~D-11 → D-10~D-7 → D-6~D-4 (PRD 3.5)
export const allTerms = termListSchema.parse([
  ...termsA1,
  ...termsA12,
  ...termsA9,
  ...termsA2,
  ...termsA3,
  ...termsB1,
  ...termsB2,
  ...termsA12b,
  ...termsA4,
  ...termsA5,
  ...termsA6,
  ...termsA13,
  ...termsB3,
  ...termsB4,
  ...termsA12c,
  ...termsA7,
  ...termsA8,
  ...termsA10,
  ...termsA11,
  ...termsB5,
  ...termsB6,
]);

export const allSentences = sentenceListSchema.parse([
  ...sentencesS1,
  ...sentencesS2,
  ...sentencesT1,
  ...sentencesT2,
  ...sentencesS3,
  ...sentencesS4,
  ...sentencesS5,
  ...sentencesT3,
  ...sentencesT4,
  ...sentencesS6,
  ...sentencesS7,
  ...sentencesS8,
  ...sentencesT5,
  ...sentencesT6,
  ...sentencesT7,
]);

export const allConfusables = confusableListSchema.parse(confusables);
