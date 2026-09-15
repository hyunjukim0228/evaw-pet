"use client";

import { contactLinks } from "@/lib/contactLinks";
import ChannelButton from "./ChannelButton";
import { useConsultModal } from "./ConsultModalContext";

/** 모바일 전용 하단 고정 CTA 바 — 전화상담/카톡문의/네이버문의/무료상담신청 4버튼 상시 노출
    (evaw-pet-grooming.co.kr 하단 고정바 구조 참고). 같은 화면의 FloatingCta(원형 버튼)는
    모바일에서 이 바로 대체되도록 globals.css에서 숨김 처리. */
export default function MobileCtaBar() {
  const { open } = useConsultModal();
  return (
    <div className="mobile-cta-bar">
      <div className="mobile-cta-bar-row">
        <ChannelButton channel="phone" value={contactLinks.phone} />
        <ChannelButton channel="kakao" value={contactLinks.kakaoUrl} />
        <ChannelButton channel="naver" value={contactLinks.naverUrl} />
        <button type="button" onClick={() => open()} className="btn-channel btn-channel-consult">
          🎓 무료상담신청
        </button>
      </div>
    </div>
  );
}
