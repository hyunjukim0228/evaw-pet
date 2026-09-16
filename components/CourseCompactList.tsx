"use client";

import { useState } from "react";
import { courses } from "@/lib/courses";
import CoursePreviewModal from "./CoursePreviewModal";

// STEP4: 홈 "수강 과정 안내"를 사진 카드 그리드 대신 번호+제목+한줄설명 컴팩트 리스트로,
// 클릭하면 CoursePreviewModal(기존 과정 미리보기 팝업)이 뜨는 구조로 변경.
export default function CourseCompactList() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  return (
    <>
      <ol className="course-compact-list">
        {courses.map((course, i) => (
          <li key={course.slug}>
            <button
              type="button"
              className={`course-compact-item${course.highlight ? " highlight" : ""}`}
              onClick={() => setSelectedSlug(course.slug)}
            >
              <span className="course-compact-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="course-compact-body">
                <span className="course-compact-title">
                  {course.title} <span className="course-badge">{course.badge}</span>
                </span>
                <span className="course-compact-desc">{course.summary}</span>
              </span>
              <span className="course-compact-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </li>
        ))}
      </ol>
      <CoursePreviewModal slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
    </>
  );
}
