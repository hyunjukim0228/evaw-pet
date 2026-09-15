"use client";

import { useConsultModal } from "./ConsultModalContext";
import useScrolledPast from "@/lib/useScrolledPast";

/** 우하단 원형 상담 버튼 — 스크롤을 일정 이상 내리면 하단 CTA 바(MobileCtaBar)가 PC에서도 나타나므로
    겹치지 않게 이때는 숨김(모바일은 CSS에서 이미 항상 숨김 처리, 2026-09-15). */
export default function FloatingCta() {
  const { open } = useConsultModal();
  const ctaBarVisible = useScrolledPast(480);
  return (
    <div className={`floating-cta${ctaBarVisible ? " cta-bar-active" : ""}`} aria-label="빠른 상담">
      <button type="button" className="fab fab-primary" onClick={() => open()}>
        💬 상담
      </button>
      <span className="fab fab-disabled" title="전화번호 등록 예정">
        📞 전화
      </span>
    </div>
  );
}
