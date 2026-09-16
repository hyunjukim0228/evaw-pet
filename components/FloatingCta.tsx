"use client";

import { useConsultModal } from "./ConsultModalContext";
import { contactLinks } from "@/lib/contactLinks";
import ChannelButton from "./ChannelButton";

/** 데스크톱 전용 우측 하단 플로팅 그룹 — 전화/카톡/네이버 뱃지 + 메인 CTA.
    모바일은 MobileCtaBar(하단 풀바)가 대신하므로 globals.css에서 숨김 처리(2026-09-16 스펙: 데스크톱=플로팅 그룹). */
export default function FloatingCta() {
  const { open } = useConsultModal();
  return (
    <div className="floating-cta" aria-label="빠른 상담">
      <div className="floating-cta-channels">
        <ChannelButton channel="phone" value={contactLinks.phone} compact />
        <ChannelButton channel="kakao" value={contactLinks.kakaoUrl} compact />
        <ChannelButton channel="naver" value={contactLinks.naverUrl} compact />
      </div>
      <button type="button" className="floating-cta-main" onClick={() => open()}>
        🎓 무료상담 + 수강료 확인하기
      </button>
    </div>
  );
}
