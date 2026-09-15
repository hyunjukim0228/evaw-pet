"use client";

import { useConsultModal } from "./ConsultModalContext";

export default function FloatingCta() {
  const { open } = useConsultModal();
  return (
    <div className="floating-cta" aria-label="빠른 상담">
      <button type="button" className="fab fab-primary" onClick={() => open()}>
        💬 상담
      </button>
      <span className="fab fab-disabled" title="전화번호 등록 예정">
        📞 전화
      </span>
    </div>
  );
}
