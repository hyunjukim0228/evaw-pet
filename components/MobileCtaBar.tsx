"use client";

import { useConsultModal } from "./ConsultModalContext";

/** 모바일 전용 하단 고정 CTA 바 — 데스크톱 header-cta가 모바일에서 숨겨지는 자리를 훨씬 강하게 대신함.
    같은 화면의 FloatingCta(원형 버튼)는 모바일에서 이 바로 대체되도록 globals.css에서 숨김 처리. */
export default function MobileCtaBar() {
  const { open } = useConsultModal();
  return (
    <div className="mobile-cta-bar">
      <span className="mobile-cta-bar-trust">전국 18개 지점 운영 애견미용학원</span>
      <button type="button" className="btn btn-primary btn-full" onClick={() => open()}>
        무료 상담 신청하기
      </button>
    </div>
  );
}
