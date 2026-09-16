"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// 사용자가 제공한 메인베너 1~6 (PC 1920×850 / 모바일 세로형) — public/images/hero/에 WebP로 최적화해 저장.
// 2026-09-16: 커스텀 구현 → Swiper(fade 효과, autoplay 4000ms, loop, pagination+네비게이션)로 교체(스펙 고정 슬라이더 라이브러리).
const SLIDES = Array.from({ length: 6 }, (_, i) => i + 1).map((n) => ({
  pc: `/images/hero/hero-${n}-pc.webp`,
  mo: `/images/hero/hero-${n}-mo.webp`,
}));

export default function HeroCarousel() {
  return (
    <Swiper
      className="hero-carousel"
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      navigation
      pagination={{ clickable: true }}
    >
      {SLIDES.map((slide, i) => (
        <SwiperSlide key={i}>
          <img src={slide.pc} alt="애견미용학원 대전점" className="hero-img pc" draggable={false} />
          <img src={slide.mo} alt="애견미용학원 대전점" className="hero-img mo" draggable={false} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
