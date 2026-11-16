"use client";

// 학습 설정 폼 (React Hook Form + Zod)
import { useState } from "react";
import { type FieldErrors, type UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { PERCENT, SPEECH_RATE_NORMAL, SPEECH_RATE_SLOW } from "@/lib/constants";
import { type Settings, useProgressStore } from "@/store/useProgressStore";
import { FormField } from "./FormField";
import { type SettingsFormValues, settingsFormSchema } from "./settingsSchema";

const SAVED_MESSAGE_MS = 2000;
const inputClass = "h-12 text-base";
const selectClass = "h-12 w-full rounded-lg border bg-background px-3 text-base";

interface FieldsProps {
  register: UseFormRegister<SettingsFormValues>;
  errors: FieldErrors<SettingsFormValues>;
}

/** 저장소 설정 → 폼 값 */
function toFormValues(s: Settings): SettingsFormValues {
  return {
    visitDate: s.visitDate,
    newTermsPerDay: s.newTermsPerDay,
    newSentencesPerDay: s.newSentencesPerDay,
    auditRatioPercent: Math.round(s.auditRatio * PERCENT),
    speechRate: s.speechRate === SPEECH_RATE_SLOW ? SPEECH_RATE_SLOW : SPEECH_RATE_NORMAL,
    includeLowPriority: s.includeLowPriority,
    theme: s.theme,
  };
}

/** 방문일·하루 학습량·트랙 비율 */
function StudyAmountFields({ register, errors }: FieldsProps) {
  const numberProps = { type: "number", inputMode: "numeric", className: inputClass } as const;
  return (
    <>
      <FormField label="독일 방문일" htmlFor="visitDate" error={errors.visitDate?.message}>
        <Input id="visitDate" type="date" className={inputClass} {...register("visitDate")} />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="하루 새 용어" htmlFor="newTermsPerDay" error={errors.newTermsPerDay?.message}>
          <Input id="newTermsPerDay" {...numberProps} {...register("newTermsPerDay", { valueAsNumber: true })} />
        </FormField>
        <FormField label="하루 새 문장" htmlFor="newSentencesPerDay" error={errors.newSentencesPerDay?.message}>
          <Input id="newSentencesPerDay" {...numberProps} {...register("newSentencesPerDay", { valueAsNumber: true })} />
        </FormField>
      </div>
      <FormField label="점검 트랙 비율 (%)" htmlFor="auditRatioPercent" hint="나머지는 출장 트랙. 기본 80%"
        error={errors.auditRatioPercent?.message}>
        <Input id="auditRatioPercent" {...numberProps} {...register("auditRatioPercent", { valueAsNumber: true })} />
      </FormField>
    </>
  );
}

/** 발음 속도·테마·참고 카드 포함 여부 */
function DisplayFields({ register }: Pick<FieldsProps, "register">) {
  return (
    <>
      <FormField label="발음 속도 (미국식)" htmlFor="speechRate">
        <select id="speechRate" className={selectClass} {...register("speechRate", { valueAsNumber: true })}>
          <option value={SPEECH_RATE_NORMAL}>보통</option>
          <option value={SPEECH_RATE_SLOW}>느리게</option>
        </select>
      </FormField>
      <FormField label="화면 테마" htmlFor="theme">
        <select id="theme" className={selectClass} {...register("theme")}>
          <option value="system">시스템 설정 따르기</option>
          <option value="light">라이트</option>
          <option value="dark">다크</option>
        </select>
      </FormField>
      <label className="flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3">
        <span className="text-sm font-semibold">참고(우선순위 3) 카드도 학습</span>
        <input type="checkbox" className="size-5 accent-primary" {...register("includeLowPriority")} />
      </label>
    </>
  );
}

/** 설정 폼 */
export function SettingsForm() {
  const settings = useProgressStore((s) => s.settings);
  const updateSettings = useProgressStore((s) => s.updateSettings);
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, formState } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: toFormValues(settings),
  });

  const onSubmit = ({ auditRatioPercent, ...rest }: SettingsFormValues) => {
    updateSettings({ ...rest, auditRatio: auditRatioPercent / PERCENT });
    setSaved(true);
    setTimeout(() => setSaved(false), SAVED_MESSAGE_MS);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <StudyAmountFields register={register} errors={formState.errors} />
      <DisplayFields register={register} />
      <button type="submit" className="min-h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground">
        {saved ? "✓ 저장했습니다" : "저장"}
      </button>
    </form>
  );
}
