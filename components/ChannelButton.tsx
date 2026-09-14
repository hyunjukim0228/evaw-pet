"use client";

import { useConsultModal } from "./ConsultModalContext";

type Channel = "phone" | "kakao" | "naver";

const CONFIG: Record<Channel, { label: string; className: string; toHref: (v: string) => string; external?: boolean }> = {
  phone: { label: "전화상담", className: "btn-channel-phone", toHref: (v) => `tel:${v}` },
  kakao: { label: "카톡문의", className: "btn-channel-kakao", toHref: (v) => v, external: true },
  naver: { label: "네이버문의", className: "btn-channel-naver", toHref: (v) => v, external: true },
};

// 전화/카톡/네이버 채널 버튼 — HeroCtaRow·MobileCtaBar 공용.
// lib/contactLinks.ts에 실제 값이 있으면 진짜 링크로, 없으면 상담모달을 여는 버튼으로 동작(죽은 버튼 방지).
export default function ChannelButton({ channel, value }: { channel: Channel; value: string }) {
  const { open } = useConsultModal();
  const cfg = CONFIG[channel];

  if (value) {
    return (
      <a
        href={cfg.toHref(value)}
        className={`btn-channel ${cfg.className}`}
        {...(cfg.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {cfg.label}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => open()} className={`btn-channel ${cfg.className}`}>
      {cfg.label}
    </button>
  );
}
