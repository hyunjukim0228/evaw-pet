"use client";

import { FormEvent, useState } from "react";
import { branches } from "@/lib/branches";
import { supabase } from "@/lib/supabase";

const branchLabel = (b: (typeof branches)[number]) => `${b.name} 애견미용학원 (${b.region})`;
const defaultBranchLabel = branchLabel(branches.find((b) => b.isCurrent) ?? branches[0]);

export default function ConsultForm() {
  const [submitted, setSubmitted] = useState(false);
  const [branch, setBranch] = useState(defaultBranchLabel);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      course_interests: [],
      branch_interest: branch,
      source_page: "home",
    });
    setLoading(false);

    if (dbError) {
      setError("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p style={{ textAlign: "center", fontWeight: 700, padding: "20px 0" }}>
        상담 신청이 접수되었습니다.
        <br />
        <span style={{ fontWeight: 400, fontSize: ".88rem", color: "var(--muted)" }}>
          담당자가 확인 후 연락드리겠습니다.
        </span>
      </p>
    );
  }

  return (
    <form className="consult-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="f-branch">지점 선택</label>
        <select id="f-branch" name="branch" className="field-input" value={branch} onChange={(e) => setBranch(e.target.value)}>
          {branches.map((b) => (
            <option key={b.name} value={branchLabel(b)}>
              {branchLabel(b)}
              {b.isCurrent ? " · 지금 보고 계신 지점" : ""}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-name">이름</label>
        <input id="f-name" name="name" type="text" placeholder="이름을 입력해 주세요" required />
      </div>
      <div className="field">
        <label htmlFor="f-phone">연락처</label>
        <input
          id="f-phone"
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
        {loading ? "접수 중..." : "상담 신청하기"}
      </button>
    </form>
  );
}
