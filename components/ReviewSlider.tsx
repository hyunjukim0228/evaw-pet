"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { reviews } from "@/lib/reviews";

// 후기 캐러셀 — 2026-09-16 스펙: slidesPerView 1(모바일)→2(640px)→3(1024px), grabCursor, autoplay,
// hover 시 일시정지.
// 2026-09-16(3차): STEP5로 6건 확보되면서 loop 전환(3개씩 보여도 항상 다음 3개가 있어 자연스럽게 순환).
export default function ReviewSlider() {
  return (
    <Swiper
      className="review-grid"
      modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={16}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      grabCursor
      loop
      autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
    >
      {reviews.map((r) => (
        <SwiperSlide key={r.name + r.course}>
          <div className="review-card">
            <div className="review-quote-mark" aria-hidden="true">
              &ldquo;
            </div>
            <div className="review-headline">{r.headline}</div>
            <p className="review-text">{r.text}</p>
            <div className="review-footer">
              <span className="review-who">
                <span className="review-avatar" aria-hidden="true">
                  {r.avatar}
                </span>
                <span className="review-name">{r.name}</span>
              </span>
              <span className="review-course-badge">{r.course}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
