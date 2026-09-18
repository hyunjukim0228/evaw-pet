"use client";

import { getGuide } from "@/lib/guides";
import { useConsultModal } from "./ConsultModalContext";

// 가이드 카드를 누르면 뜨는 간단 요약 모달 — CoursePreviewModal·DifferentiatorModal과 같은 패턴 재사용.
export default function GuidePreviewModal({ slug, onClose }: { slug: string | null; onClose: () => void }) {
  const { open } = useConsultModal();
  if (!slug) return null;
  const guide = getGuide(slug);
  if (!guide) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`${guide.title} 안내`} onClick={onClose}>
      <div className="modal-panel course-preview-panel" onClick={(e) => e.stopPropagation()}>
        <div className="course-preview-header">
          <button className="modal-close" aria-label="닫기" onClick={onClose}>
            ×
          </button>
          <h3>{guide.title}</h3>
        </div>

        <div className="course-preview-body">
          <div className="course-preview-row">
            <span className="course-preview-label">📌 요약</span>
            <ul className="guide-modal-summary">
              {guide.summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          {guide.detail.map((p, i) => (
            <div className="course-preview-row" key={i}>
              <span className="course-preview-label">{i === 0 ? "💡 설명" : ""}</span>
              <p>{p}</p>
            </div>
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
            🎓 더 궁금하면 무료 상담하기
          </button>
          <button type="button" className="btn btn-outline btn-full" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
