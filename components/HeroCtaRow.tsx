"use client";

import { contactLinks } from "@/lib/contactLinks";
import { useConsultModal } from "./ConsultModalContext";

// 전화상담/카톡문의/네이버문의 3버튼 줄 — evaw-pet-grooming.co.kr 히어로 CTA 구조 참고.
// 아직 실제 채널 링크가 없어서(lib/contactLinks.ts) 값이 채워지기 전까지는 눌러도 상담 모달이 열림
// (죽은 버튼 대신 항상 뭔가는 되게), 값이 채워지면 자동으로 실제 tel:/카카오/네이버 링크로 전환됨.
export default function HeroCtaRow() {
  const { open } = useConsultModal();

  return (
    <div className="hero-channel-row">
      {contactLinks.phone ? (
        <a href={`tel:${contactLinks.phone}`} className="btn-channel btn-channel-phone">
          전화상담
        </a>
      ) : (
        <button type="button" onClick={() => open()} className="btn-channel btn-channel-phone">
          전화상담
        </button>
      )}
      {contactLinks.kakaoUrl ? (
        <a href={contactLinks.kakaoUrl} target="_blank" rel="noopener noreferrer" className="btn-channel btn-channel-kakao">
          카톡문의
        </a>
      ) : (
        <button type="button" onClick={() => open()} className="btn-channel btn-channel-kakao">
          카톡문의
        </button>
      )}
      {contactLinks.naverUrl ? (
        <a href={contactLinks.naverUrl} target="_blank" rel="noopener noreferrer" className="btn-channel btn-channel-naver">
          네이버문의
        </a>
      ) : (
        <button type="button" onClick={() => open()} className="btn-channel btn-channel-naver">
          네이버문의
        </button>
      )}
    </div>
  );
}
