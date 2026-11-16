// 발음 듣기: 브라우저 내장 Web Speech API로 미국식(en-US) 음성을 재생한다.
import { SPEECH_LANG } from "./constants";
import { logger } from "./logger";

// 품질이 좋은 음성 이름에 자주 들어가는 키워드 (앞쪽일수록 우선)
const PREFERRED_VOICE_KEYWORDS = ["Google", "Samantha", "Natural", "Aria", "Jenny", "Ava"];

/** TTS 지원 여부 */
export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** 가장 적합한 en-US 음성 선택 */
function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.replace("_", "-").startsWith(SPEECH_LANG));
  for (const keyword of PREFERRED_VOICE_KEYWORDS) {
    const found = voices.find((v) => v.name.includes(keyword));
    if (found) return found;
  }
  return voices[0];
}

/** 영어 문장을 읽어준다 (재생 중이면 끊고 새로 재생) */
export function speak(text: string, rate: number): void {
  if (!isSpeechSupported()) {
    logger.warn("이 브라우저는 음성 합성을 지원하지 않습니다.");
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = SPEECH_LANG;
  utterance.rate = rate;
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

/** 음성 목록을 미리 불러온다 (일부 브라우저는 비동기로 로드됨) */
export function warmUpVoices(): void {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.getVoices();
}
