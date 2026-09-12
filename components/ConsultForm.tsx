"use client";

import { FormEvent, useState } from "react";

// TODO: 상담폼 제출 처리(문자·이메일·카톡·시트 연동)는 수신 방식 확정 후 이 함수 안에서 실제 전송으로 교체.
// 정적 export(next.config.ts output:"export")라 Next.js API 라우트는 못 씀 — 외부 폼 수신 서비스(구글폼 웹훅 등) 연동 예정.
export default function ConsultForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p style={{ textAlign: "center", fontWeight: 700, padding: "20px 0" }}>
        상담 신청이 접수되었습니다.
        <br />
        <span style={{ fontWeight: 400, fontSize: ".88rem", color: "var(--muted)" }}>
          (초안 화면 — 실제 담당자 알림 연동 전입니다)
        </span>
      </p>
    );
  }

  return (
    <form className="consult-form" onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary btn-lg btn-full">
        상담 신청하기
      </button>
      <p className="form-note">※ 제출 처리(문자·이메일·카톡·시트 연동)는 아직 연결 전입니다. 지금은 화면 안내만 표시됩니다.</p>
    </form>
  );
}
