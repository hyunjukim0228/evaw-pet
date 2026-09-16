"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { galleryPhotos } from "@/lib/galleryPhotos";

// 2026-09-16(2차): 사용자 지적 — 레퍼런스는 시설·실습 사진이 정지된 그리드가 아니라 옆으로 자연스럽게
// 계속 넘어가는 형태(마퀴/캐러셀). 처음 스펙의 "그리드+라이트박스" 지시보다 이 실제 요청을 우선해
// Swiper 캐러셀(자동재생, loop, grabCursor)로 교체하되, 클릭하면 확대해서 보는 라이트박스 기능은 유지.
const PHOTOS = galleryPhotos;

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
      <Swiper
        className="gallery-slider"
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={12}
        breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
        grabCursor
        loop
        autoplay={{ delay: 2200, disableOnInteraction: false }}
      >
        {PHOTOS.map((src, i) => (
          <SwiperSlide key={src}>
            <button
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
          </SwiperSlide>
        ))}
      </Swiper>

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
