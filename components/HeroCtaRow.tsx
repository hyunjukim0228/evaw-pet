"use client";

import { contactLinks } from "@/lib/contactLinks";
import ChannelButton from "./ChannelButton";

// 전화상담/카톡문의/네이버문의 3버튼 줄 — evaw-pet-grooming.co.kr 히어로 CTA 구조 참고.
export default function HeroCtaRow() {
  return (
    <div className="hero-channel-row">
      <ChannelButton channel="phone" value={contactLinks.phone} />
      <ChannelButton channel="kakao" value={contactLinks.kakaoUrl} />
      <ChannelButton channel="naver" value={contactLinks.naverUrl} />
    </div>
  );
}
