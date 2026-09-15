"use client";

import { contactLinks } from "@/lib/contactLinks";
import ChannelButton from "./ChannelButton";
import { useConsultModal } from "./ConsultModalContext";

// 간편 수강료 조회/카톡문의/네이버문의 3버튼 줄 — evaw-pet-grooming.co.kr 히어로 CTA 구조 참고.
// 전화번호가 아직 없어 전화상담 자리를 "간편 수강료 조회"(상담모달 tuition 모드)로 대체(2026-09-15).
export default function HeroCtaRow() {
  const { open } = useConsultModal();
  return (
    <div className="hero-channel-row">
      <button type="button" onClick={() => open({ intent: "tuition" })} className="btn-channel btn-channel-phone">
        💰 간편 수강료 조회
      </button>
      <ChannelButton channel="kakao" value={contactLinks.kakaoUrl} />
      <ChannelButton channel="naver" value={contactLinks.naverUrl} />
    </div>
  );
}
