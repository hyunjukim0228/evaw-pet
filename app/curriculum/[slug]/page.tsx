import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseThumb from "@/components/CourseThumb";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import BenefitIcon from "@/components/BenefitIcon";
import { courses, getCourse, careerBenefits, courseDifferentiators } from "@/lib/courses";

// 정적 export(output:"export")는 동적 라우트의 모든 경로를 빌드 시점에 알아야 함 — 과정 추가 시 lib/courses.ts만 고치면 자동 반영.
export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} | 애견미용학원 대전점`,
    description: course.summary,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const hasPhoto = Boolean(course.detailImage ?? course.cardImage);

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">홈</Link> / <Link href="/curriculum">커리큘럼</Link> / {course.title}
          </p>
          <span className="eyebrow">CURRICULUM</span>
          <h1>{course.title}</h1>
          <p>{course.summary}</p>
        </div>
      </section>

      <section>
        <div className={`wrap${hasPhoto ? " two-col" : ""}`} style={hasPhoto ? undefined : { maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          {hasPhoto && (
            <div className="about-media">
              <CourseThumb
                src={course.detailImage ?? course.cardImage}
                srcMo={course.detailImageMo}
                alt={course.title}
                className="ph-course"
              />
            </div>
          )}
          <div className="about-text">
            <h2 className="sec-title">📌 과정 소개</h2>
            <p>{course.description}</p>
            <p className="price" style={{ margin: "16px 0" }}>
              수강료 <span className="tbd">상담 시 안내</span>
            </p>
            <ul className="course-detail-points">
              {course.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 커리큘럼 단계 — 켈리스 과정상세 구조 참고, 실제 진도는 확정 필요 */}
      <section>
        <div className="wrap">
          <h2 className="sec-title">📚 커리큘럼 단계</h2>
          <p className="sec-sub">아래 순서로 진행합니다. (실제 진도·회차는 상담 시 안내)</p>
          <ol className="curri-steps">
            {course.steps.map((step, i) => (
              <li key={step}>
                <span className="curri-step-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 진로·혜택 — 과정 공통 신뢰 섹션 */}
      <section>
        <div className="wrap">
          <h2 className="sec-title">🏅 이 과정을 마치면</h2>
          <ul className="benefit-grid">
            {careerBenefits.map((b) => (
              <li key={b.title}>
                <BenefitIcon name={b.icon} />
                <b>{b.title}</b>
                <p>{b.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 차별점 — 과정 공통 신뢰 섹션 */}
      <section>
        <div className="wrap">
          <h2 className="sec-title">✨ 애견미용학원 대전점의 차별점</h2>
          <ul className="benefit-grid benefit-grid-3col">
            {courseDifferentiators.map((d) => (
              <li key={d.title}>
                <BenefitIcon name={d.icon} />
                <b>{d.title}</b>
                <p>{d.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 시설 안내 — 학원소개 갤러리로 연결 */}
      <section>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">📸 수업이 진행되는 곳</h2>
          <p className="sec-sub">
            시설·실습 사진은 <Link href="/about#gallery">학원소개</Link>에서 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      <section className="consult">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">🎓 {course.title}이 궁금하신가요?</h2>
          <p className="sec-sub">이름과 연락처만 남겨주시면 담당자가 안내해 드립니다.</p>
          <ConsultCtaButton className="btn btn-primary btn-lg" presetSlug={course.slug}>
            🎓 무료 상담 신청하기
          </ConsultCtaButton>
        </div>
      </section>
    </main>
  );
}
