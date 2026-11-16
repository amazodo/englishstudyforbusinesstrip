// 설정 폼 검증 스키마
import { z } from "zod";
import { MAX_NEW_PER_DAY, PERCENT, SPEECH_RATE_NORMAL, SPEECH_RATE_SLOW } from "@/lib/constants";

export const settingsFormSchema = z.object({
  visitDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "날짜를 선택해 주세요"),
  newTermsPerDay: z.number().int().min(0).max(MAX_NEW_PER_DAY, `최대 ${MAX_NEW_PER_DAY}개`),
  newSentencesPerDay: z.number().int().min(0).max(MAX_NEW_PER_DAY, `최대 ${MAX_NEW_PER_DAY}개`),
  auditRatioPercent: z.number().int().min(0).max(PERCENT),
  speechRate: z.union([z.literal(SPEECH_RATE_NORMAL), z.literal(SPEECH_RATE_SLOW)]),
  includeLowPriority: z.boolean(),
  theme: z.enum(["system", "light", "dark"]),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
