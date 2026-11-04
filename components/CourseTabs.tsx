"use client";

// 교육과정 탭 + 탭별 카드 (2026-11-04 신설) — 켈리스 `main-curri` 구조 참고
// (저쪽은 학과 6탭 × 탭별 Swiper. 우리는 애견미용 단일 분야라 "목표별" 5탭으로 대응).
//
// 데이터는 lib/courses.ts 그대로 사용 — 새 문구를 만들지 않는다. 탭 묶음만 아래 GROUPS에서 정의.
// 홈 히어로 아래 CourseSlider(소유자 확정 프로모 3장)와는 별개 — 이건 "전체 과정 둘러보기" 역할.

import { useState } from "react";
import Link from "next/link";
import { courses } from "@/lib/courses";
import CourseThumb from "./CourseThumb";
import { useConsultModal } from "./ConsultModalContext";

// 탭 ↔ 과정(slug) 매핑. courses.ts의 badge를 그대로 라벨로 쓰지 않고 목표 단위로 묶음.
const GROUPS: { key: string; label: string; slugs: string[] }[] = [
  { key: "start", label: "입문", slugs: ["basic"] },
  { key: "cert", label: "자격증", slugs: ["certificate"] },
  { key: "deep", label: "실무·심화", slugs: ["practice", "advanced"] },
  { key: "career", label: "취업·창업", slugs: ["career"] },
  { key: "special", label: "특강", slugs: ["special"] },
];

export default function CourseTabs() {
  const [active, setActive] = useState(GROUPS[0].key);
  const { open } = useConsultModal();

  const group = GROUPS.find((g) => g.key === active) ?? GROUPS[0];
  const shown = group.slugs.map((s) => courses.find((c) => c.slug === s)).filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <div className="course-tabs">
      <div className="course-tabs-nav" role="tablist" aria-label="교육과정 분류">
        {GROUPS.map((g) => (
          <button
            key={g.key}
            type="button"
            role="tab"
            id={`ctab-${g.key}`}
            aria-selected={active === g.key}
            aria-controls={`cpanel-${g.key}`}
            className={`course-tab${active === g.key ? " active" : ""}`}
            onClick={() => setActive(g.key)}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* key로 리마운트해 탭 전환 시 슬라이드-인 애니메이션 재생 (CSS .course-tabs-panel) */}
      <div
        key={group.key}
        id={`cpanel-${group.key}`}
        role="tabpanel"
        aria-labelledby={`ctab-${group.key}`}
        className="course-tabs-panel"
      >
        {shown.map((c) => (
          <article key={c.slug} className="course-tab-card">
            {/* 실제 사진이 있는 과정만 이미지가 렌더됨(없으면 글로만) — CourseThumb 기존 동작 그대로 */}
            <CourseThumb src={c.cardImage} alt={`${c.title} — ${c.summary}`} className="course-tab-photo" />
            <div className="course-tab-body">
              <span className="course-tab-badge">{c.badge}</span>
              <h3 className="course-tab-title">{c.title}</h3>
              <p className="course-tab-sum">{c.summary}</p>
              <ul className="course-tab-points">
                {c.points.slice(0, 4).map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="course-tab-actions">
                <Link href={`/curriculum/${c.slug}`} className="btn btn-outline btn-sm">
                  자세히 보기
                </Link>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => open({ courseSlug: c.slug, intent: "tuition" })}
                >
                  수강료 조회
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
