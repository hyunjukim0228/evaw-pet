"use client";

import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";

// 사용자가 제공한 메인베너 1~6 (PC 1920×850 / 모바일 세로형) — public/images/hero/에 WebP로 최적화해 저장.
const SLIDES = Array.from({ length: 6 }, (_, i) => i + 1).map((n) => ({
  pc: `/images/hero/hero-${n}-pc.webp`,
  mo: `/images/hero/hero-${n}-mo.webp`,
}));

const AUTOPLAY_MS = 5000;
const DRAG_THRESHOLD = 50; // 이 픽셀 이상 드래그해야 슬라이드 전환

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef(0);

  // 직전 슬라이드를 기억해뒀다가 그 위에서만 페이드인 — 안 그러면 전환 중 배경(회색)이 잠깐 비쳐 보임.
  const prevIndexRef = useRef(index);
  useEffect(() => {
    prevIndexRef.current = index;
  }, [index]);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // 자동재생 — 화살표·점·드래그로 직접 넘기면 타이머를 리셋해서 바로 또 넘어가지 않게 함
  const restartAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartAutoplay]);

  function handleManual(action: () => void) {
    action();
    restartAutoplay();
  }

  // 마우스·터치 공용 드래그(포인터 이벤트)로 슬라이드 넘기기
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX;
    dragDeltaX.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    dragDeltaX.current = e.clientX - dragStartX.current;
  }
  function onPointerUp() {
    if (dragStartX.current === null) return;
    if (dragDeltaX.current > DRAG_THRESHOLD) handleManual(prev);
    else if (dragDeltaX.current < -DRAG_THRESHOLD) handleManual(next);
    dragStartX.current = null;
    dragDeltaX.current = 0;
  }

  return (
    <div
      className="hero-carousel"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {SLIDES.map((slide, i) => {
        const state = i === index ? " active" : i === prevIndexRef.current ? " prev" : "";
        return (
          <div key={i} className={`hero-slide${state}`}>
            <img src={slide.pc} alt="애견미용학원 대전점" className="hero-img pc" draggable={false} />
            <img src={slide.mo} alt="애견미용학원 대전점" className="hero-img mo" draggable={false} />
          </div>
        );
      })}

      <button
        type="button"
        className="hero-arrow prev"
        aria-label="이전 배너"
        onClick={() => handleManual(prev)}
      >
        ‹
      </button>
      <button
        type="button"
        className="hero-arrow next"
        aria-label="다음 배너"
        onClick={() => handleManual(next)}
      >
        ›
      </button>

      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-dot${i === index ? " active" : ""}`}
            aria-label={`배너 ${i + 1}번`}
            onClick={() => handleManual(() => goTo(i))}
          />
        ))}
      </div>
    </div>
  );
}
