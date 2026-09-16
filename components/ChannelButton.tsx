"use client";

import { useConsultModal } from "./ConsultModalContext";

type Channel = "phone" | "kakao" | "naver";

const CONFIG: Record<
  Channel,
  { label: string; compactLabel: string; className: string; toHref: (v: string) => string; external?: boolean }
> = {
  phone: { label: "📞 전화상담", compactLabel: "📞", className: "btn-channel-phone", toHref: (v) => `tel:${v}` },
  kakao: { label: "💬 카톡문의", compactLabel: "💬", className: "btn-channel-kakao", toHref: (v) => v, external: true },
  naver: { label: "🅽 네이버문의", compactLabel: "N", className: "btn-channel-naver", toHref: (v) => v, external: true },
};

// 전화/카톡/네이버 채널 버튼 — HeroCtaRow·MobileCtaBar·Header(compact) 공용.
// lib/contactLinks.ts에 실제 값이 있으면 진짜 링크로, 없으면 상담모달을 여는 버튼으로 동작(죽은 버튼 방지).
// compact=true면 헤더 우측의 작은 뱃지 스타일로 렌더(아이콘만, 텍스트 없음).
export default function ChannelButton({
  channel,
  value,
  compact,
}: {
  channel: Channel;
  value: string;
  compact?: boolean;
}) {
  const { open } = useConsultModal();
  const cfg = CONFIG[channel];
  const label = compact ? cfg.compactLabel : cfg.label;
  const className = compact ? `btn-channel-badge ${cfg.className}` : `btn-channel ${cfg.className}`;
  const ariaLabel = compact ? cfg.label : undefined;

  if (value) {
    return (
      <a
        href={cfg.toHref(value)}
        className={className}
        aria-label={ariaLabel}
        {...(cfg.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => open()} className={className} aria-label={ariaLabel}>
      {label}
    </button>
  );
}
