"use client";

import { FormEvent, useEffect, useState } from "react";
import { courses } from "@/lib/courses";
import { useConsultModal } from "./ConsultModalContext";

// TODO: 제출 처리(문자·이메일·카톡·시트 연동)는 수신 방식 확정 후 이 함수 안에서 실제 전송으로 교체.
// 정적 export라 Next.js API 라우트는 못 씀 — 외부 폼 수신 서비스 연동 예정. (ConsultForm.tsx와 동일한 제약)
export default function ConsultModal() {
  const { isOpen, presetSlug, presetBranch, close } = useConsultModal();
  const [submitted, setSubmitted] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);

  // 퀵메뉴·과정상세 등에서 특정 과정을 지정해 열었을 때 그 과정을 미리 체크.
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setInterests(presetSlug ? [presetSlug] : []);
    }
  }, [isOpen, presetSlug]);

  if (!isOpen) return null;

  function toggleInterest(slug: string) {
    setInterests((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="상담 신청" onClick={close}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="닫기" onClick={close}>
          ×
        </button>

        {submitted ? (
          <p style={{ textAlign: "center", fontWeight: 700, padding: "20px 0" }}>
            상담 신청이 접수되었습니다.
            <br />
            <span style={{ fontWeight: 400, fontSize: ".88rem", color: "var(--ink-soft)" }}>
              (초안 화면 — 실제 담당자 알림 연동 전입니다)
            </span>
          </p>
        ) : (
          <form className="consult-form" style={{ padding: 0 }} onSubmit={handleSubmit}>
            <h3 className="sec-title" style={{ fontSize: "1.2rem", marginBottom: 4 }}>
              상담 신청
            </h3>
            <p className="sec-sub" style={{ marginBottom: 18 }}>
              관심 있는 과정을 선택해 주시면 더 정확히 안내해 드립니다.
            </p>

            {presetBranch && (
              <div className="field">
                <label>관심 지점</label>
                <p className="preset-branch-chip">{presetBranch}</p>
              </div>
            )}

            <div className="field">
              <label>관심 과정 (선택)</label>
              <div className="interest-checks">
                {courses.map((c) => (
                  <label key={c.slug} className="interest-check">
                    <input
                      type="checkbox"
                      checked={interests.includes(c.slug)}
                      onChange={() => toggleInterest(c.slug)}
                    />
                    {c.title}
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="m-name">이름</label>
              <input id="m-name" name="name" type="text" placeholder="이름을 입력해 주세요" required />
            </div>
            <div className="field">
              <label htmlFor="m-phone">연락처</label>
              <input
                id="m-phone"
                name="phone"
                type="tel"
                placeholder="010-0000-0000"
                maxLength={13}
                required
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.value = el.value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
                }}
              />
            </div>
            <label className="agree">
              <input type="checkbox" required />
              개인정보 수집·이용에 동의합니다. <span className="tbd">[약관 내용 확정 필요]</span>
            </label>
            <button type="submit" className="btn btn-primary btn-lg btn-full">
              상담 신청하기
            </button>
            <p className="form-note">※ 제출 처리(문자·이메일·카톡·시트 연동)는 아직 연결 전입니다. 지금은 화면 안내만 표시됩니다.</p>
          </form>
        )}
      </div>
    </div>
  );
}
