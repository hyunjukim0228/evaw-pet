"use client";

import Link from "next/link";
import { useConsultModal } from "./ConsultModalContext";

// 헤더 바로 아래 상시 노출되는 유틸리티 바 — 2026-09-13 사용자 지정 6항목으로 구성.
// 자격증·펫뷰티는 커리큘럼 전체로, 행동교정은 신설 과정 상세로, 취미반은 가정견미용 과정으로,
// 수강료안내·상담신청은 상담 모달로 연결.
export default function QuickMenu() {
  const { open } = useConsultModal();

  return (
    <div className="quick-menu">
      <div className="wrap quick-menu-inner">
        <Link href="/curriculum">🏅 자격증</Link>
        <Link href="/curriculum/behavior">🐾 행동교정</Link>
        <Link href="/curriculum">✂️ 펫뷰티</Link>
        <Link href="/curriculum/home-grooming">🛁 취미반</Link>
        <button type="button" onClick={() => open()}>
          💰 수강료안내
        </button>
        <button type="button" onClick={() => open()}>
          🎓 상담신청
        </button>
      </div>
    </div>
  );
}
