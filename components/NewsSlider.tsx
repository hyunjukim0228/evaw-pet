"use client";

// 새소식 날짜 카드 슬라이더 (2026-11-04) — 켈리스 `main-photo`(포토스토리) 패턴 참고:
// 날짜를 앞세운 카드가 옆으로 넘어가는 형태. 기존 정적 3열 그리드(.news-grid)를 대체.
// 데이터는 lib/news.ts 그대로 — 새 소식을 만들어 넣지 않는다.

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { news } from "@/lib/news";

// "2026-09-16" → "2026.09.16" (켈리스식 점 구분 표기)
const dot = (d: string) => d.replace(/-/g, ".");

export default function NewsSlider() {
  return (
    <Swiper
      className="news-slider"
      modules={[Autoplay]}
      slidesPerView={1.1}
      spaceBetween={14}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1400: { slidesPerView: 4 } }}
      grabCursor
      loop={news.length > 3}
      autoplay={{ delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true }}
    >
      {news.map((n) => (
        <SwiperSlide key={n.branch + n.title}>
          <article className="news-slide-card">
            <div className="news-slide-head">
              <span className="news-branch-badge">{n.branch}</span>
              <time className="news-slide-date" dateTime={n.date}>
                {dot(n.date)}
              </time>
            </div>
            <h3 className="news-slide-title">{n.title}</h3>
            <p className="news-slide-sum">{n.summary}</p>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
