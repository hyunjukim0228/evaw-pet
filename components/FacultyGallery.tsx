"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

// 전국 캠퍼스 강사진 소개 — 이바우펫(대전점 포함 전국 19개 지점을 직영하는 같은 사업자) 공식
// 강사소개 페이지의 강사진 명단 이미지를 그대로 사용. 대전점만의 강사진이 아니라 전국 캠퍼스
// 강사진 전체이므로 그렇게 정직하게 표기(레퍼런스 사이트도 이 4장을 "전국 캠퍼스 강사진"으로
// 별도 구분해 소개하는 동일한 방식 — data-zoom 클릭 확대 UX 참고).
const SHEETS = [
  { src: "/images/faculty/instructors-1.jpg", alt: "이바우펫 강사진 소개 1 — 대표원장 및 원장진" },
  { src: "/images/faculty/instructors-2.jpg", alt: "이바우펫 강사진 소개 2 — 부원장 및 지도교사진" },
  { src: "/images/faculty/instructors-3.jpg", alt: "이바우펫 강사진 소개 3 — 지도교사진" },
  { src: "/images/faculty/instructors-4.jpg", alt: "이바우펫 강사진 소개 4 — 지도교사진" },
];

export default function FacultyGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => setOpenIndex((i) => (i === null ? null : (i - 1 + SHEETS.length) % SHEETS.length)), []);
  const showNext = useCallback(() => setOpenIndex((i) => (i === null ? null : (i + 1) % SHEETS.length)), []);

  useEffect(() => {
    if (openIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="faculty-sheets">
        {SHEETS.map((s, i) => (
          <button key={s.src} type="button" className="faculty-sheet" onClick={() => setOpenIndex(i)} aria-label={`${s.alt} 크게 보기`}>
            <Image src={s.src} alt={s.alt} width={1383} height={777} sizes="(max-width:768px) 100vw, 50vw" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="강사진 소개 크게 보기" onClick={close}>
          <button type="button" className="lightbox-close" onClick={close} aria-label="닫기">
            ✕
          </button>
          <button
            type="button"
            className="lightbox-arrow prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="이전 이미지"
          >
            ‹
          </button>
          <div className="lightbox-image-wrap" onClick={(e) => e.stopPropagation()}>
            <Image src={SHEETS[openIndex].src} alt={SHEETS[openIndex].alt} fill sizes="90vw" style={{ objectFit: "contain" }} />
          </div>
          <button
            type="button"
            className="lightbox-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="다음 이미지"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
