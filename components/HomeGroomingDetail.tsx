"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useConsultModal } from "./ConsultModalContext";

type Props = {
  mainSrc: string;
  mainAlt: string;
  detailSrc: string;
  detailAlt: string;
  buttonLabel: string;
  consultLabel: string;
};

// 홈 "가정견 실습" — 메인 사진 1장만 노출, 사진이나 버튼을 누르면
// 세로형 상세 이미지를 스크롤 팝업으로 보여줌(2026-10-07 사용자 요청).
// 2026-10-15: 반려견 케어 취미반 카드를 옆에 추가하면서 사진·문구를 props로 받게 변경.
export default function HomeGroomingDetail({ mainSrc, mainAlt, detailSrc, detailAlt, buttonLabel, consultLabel }: Props) {
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
    <div>
      <button type="button" className="hg-main" onClick={() => setIsOpen(true)} aria-label={`${buttonLabel} — 상세 보기`}>
        <img src={mainSrc} alt={mainAlt} />
      </button>
      <div style={{ marginTop: 20 }}>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsOpen(true)}>
          {buttonLabel}
        </button>
      </div>

      {/* 슬라이더(transform) 안에서는 position:fixed가 슬라이드 기준으로 갇혀서 body로 포털 */}
      {isOpen && createPortal(
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={buttonLabel} onClick={() => setIsOpen(false)}>
          <div className="modal-panel hg-detail-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close hg-detail-close" aria-label="닫기" onClick={() => setIsOpen(false)}>
              ×
            </button>
            <img src={detailSrc} alt={detailAlt} />
            <div className="hg-detail-actions">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-full"
                onClick={() => {
                  setIsOpen(false);
                  openConsult();
                }}
              >
                {consultLabel}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
