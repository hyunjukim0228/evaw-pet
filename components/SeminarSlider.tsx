"use client";

// 에듀세미나 (2026-11-04 신설) — 켈리스 `main-seminar` 구조 참고: 날짜 + 주제가 옆으로 넘어가는 슬라이더.
// lib/seminars.ts가 비어 있으면(=실제 개최 이력 미확인) 세미나를 지어내지 않고 "준비 중" 안내만 노출한다.
// 데이터가 채워지면 자동으로 슬라이더로 바뀐다.

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { seminars } from "@/lib/seminars";
import { useConsultModal } from "./ConsultModalContext";

const dot = (d: string) => d.replace(/-/g, ".");

export default function SeminarSlider() {
  const { open } = useConsultModal();

  if (seminars.length === 0) {
    return (
      <div className="seminar-empty">
        <p className="seminar-empty-title">
          세미나 일정은 <span className="tbd">[실제 개최 이력 확정 필요]</span>
        </p>
        <p className="seminar-empty-sub">
          특강·세미나 일정이 정해지면 이곳에서 안내해 드립니다. 지금 열리는 특강이 궁금하시면 상담으로 확인해 주세요.
        </p>
        <button type="button" className="btn btn-outline btn-sm" onClick={() => open()}>
          특강 일정 문의하기
        </button>
      </div>
    );
  }

  return (
    <Swiper
      className="seminar-slider"
      modules={[Autoplay]}
      slidesPerView={1.1}
      spaceBetween={14}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1400: { slidesPerView: 4 } }}
      grabCursor
      loop={seminars.length > 3}
      autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
    >
      {seminars.map((s) => (
        <SwiperSlide key={s.title + s.date}>
          <article className="seminar-card">
            <time className="seminar-date" dateTime={s.date}>
              {dot(s.date)}
            </time>
            <h3 className="seminar-title">{s.title}</h3>
            {s.summary && <p className="seminar-sum">{s.summary}</p>}
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
