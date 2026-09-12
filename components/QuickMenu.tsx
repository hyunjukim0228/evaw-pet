"use client";

import Link from "next/link";
import { useConsultModal } from "./ConsultModalContext";

// 켈리스 홈 상단 "퀵메뉴 플로팅"(수강료조회·온라인상담·국비지원조회) 참고 — 헤더 바로 아래 상시 노출되는 유틸리티 바.
// 국비지원 여부는 확정 전이라 넣지 않고, 확인된 3개 항목만 구성.
export default function QuickMenu() {
  const { open } = useConsultModal();

  return (
    <div className="quick-menu">
      <div className="wrap quick-menu-inner">
        <button type="button" onClick={() => open()}>
          수강료 상담
        </button>
        <button type="button" onClick={() => open()}>
          온라인 상담
        </button>
        <Link href="/curriculum">자격증 안내</Link>
      </div>
    </div>
  );
}
