"use client";

import type { Differentiator } from "@/lib/courses";
import BenefitIcon from "./BenefitIcon";
import { useConsultModal } from "./ConsultModalContext";

// STEP3: 차별점 카드 클릭 시 뜨는 상세 모달 — CoursePreviewModal과 같은 구조(헤더+행 목록+CTA) 재사용.
export default function DifferentiatorModal({
  item,
  onClose,
}: {
  item: Differentiator | null;
  onClose: () => void;
}) {
  const { open } = useConsultModal();
  if (!item) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`${item.title} 안내`} onClick={onClose}>
      <div className="modal-panel course-preview-panel" onClick={(e) => e.stopPropagation()}>
        <div className="course-preview-header">
          <button className="modal-close" aria-label="닫기" onClick={onClose}>
            ×
          </button>
          <BenefitIcon name={item.icon} />
          <h3>{item.title}</h3>
          <p>{item.badge}</p>
        </div>

        <div className="course-preview-body">
          <div className="course-preview-row">
            <span className="course-preview-label">📌 핵심</span>
            <p>{item.core}</p>
          </div>
          <div className="course-preview-row">
            <span className="course-preview-label">💡 특징</span>
            <p>{item.feature}</p>
          </div>
          <div className="course-preview-row">
            <span className="course-preview-label">✅ 효과</span>
            <p>{item.effect}</p>
          </div>
        </div>

        <div className="diff-modal-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="diff-tag-chip">
              #{tag}
            </span>
          ))}
        </div>

        <div className="course-preview-actions">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-full"
            onClick={() => {
              onClose();
              open();
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
