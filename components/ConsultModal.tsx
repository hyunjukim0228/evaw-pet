"use client";

import { FormEvent, useEffect, useState } from "react";
import { courses } from "@/lib/courses";
import { branches } from "@/lib/branches";
import { supabase } from "@/lib/supabase";
import { useConsultModal } from "./ConsultModalContext";

const branchLabel = (b: (typeof branches)[number]) => `${b.name} 애견미용학원 (${b.region})`;
const defaultBranchLabel = branchLabel(branches.find((b) => b.isCurrent) ?? branches[0]);

const INTENT_COPY = {
  consult: { title: "상담 신청", lead: "관심 있는 과정을 선택해 주시면 더 정확히 안내해 드립니다.", submit: "상담 신청하기" },
  tuition: { title: "간편 수강료 조회", lead: "관심 과정과 지점을 선택해 주시면 수강료를 안내해 드립니다.", submit: "수강료 조회하기" },
};

export default function ConsultModal() {
  const { isOpen, presetSlug, presetBranch, intent, close } = useConsultModal();
  const [submitted, setSubmitted] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [branch, setBranch] = useState(defaultBranchLabel);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const copy = INTENT_COPY[intent];

  // 퀵메뉴·과정상세 등에서 특정 과정을 지정해 열었을 때 그 과정을 미리 체크. 지점은 카드 클릭 프리셋이 있으면 그걸,
  // 없으면 이 사이트 기본 지점(대전)을 기본값으로 — 어느 쪽이든 사용자가 드롭다운에서 직접 바꿀 수 있음.
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError(null);
      setInterests(presetSlug ? [presetSlug] : []);
      setBranch(presetBranch ?? defaultBranchLabel);
    }
  }, [isOpen, presetSlug, presetBranch]);

  if (!isOpen) return null;

  function toggleInterest(slug: string) {
    setInterests((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError("지금은 상담 신청을 접수할 수 없습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;

    setLoading(true);
    const { error: dbError } = await supabase.from("consult_requests").insert({
      name,
      phone,
      course_interests: interests,
      branch_interest: branch,
      source_page: presetSlug ? `curriculum/${presetSlug}` : intent === "tuition" ? "modal-tuition" : "modal",
    });
    setLoading(false);

    if (dbError) {
      setError("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
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
              담당자가 확인 후 연락드리겠습니다.
            </span>
          </p>
        ) : (
          <form className="consult-form" style={{ padding: 0 }} onSubmit={handleSubmit}>
            <h3 className="sec-title" style={{ fontSize: "1.2rem", marginBottom: 4 }}>
              {copy.title}
            </h3>
            <p className="sec-sub" style={{ marginBottom: 18 }}>
              {copy.lead}
            </p>

            <div className="field">
              <label htmlFor="m-branch">지점 선택</label>
              <select id="m-branch" name="branch" className="field-input" value={branch} onChange={(e) => setBranch(e.target.value)}>
                {branches.map((b) => (
                  <option key={b.name} value={branchLabel(b)}>
                    {branchLabel(b)}
                    {b.isCurrent ? " · 지금 보고 계신 지점" : ""}
                  </option>
                ))}
              </select>
            </div>

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
            {error && (
              <p className="form-note" style={{ color: "var(--error)" }}>
                {error}
              </p>
            )}
            <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={loading}>
              {loading ? "접수 중..." : copy.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
