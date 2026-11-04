import type { Metadata } from "next";
import Link from "next/link";
import CourseThumb from "@/components/CourseThumb";
import CourseSubNav from "@/components/CourseSubNav";
import ConsultForm from "@/components/ConsultForm";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import { courses } from "@/lib/courses";

// 2026-11-04: 코리아펫아카데미(kelispetacademy.com)의 "학과 인덱스" 템플릿 구조로 재구성.
// 저쪽: 학과 타이틀 → 과정 서브메뉴 → 과정 카드 열(영문 레벨명 + 국문 과정명 + 한 줄 설명) → 수강료 블록.
// 구조만 참고, 문구·사진은 기존 데이터 그대로. 겨울 시즌 톤 유지.
// 분석 근거: ai-website-cloner/docs/research/kelispetacademy/page-brief.md

export const metadata: Metadata = {
  title: "커리큘럼 | 애견미용학원 대전점",
  description: "애견미용학원 대전점 수강 과정 안내 — 3급·2급 자격증 과정부터 취업·창업 준비 과정까지.",
};

export default function CurriculumPage() {
  return (
    <main>
      {/* 학과 타이틀 (코리아펫 `sub-top`) */}
      <section className="curri-top">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">홈</Link> / 커리큘럼
          </p>
          <p className="curri-top-en">CURRICULUM</p>
          <h1 className="curri-top-title">수강 과정 안내</h1>
          <p className="curri-top-sum">자격증 취득부터 취업·창업 준비까지, 단계별 과정을 안내합니다.</p>
        </div>
      </section>

      <div className="wrap">
        <CourseSubNav />
      </div>

      {/* 과정 카드 열 (코리아펫 `curri-curri-col`) — 영문 레벨명을 카드 위에 얹음 */}
      <section>
        <div className="wrap">
          <ul className="curri-col">
            {courses.map((course) => (
              <li key={course.slug} className={`curri-col-card${course.highlight ? " highlight" : ""}`}>
                <Link href={`/curriculum/${course.slug}`} className="curri-col-link">
                  <div className="curri-col-media">
                    <CourseThumb src={course.cardImage} alt={`${course.title} — ${course.summary}`} className="ph-course" />
                  </div>
                  <div className="curri-col-body">
                    <p className="curri-col-en">{course.enName}</p>
                    <h2 className="curri-col-title">
                      {course.title} <span className="curri-col-badge">{course.badge}</span>
                    </h2>
                    <p className="curri-col-sum">{course.summary}</p>
                    <p className="curri-col-for">{course.recommendFor}</p>
                    <span className="curri-col-more">과정 자세히 보기 →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="note">※ 위 과정 구성은 초안 예시입니다. 실제 개설 과정명·커리큘럼은 확정되는 대로 교체합니다.</p>
        </div>
      </section>

      {/* 수강료 블록 — 코리아펫은 학과 인덱스에도 같은 수강료 조회 폼을 둔다 */}
      <section className="consult">
        <div className="wrap">
          <span className="sec-tag">💰 수강료 조회</span>
          <h2 className="sec-title">어떤 과정이 맞을지 모르겠다면</h2>
          <p className="sec-sub">4단계만 선택하시면 담당자가 확인 후 안내해 드립니다.</p>
          <ConsultForm />
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <ConsultCtaButton className="btn btn-outline btn-sm">전화·카톡으로 바로 상담하기</ConsultCtaButton>
          </div>
        </div>
      </section>
    </main>
  );
}
