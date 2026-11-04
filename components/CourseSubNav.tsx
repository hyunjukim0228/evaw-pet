"use client";

// 과정 서브메뉴 (2026-11-04) — 코리아펫아카데미의 `sub-menu-wrap`/`sub-menu-list` 대응.
// 저쪽은 학과 인덱스·과정 상세 양쪽에 같은 과정 목록 바를 고정으로 달아, 과정 사이를 바로 오갈 수 있게 한다.
// 우리도 /curriculum(목록)과 /curriculum/[slug](상세)가 이 컴포넌트 하나를 공유한다.
// 데이터는 lib/courses.ts 그대로 — 색은 겨울 시즌 토큰 유지(버건디/골드).

import Link from "next/link";
import { courses } from "@/lib/courses";

export default function CourseSubNav({ activeSlug }: { activeSlug?: string }) {
  return (
    <nav className="course-subnav" aria-label="과정 바로가기">
      <ul className="course-subnav-list">
        {courses.map((c) => {
          const active = c.slug === activeSlug;
          return (
            <li key={c.slug}>
              <Link
                href={`/curriculum/${c.slug}`}
                className={`course-subnav-item${active ? " active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {c.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
