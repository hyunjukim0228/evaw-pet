"use client";

// 우측 세로 퀵바 (2026-11-04 신설) — 켈리스 `main-quick-fixed` / `quick-container` 구조 참고.
// 항목: 수강료조회 · 상담신청 · 장학지원 · 카톡상담 + 대표번호.
//
// ⚠️ 노출 조건 주의: 과거 플로팅 CTA가 본문 카드 글자를 가리는 버그가 있어서 원형 52px FAB까지 축소한
// 이력이 있음(FloatingCta 주석 참조). 그래서 이 세로 퀵바는 본문(.wrap 1400px)과 겹치지 않을 만큼
// 좌우 여백이 확보되는 화면에서만 띄우고(>=1560px), 그보다 좁으면 기존 FloatingCta가 그대로 담당한다.
// 노출 분기는 globals.css의 미디어쿼리에서 처리 — 여기서는 마크업만.

import Link from "next/link";
import { contactLinks } from "@/lib/contactLinks";
import { useConsultModal } from "./ConsultModalContext";

export default function QuickSideBar() {
  const { open } = useConsultModal();

  return (
    <aside className="quick-sidebar" aria-label="빠른 메뉴">
      <button type="button" className="quick-sidebar-item" onClick={() => open({ intent: "tuition" })}>
        <span className="quick-sidebar-icon" aria-hidden="true">
          💰
        </span>
        수강료조회
      </button>

      <button type="button" className="quick-sidebar-item" onClick={() => open()}>
        <span className="quick-sidebar-icon" aria-hidden="true">
          🎓
        </span>
        상담신청
      </button>

      <Link href="/scholarship" className="quick-sidebar-item">
        <span className="quick-sidebar-icon" aria-hidden="true">
          🎒
        </span>
        장학지원
      </Link>

      <a className="quick-sidebar-item" href={contactLinks.kakaoUrl} target="_blank" rel="noopener noreferrer">
        <span className="quick-sidebar-icon" aria-hidden="true">
          💬
        </span>
        카톡상담
      </a>

      {/* 대표번호 — 켈리스의 Customer Center 블록 대응. 번호는 확정값(lib/contactLinks.ts). */}
      <div className="quick-sidebar-tel">
        <span className="quick-sidebar-tel-label">대표번호</span>
        <a className="quick-sidebar-tel-num" href={`tel:${contactLinks.phone.replace(/-/g, "")}`}>
          {contactLinks.phone}
        </a>
        {/* 켈리스엔 "주말·공휴일 상담 가능" 안내가 붙어 있지만, 우리 학원 실제 상담 가능 시간은
            미확인이라 넣지 않음(추측으로 사실을 채우지 않는다는 원칙). 확정되면 여기에 추가. */}
      </div>
    </aside>
  );
}
