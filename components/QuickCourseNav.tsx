"use client";

import { useState } from "react";
import BenefitIcon from "./BenefitIcon";
import CoursePreviewModal from "./CoursePreviewModal";
import type { IconName } from "./icons";

// 히어로 아래 "빠른 과정 탐색" 4카드 — 누르면 링크 이동 대신 과정 소개 팝업이 먼저 뜨고,
// 팝업 안의 "무료 상담 + 수강료 확인하기"에서 상담모달로 이어짐(evaw-pet-grooming.co.kr 아이콘퀵메뉴 구조 참고).
const QUICK_COURSES: { slug: string; label: string; icon: IconName }[] = [
  { slug: "level-3", label: "자격증", icon: "certificate" },
  { slug: "behavior", label: "행동교정", icon: "chat" },
  { slug: "home-grooming", label: "가정견미용", icon: "heart" },
  { slug: "career", label: "취업창업", icon: "briefcase" },
];

export default function QuickCourseNav() {
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const previewIcon = QUICK_COURSES.find((c) => c.slug === previewSlug)?.icon ?? "certificate";

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
            <BenefitIcon name={c.icon} />
            {c.label}
          </button>
        ))}
      </div>
      <CoursePreviewModal slug={previewSlug} icon={previewIcon} onClose={() => setPreviewSlug(null)} />
    </>
  );
}
