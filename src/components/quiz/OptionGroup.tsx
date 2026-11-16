"use client";

// 설정 화면용 선택 버튼 그룹
import { cn } from "@/lib/utils";

interface OptionGroupProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

/** 라디오 형태의 버튼 그룹 */
export function OptionGroup<T extends string>({ label, value, options, onChange }: OptionGroupProps<T>) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-12 rounded-xl border text-sm font-medium",
              value === option.value && "border-primary bg-primary text-primary-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
