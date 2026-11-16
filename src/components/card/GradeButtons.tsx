"use client";

// 자기채점 3버튼: 몰랐음 / 애매함 / 알았음
import type { Grade } from "@/lib/srs";
import { cn } from "@/lib/utils";

const GRADES: { grade: Grade; label: string; className: string }[] = [
  { grade: "again", label: "몰랐음", className: "bg-rose-600 text-white active:bg-rose-700" },
  { grade: "hard", label: "애매함", className: "bg-amber-500 text-white active:bg-amber-600" },
  { grade: "good", label: "알았음", className: "bg-emerald-600 text-white active:bg-emerald-700" },
];

/** 채점 버튼 묶음 */
export function GradeButtons({ onGrade }: { onGrade: (grade: Grade) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {GRADES.map(({ grade, label, className }) => (
        <button
          key={grade}
          type="button"
          onClick={() => onGrade(grade)}
          className={cn("min-h-14 rounded-xl text-base font-semibold shadow-sm", className)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
