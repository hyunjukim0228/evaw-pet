"use client";

import Link from "next/link";
import { useConsultModal } from "./ConsultModalContext";
import { courses } from "@/lib/courses";

// 헤더 바로 아래 상시 노출되는 유틸리티 바.
// 2026-11-04 사용자 요청: 흩어져 있던 과정 링크(행동교정·펫뷰티·취미반)를 지우고,
// "자격증" 카테고리 하나 안에 과정 전체를 분류해 넣음. 바는 자격증 / 수강료안내 / 상담신청 3개로 정리.
// ponytail: 드롭다운은 CSS :hover + :focus-within 만으로 처리 — 상태·바깥클릭 핸들러 없이 키보드도 동작.
export default function QuickMenu() {
  const { open } = useConsultModal();

  return (
    <div className="quick-menu">
      <div className="wrap quick-menu-inner">
        <div className="quick-menu-cat">
          <Link href="/curriculum" className="quick-menu-cat-btn" aria-haspopup="true">
            🏅 자격증 <span aria-hidden="true">▾</span>
          </Link>
          <ul className="quick-menu-sub">
            {courses.map((c) => (
              <li key={c.slug}>
                <Link href={`/curriculum/${c.slug}`}>{c.title}</Link>
              </li>
            ))}
            <li className="quick-menu-sub-all">
              <Link href="/curriculum">전체 과정 보기 →</Link>
            </li>
          </ul>
        </div>
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
