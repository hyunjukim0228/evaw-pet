import type { IconName } from "./icons";

// 2026-09-15: 인라인 SVG 라인아이콘 → 이모지로 교체(사용자 요청: "이모티콘이라던지... 활용해서").
// 색상 톤(핑크 액센트)·레이아웃은 유지하고 아이콘 표현만 이모지로 전환 — 호출부(BenefitIcon name="...")는 그대로.
const EMOJI: Record<IconName, string> = {
  certificate: "🏅",
  heart: "❤️",
  briefcase: "💼",
  chat: "💬",
  unlock: "🔓",
  steps: "📈",
};

export default function BenefitIcon({ name }: { name: IconName }) {
  return (
    <div className="benefit-icon" aria-hidden="true">
      <span className="benefit-emoji">{EMOJI[name]}</span>
    </div>
  );
}
