"use client";

import { useEffect, useState } from "react";
import { useConsultModal } from "./ConsultModalContext";

// 홈 "가정견 친구들이 미용 오는 학원" — 메인 사진 1장만 노출, 사진이나 버튼을 누르면
// 실견수업 상세 이미지(세로형)를 스크롤 팝업으로 보여줌(2026-10-07 사용자 요청).
export default function HomeGroomingDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openConsult } = useConsultModal();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button type="button" className="hg-main" onClick={() => setIsOpen(true)} aria-label="실견수업 현장 상세 보기">
        <img
          src="/images/home-grooming-main.webp"
          alt="가정견 100% 실습 환경 — 가정견이 미용을 온다?! 미용 상담부터 보호자 인계까지 실무 그대로. 실견수업 현장 보러가기"
        />
      </button>
      <div style={{ marginTop: 20 }}>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsOpen(true)}>
          가정견 100% 실견수업 살펴보기
        </button>
      </div>

      {isOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="가정견 실견수업 상세" onClick={() => setIsOpen(false)}>
          <div className="modal-panel hg-detail-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close hg-detail-close" aria-label="닫기" onClick={() => setIsOpen(false)}>
              ×
            </button>
            <img
              src="/images/home-grooming-practice.webp"
              alt="가정견 100% 미용실습 — 보호자와 함께 오는 가정견, 상담부터 인계까지(미용 상담·목욕과 드라이·전체 미용·보호자 인계) 직접 배우는 실견수업"
            />
            <div className="hg-detail-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-full"
                onClick={() => {
                  setIsOpen(false);
                  openConsult();
                }}
              >
                🎓 실견수업·교육과정 문의하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
