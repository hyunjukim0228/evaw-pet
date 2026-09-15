"use client";

import { getCourse } from "@/lib/courses";
import { useConsultModal } from "./ConsultModalContext";

// evaw-pet-grooming.co.kr 홈 아이콘퀵메뉴를 누르면 뜨는 과정 소개 팝업(cModal) 구조 참고.
// 기존 Course 데이터(summary/description/points)만으로 채우고, 없는 정보(기간)는 "상담 시 안내"로 정직하게 표시.
export default function CoursePreviewModal({
  slug,
  icon,
  onClose,
}: {
  slug: string | null;
  icon: string;
  onClose: () => void;
}) {
  const { open } = useConsultModal();
  if (!slug) return null;
  const course = getCourse(slug);
  if (!course) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`${course.title} 안내`} onClick={onClose}>
      <div className="modal-panel course-preview-panel" onClick={(e) => e.stopPropagation()}>
        <div className="course-preview-header">
          <button className="modal-close" aria-label="닫기" onClick={onClose}>
            ×
          </button>
          <img src={icon} alt="" className="course-preview-icon-img" />
          <h3>{course.title}</h3>
          <p>{course.summary}</p>
        </div>

        <div className="course-preview-body">
          <div className="course-preview-row">
            <span className="course-preview-label">소개</span>
            <p>{course.description}</p>
          </div>
          <div className="course-preview-row">
            <span className="course-preview-label">기간</span>
            <p>{course.duration ?? "상담 시 안내"}</p>
          </div>
          <div className="course-preview-row">
            <span className="course-preview-label">추천</span>
            <p>{course.recommendFor}</p>
          </div>
          <div className="course-preview-row">
            <span className="course-preview-label">특징</span>
            <p>{course.points.slice(0, 2).join(" · ")}</p>
          </div>
        </div>

        <div className="course-preview-actions">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-full"
            onClick={() => {
              onClose();
              open({ courseSlug: course.slug });
            }}
          >
            🎓 무료 상담 + 수강료 확인하기
          </button>
          <button type="button" className="btn btn-outline btn-full" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
