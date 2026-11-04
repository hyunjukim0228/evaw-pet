"use client";

// 홈 하단 상담 섹션의 인라인 폼.
// 2026-11-04: 단일 폼(지점·이름·연락처)에서 4단계 폼(TuitionSteps)으로 교체 — 켈리스의 `quickdb-wrap`
// (빠른 수강료 조회) 구조 참고. 모달판(ConsultModal)과 같은 컴포넌트를 공유해 폼이 두 벌로 갈라지지 않게 함.
import { useState } from "react";
import TuitionSteps from "./TuitionSteps";

// presetSlug: 과정 상세 페이지에서 쓸 때 그 과정을 Step2에 미리 선택해 둔다(코리아펫도 과정 페이지의
// 수강료 폼이 해당 과정을 물고 간다). 홈에서는 넘기지 않아 빈 상태로 시작.
export default function ConsultForm({ presetSlug }: { presetSlug?: string } = {}) {
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <TuitionSteps intent="tuition" presetSlug={presetSlug} onError={setError} />
      {error && (
        <p className="form-note" style={{ color: "var(--error)" }} role="alert">
          {error}
        </p>
      )}
    </>
  );
}
