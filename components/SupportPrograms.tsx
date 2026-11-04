"use client";

// 수강생 지원 제도 바로가기 (2026-11-04) — 켈리스 `main-benefit`(창업컨설팅·구인정보·마케팅교육·튜터링)
// 대응. 다만 "왜 이바우펫에서 해야 할까요?"(DifferentiatorGrid 6카드)가 이미 같은 역할을 하고 있어서
// 섹션을 통째로 또 만들지 않고, 켈리스에 있고 우리에게 없던 "지원 제도별 바로가기" 줄만 더한다.
//
// ⚠️ 여기 적힌 항목은 전부 이 사이트가 이미 주장하고 있는 것만 추림(새 제도를 만들어 쓰지 않음):
//   - 장학지원      → /scholarship 페이지 존재
//   - 무료 특강     → /free-lecture 페이지 존재
//   - 취업·창업 지원 → lib/courses.ts courseDifferentiators "취업·창업 개별 지원"
//   - 개별 맞춤 피드백 → lib/courses.ts courseDifferentiators "개별 맞춤 피드백"
// 켈리스의 "구인정보 제공"·"온라인 마케팅 교육지원"은 우리 학원이 한다는 근거가 없어 넣지 않았다.

import Link from "next/link";
import { useConsultModal } from "./ConsultModalContext";

export default function SupportPrograms() {
  const { open } = useConsultModal();

  return (
    <ul className="support-row">
      <li>
        <Link href="/scholarship" className="support-item">
          <span className="support-icon" aria-hidden="true">
            🎒
          </span>
          <b>장학지원</b>
          <span className="support-desc">수강료 부담을 덜 수 있는 장학 지원 안내</span>
        </Link>
      </li>
      <li>
        <Link href="/free-lecture" className="support-item">
          <span className="support-icon" aria-hidden="true">
            🎁
          </span>
          <b>무료 특강</b>
          <span className="support-desc">수강 전 분위기와 수업 방식을 먼저 경험</span>
        </Link>
      </li>
      <li>
        <button type="button" className="support-item" onClick={() => open({ courseSlug: "career" })}>
          <span className="support-icon" aria-hidden="true">
            💼
          </span>
          <b>취업·창업 지원</b>
          <span className="support-desc">취업연계·창업 컨설팅까지 개별 맞춤으로 지원</span>
        </button>
      </li>
      <li>
        <button type="button" className="support-item" onClick={() => open()}>
          <span className="support-icon" aria-hidden="true">
            🧑‍🏫
          </span>
          <b>개별 맞춤 피드백</b>
          <span className="support-desc">소수 정예로 진도를 강사가 직접 확인</span>
        </button>
      </li>
    </ul>
  );
}
