// 음성 인식 (Web Speech API, en-US). 지원하지 않는 브라우저에서는 supported=false.
import { useCallback, useRef, useState } from "react";
import { SPEECH_LANG } from "@/lib/constants";
import { logger } from "@/lib/logger";

// 표준 DOM 타입에 아직 없는 API라 필요한 부분만 정의
interface RecognitionEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}
interface Recognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type RecognitionConstructor = new () => Recognition;

/** 브라우저의 음성 인식 생성자 */
function getRecognitionConstructor(): RecognitionConstructor | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

const ERROR_MESSAGES: Record<string, string> = {
  "not-allowed": "마이크 권한이 필요합니다. 브라우저 설정에서 허용해 주세요.",
  network: "음성 인식은 인터넷 연결이 필요합니다.",
  "no-speech": "음성이 들리지 않았습니다. 다시 시도해 주세요.",
};

/** 음성 인식 훅 */
export function useSpeechRecognition() {
  const recognitionRef = useRef<Recognition | null>(null);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(() => {
    const Ctor = getRecognitionConstructor();
    if (!Ctor) return;
    const recognition = new Ctor();
    recognition.lang = SPEECH_LANG;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (e) => setTranscript(e.results[0]?.[0]?.transcript ?? "");
    recognition.onerror = (e) => {
      logger.warn("음성 인식 오류", e.error);
      setError(ERROR_MESSAGES[e.error] ?? "음성 인식에 실패했습니다.");
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setError(null);
    setTranscript("");
    setListening(true);
    recognition.start();
  }, []);

  const stop = useCallback(() => recognitionRef.current?.stop(), []);

  return { supported: Boolean(getRecognitionConstructor()), listening, transcript, error, start, stop };
}
