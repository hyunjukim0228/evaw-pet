import type { Metadata } from "next";
import Link from "next/link";
import CourseThumb from "@/components/CourseThumb";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "커리큘럼 | 애견미용학원 대전점",
  description: "애견미용학원 대전점 수강 과정 안내 — 3급·2급 자격증 과정부터 취업·창업 준비 과정까지.",
};

export default function CurriculumPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">홈</Link> / 커리큘럼
          </p>
          <span className="eyebrow">CURRICULUM</span>
          <h1>수강 과정 안내</h1>
          <p>자격증 취득부터 취업·창업 준비까지, 단계별 과정을 안내합니다.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="course-grid">
            {courses.map((course) => (
              <article key={course.slug} className={`course-card${course.highlight ? " course-card-highlight" : ""}`}>
                <CourseThumb src={course.cardImage} alt={course.title} className="ph-course" />
                <span className="course-badge">{course.badge}</span>
                <h3>{course.title}</h3>
                <p>{course.summary}</p>
                <p className="price">
                  수강료 <span className="tbd">상담 시 안내</span>
                </p>
                <Link href={`/curriculum/${course.slug}`} className="btn btn-outline btn-sm">
                  과정 자세히 보기
                </Link>
              </article>
            ))}
          </div>
          <p className="note">※ 위 과정 구성은 초안 예시입니다. 실제 개설 과정명·커리큘럼은 확정되는 대로 교체합니다.</p>
        </div>
      </section>

      <section className="consult">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">🎓 과정이 궁금하신가요?</h2>
          <p className="sec-sub">이름과 연락처만 남겨주시면 담당자가 안내해 드립니다.</p>
          <ConsultCtaButton className="btn btn-primary btn-lg">🎓 무료 상담 신청하기</ConsultCtaButton>
        </div>
      </section>
    </main>
  );
}
