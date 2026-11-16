"use client";

// 객관식 4지선다 모드 (F7)
import { useQuiz } from "@/hooks/useQuiz";
import { QuizQuestionView } from "./QuizQuestionView";
import { QuizResult } from "./QuizResult";
import { QuizSetup } from "./QuizSetup";

/** 객관식 테스트 */
export function ChoiceQuiz() {
  const quiz = useQuiz();
  if (quiz.phase === "setup") return <QuizSetup error={quiz.error} onStart={quiz.start} />;
  if (quiz.phase === "playing" && quiz.current) {
    const current = quiz.current;
    return (
      <QuizQuestionView key={current.card.key} question={current} position={quiz.answers.length + 1}
        total={quiz.questions.length} onAnswer={(chosen) => quiz.answer(current, chosen)} />
    );
  }
  return <QuizResult answers={quiz.answers} onRetry={quiz.reset} />;
}
