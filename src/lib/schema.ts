// 콘텐츠 스키마 (앱과 빌드 검증 스크립트가 함께 사용)
// 주의: Node 타입 스트리핑으로 스크립트에서 직접 import하므로 경로 별칭(@/)을 쓰지 않는다.
import { z } from "zod";

export const TRACKS = ["audit", "travel"] as const;
export const DOMAINS = ["iso26262", "aspice", "sotif", "general"] as const;
export const TERM_CATEGORIES = [
  "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13",
  "B1", "B2", "B3", "B4", "B5", "B6",
] as const;
export const SCENARIOS = [
  "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8",
  "T1", "T2", "T3", "T4", "T5", "T6", "T7",
] as const;

const text = z.string().trim().min(1);
const prioritySchema = z.union([z.literal(1), z.literal(2), z.literal(3)]);

export const termSchema = z.object({
  id: z.string().regex(/^T-(A|B)\d{1,2}-\d{3}$/),
  track: z.enum(TRACKS),
  domain: z.enum(DOMAINS),
  term: text,
  abbreviation: text.optional(),
  fullForm: text.optional(),
  ipa: text,
  stressHint: text,
  meaningKo: text,
  definitionEn: text,
  descriptionKo: text.optional(),
  standardRef: text.optional(),
  category: z.enum(TERM_CATEGORIES),
  priority: prioritySchema,
  example: z.object({ en: text, ko: text }),
  collocations: z.array(text),
  mnemonic: text.optional(),
  pitfall: text.optional(),
  localTip: text.optional(),
  confusableIds: z.array(text).optional(),
});

export const sentenceSchema = z.object({
  id: z.string().regex(/^S-(S|T)\d-\d{3}$/),
  track: z.enum(TRACKS),
  domain: z.enum(DOMAINS),
  scenario: z.enum(SCENARIOS),
  en: text,
  ko: text,
  keyChunks: z.array(text),
  alternatives: z
    .object({ polite: text.optional(), simple: text.optional() })
    .optional(),
  usageNote: text.optional(),
  localTip: text.optional(),
  relatedTermIds: z.array(text).optional(),
  priority: prioritySchema,
});

export const confusableSchema = z.object({
  id: z.string().regex(/^C-\d{3}$/),
  title: text,
  items: z
    .array(z.object({ term: text, meaningKo: text, explanationKo: text }))
    .min(2),
  keyDifferenceKo: text,
  example: z.object({ en: text, ko: text }).optional(),
  mnemonic: text.optional(),
});

export const termListSchema = z.array(termSchema);
export const sentenceListSchema = z.array(sentenceSchema);
export const confusableListSchema = z.array(confusableSchema);

export type Track = z.infer<typeof termSchema>["track"];
export type Domain = z.infer<typeof termSchema>["domain"];
export type TermCategory = z.infer<typeof termSchema>["category"];
export type ScenarioCode = z.infer<typeof sentenceSchema>["scenario"];
export type Priority = z.infer<typeof prioritySchema>;
export type Term = z.infer<typeof termSchema>;
export type Sentence = z.infer<typeof sentenceSchema>;
export type Confusable = z.infer<typeof confusableSchema>;
