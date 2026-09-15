"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  intervalMs?: number;
  alt: string;
  className?: string;
};

/** 사진 여러 장을 자동으로 크로스페이드하며 넘기는 단순 슬라이드쇼 — 화살표·점 없음(HeroCarousel과 달리
    조작 UI가 필요 없는 하이라이트용 사진 한 장 자리에 씀). HeroCarousel의 prev/active 페이드 패턴 재사용. */
export default function PhotoSlideshow({ images, intervalMs = 2000, alt, className }: Props) {
  const [index, setIndex] = useState(0);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    prevIndexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <div className={`slideshow${className ? ` ${className}` : ""}`}>
      {images.map((src, i) => {
        const state = i === index ? " active" : i === prevIndexRef.current ? " prev" : "";
        return (
          <img
            key={src}
            src={src}
            alt={i === index ? alt : ""}
            className={`slideshow-slide${state}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        );
      })}
    </div>
  );
}
