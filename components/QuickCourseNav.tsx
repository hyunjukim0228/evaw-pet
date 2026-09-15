"use client";

import { useState } from "react";
import CoursePreviewModal from "./CoursePreviewModal";

// 히어로 아래 "빠른 과정 탐색" 카드 — 누르면 링크 이동 대신 과정 소개 팝업이 먼저 뜨고,
// 팝업 안의 "무료 상담 + 수강료 확인하기"에서 상담모달로 이어짐(evaw-pet-grooming.co.kr 아이콘퀵메뉴 구조 참고).
// 아이콘은 Fluent Emoji 3D(마이크로소프트, MIT 라이선스, public/images/icons3d/에 직접 저장) — "이모지·3D아이콘 활용" 요청 반영.
// 2026-09-15: 사용자 요청으로 행동교정·가정견미용 2개 제거, 자격증·취업창업만 유지(카드 크기는 CSS에서 확대).
const QUICK_COURSES: { slug: string; label: string; icon: string }[] = [
  { slug: "level-3", label: "자격증", icon: "/images/icons3d/scissors.png" },
  { slug: "career", label: "취업창업", icon: "/images/icons3d/briefcase.png" },
];

export default function QuickCourseNav() {
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const previewIcon = QUICK_COURSES.find((c) => c.slug === previewSlug)?.icon ?? QUICK_COURSES[0].icon;

  return (
    <>
      <div className="quick-course-nav">
        {QUICK_COURSES.map((c) => (
          <button
            key={c.slug}
            type="button"
            className="quick-course-card"
            onClick={() => setPreviewSlug(c.slug)}
          >
            <img src={c.icon} alt="" className="quick-course-icon" />
            {c.label}
          </button>
        ))}
      </div>
      <CoursePreviewModal slug={previewSlug} icon={previewIcon} onClose={() => setPreviewSlug(null)} />
    </>
  );
}
