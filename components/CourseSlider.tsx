"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import HomeGroomingDetail from "./HomeGroomingDetail";

// 2026-10-15 사용자 요청: 홈 과정 카드 3장을 슬라이드로 — 좌우 버튼으로 넘기고, 모바일도 세로 나열 대신
// 손으로 넘기거나 천천히 자동으로 넘어가게. 각 사진 위에 과정 제목. 순서 자격증 → 실견 → 취미.
const SLIDES = [
  {
    title: "3급2급 자격증 동시취득 과정",
    mainSrc: "/images/license-main.webp",
    mainAlt: "한국애견미용인협회(KAPP) 3급·2급 자격증 동시취득 — 시험 결과에 따라 동시취득 가능. 가위 기초·위그 연습·자격증 준비·개별진도. 자격증 과정 알아보기",
    detailSrc: "/images/license-detail.webp",
    detailAlt: "KAPP 민간자격 3급·2급 자격증 동시취득 — STEP 01 가위 기초 연습, STEP 02 위그로 컷 연습, STEP 03 필기·실기 시험 준비. 필기 80점 이상, 실기 램클립 2시간(3급 75점·2급 90점 이상). 국가공인 자격이 아닌 민간자격",
    buttonLabel: "3급/2급 자격증동시취득",
    consultLabel: "🎓 자격증 과정 상담하기",
  },
  {
    title: "가정견 실습",
    mainSrc: "/images/home-grooming-main.webp",
    mainAlt: "가정견 100% 실습 환경 — 가정견이 미용을 온다?! 미용 상담부터 보호자 인계까지 실무 그대로. 실견수업 현장 보러가기",
    detailSrc: "/images/home-grooming-practice.webp",
    detailAlt: "가정견 100% 미용실습 — 보호자와 함께 오는 가정견, 상담부터 인계까지(미용 상담·목욕과 드라이·전체 미용·보호자 인계) 직접 배우는 실견수업",
    buttonLabel: "가정견 100% 실견수업 살펴보기",
    consultLabel: "🎓 실견수업·교육과정 문의하기",
  },
  {
    title: "자견케어과정",
    mainSrc: "/images/hobby-care-main.webp",
    mainAlt: "반려견 케어 취미반 4주 과정 — 내 손으로 시작하는 우리 강아지 케어. 가위 기초·위그 연습·위생미용·목욕과 드라이. 취미반 수강 상담하기",
    detailSrc: "/images/hobby-care-detail.webp",
    detailAlt: "반려견 케어 취미반 4주 교육과정 — 1~2주차 가위 기초·부분 위그 실습, 3주차 얼굴 위그 디자인컷, 4주차 자견 위생미용·베이싱. 수업 일정과 수강 안내는 상담으로 확인",
    buttonLabel: "반려견 케어 취미반 살펴보기",
    consultLabel: "🐶 취미반 수강 상담하기",
  },
];

export default function CourseSlider() {
  return (
    <div className="course-slider">
      <button type="button" className="cs-nav cs-prev" aria-label="이전 과정">
        ‹
      </button>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1.15}
        centeredSlides
        spaceBetween={16}
        breakpoints={{ 768: { slidesPerView: 2, centeredSlides: false, spaceBetween: 28 } }}
        navigation={{ prevEl: ".cs-prev", nextEl: ".cs-next" }}
        pagination={{ clickable: true }}
        rewind
        grabCursor
        speed={700}
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      >
        {SLIDES.map(({ title, ...detail }) => (
          <SwiperSlide key={title}>
            <h3 className="cs-title">{title}</h3>
            <HomeGroomingDetail {...detail} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button type="button" className="cs-nav cs-next" aria-label="다음 과정">
        ›
      </button>
    </div>
  );
}
