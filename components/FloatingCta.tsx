"use client";

import { useConsultModal } from "./ConsultModalContext";

/** 데스크톱 전용 우측 하단 플로팅 버튼 — 원형 아이콘 버튼 한 개(FAB).
    모바일은 MobileCtaBar(하단 풀바)가 대신하므로 globals.css에서 숨김 처리.
    2026-09-16(3차): 전화/카톡/네이버 뱃지 3개 + 긴 문구 버튼 조합이 스크롤 중 우측하단에 오는 본문 카드
    글자를 가리는 실제 버그가 있었음(예: /curriculum/[slug] "이 과정을 마치면" 4번째 카드) — 뱃지 제거
    (Header에 이미 동일 뱃지 있어 중복) + 문구 축약까지 해봤지만, 4열 그리드가 .wrap 우측 끝까지 꽉 차는
    구조라 텍스트 버튼(112px 폭)로도 마지막 칸과 살짝 겹침이 남음(직접 좌표 측정으로 확인) — 원형 아이콘
    버튼(52px)으로 최종 축소해 겹치는 폭을 사실상 없앰. 문구는 헤더·본문 각 CTA에 이미 다 있어 의미 손실 없음. */
export default function FloatingCta() {
  const { open } = useConsultModal();
  return (
    <button type="button" className="floating-cta floating-cta-main" onClick={() => open()} aria-label="무료상담 + 수강료 확인하기">
      🎓
    </button>
  );
}
