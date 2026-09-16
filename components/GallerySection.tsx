"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { galleryPhotos } from "@/lib/galleryPhotos";

// 2026-09-16 스펙: 그리드(모바일 2열/태블릿 3열/PC 4열, 총 12장) + 라이트박스(ESC/배경클릭/방향키 탐색,
// 열림 시 배경 스크롤 잠금, z-50). 어제 설치한 캐러셀(Originkit) 대신 이 그리드+라이트박스로 교체.
const PHOTOS = galleryPhotos.slice(0, 12);

export default function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => setOpenIndex((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)), []);
  const showNext = useCallback(() => setOpenIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length)), []);

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
      <div className="gallery-grid">
        {PHOTOS.map((src, i) => (
          <button
            key={src}
            type="button"
            className="gallery-thumb"
            onClick={() => setOpenIndex(i)}
            aria-label={`애견미용학원 대전점 실습 현장 사진 ${i + 1}번 크게 보기`}
          >
            <Image
              src={src}
              alt={`애견미용학원 대전점 실습 현장 사진 ${i + 1}`}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="사진 확대 보기" onClick={close}>
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
            aria-label="이전 사진"
          >
            ‹
          </button>
          <div className="lightbox-image-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={PHOTOS[openIndex]}
              alt={`애견미용학원 대전점 실습 현장 사진 ${openIndex + 1}`}
              fill
              sizes="90vw"
              style={{ objectFit: "contain" }}
            />
          </div>
          <button
            type="button"
            className="lightbox-arrow next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="다음 사진"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
