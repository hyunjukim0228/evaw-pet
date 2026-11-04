import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseThumb from "@/components/CourseThumb";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import BenefitIcon from "@/components/BenefitIcon";
import CourseSubNav from "@/components/CourseSubNav";
import ConsultForm from "@/components/ConsultForm";
import { courses, getCourse, careerBenefits, courseDifferentiators } from "@/lib/courses";
import { faqs } from "@/lib/faq";

// 2026-11-04: 과정 상세를 코리아펫아카데미(kelispetacademy.com) 과정 상세 흐름으로 재구성.
// 저쪽 순서: 영문 레벨명+국문 과정명(급수) → 왜 이 과정인가 → 수료하면 무엇을 할 수 있나 → 선택의 근거
//            → "처음 해도 따라갈 수 있나요?" → 교육 과정 → 수강 안내 → 수강료 조회 폼
// 구조만 참고하고 문구·사진은 전부 우리 기존 데이터(lib/courses.ts, lib/faq.ts)만 사용.
// 색·폰트는 겨울 시즌 톤(버건디·골드·아이스블루) 그대로 유지 — 2026-11-04 사용자 확정.
// 분석 근거: ai-website-cloner/docs/research/kelispetacademy/page-brief.md

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

// "처음 해도 따라갈 수 있나요?" 블록에 쓸 질문 — lib/faq.ts의 실제 답변만 골라 씀(새로 쓰지 않음).
const STARTER_QUESTIONS = [
  "완전 초보인데 따라갈 수 있을까요?",
  "나이가 많은데 시작해도 될까요?",
  "직장을 다니는데 시간이 될까요?",
  "개를 무서워하는데 배울 수 있을까요?",
];

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const photo = course.detailImage ?? course.cardImage;
  const starterFaqs = STARTER_QUESTIONS.map((q) => faqs.find((f) => f.q === q)).filter(
    (f): f is NonNullable<typeof f> => Boolean(f)
  );

  return (
    <main>
      {/* ── 과정 타이틀 (코리아펫 `curri-top`) — 영문 레벨명 위, 국문 과정명 + 급수 뱃지 ── */}
      <section className="curri-top">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">홈</Link> / <Link href="/curriculum">커리큘럼</Link> / {course.title}
          </p>
          <p className="curri-top-en">{course.enName}</p>
          <h1 className="curri-top-title">
            {course.title} <span className="curri-top-badge">{course.badge}</span>
          </h1>
          <p className="curri-top-sum">{course.summary}</p>
        </div>
      </section>

      {/* 과정 사이 이동 — 코리아펫 `sub-menu-list` */}
      <div className="wrap">
        <CourseSubNav activeSlug={course.slug} />
      </div>

      {/* ── 1. 왜 이 과정인가 ── */}
      <section>
        <div className="wrap">
          <span className="sec-tag">📌 과정 소개</span>
          <h2 className="sec-title">왜 이 과정인가</h2>
          <div className={`curri-why${photo ? " has-photo" : ""}`}>
            {photo && (
              <div className="curri-why-media">
                <CourseThumb
                  src={photo}
                  srcMo={course.detailImageMo}
                  alt={`${course.title} — ${course.summary}`}
                  className="ph-course"
                />
              </div>
            )}
            <div className="curri-why-text">
              <p className="curri-why-desc">{course.description}</p>
              <ul className="curri-why-points">
                {course.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="curri-why-for">
                <b>추천 대상</b> {course.recommendFor}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 수료하면 무엇을 할 수 있나 ── */}
      <section>
        <div className="wrap">
          <span className="sec-tag">🏅 수료 후</span>
          <h2 className="sec-title">수료하면 무엇을 할 수 있나</h2>
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

      {/* ── 3. 선택의 근거 (차별점) ── */}
      <section>
        <div className="wrap">
          <span className="sec-tag">✨ 선택의 근거</span>
          <h2 className="sec-title">왜 여기서 배우는가</h2>
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

      {/* ── 4. 처음 해도 따라갈 수 있나요? (코리아펫 과정상세의 같은 이름 블록) ──
             답변은 lib/faq.ts의 실제 FAQ 문항을 그대로 가져옴 — 과정별로 새로 쓰지 않음. */}
      <section>
        <div className="wrap">
          <span className="sec-tag">🙋 시작 전 걱정</span>
          <h2 className="sec-title">처음 해도 따라갈 수 있나요?</h2>
          <ul className="curri-starter">
            {starterFaqs.map((f) => (
              <li key={f.q}>
                <p className="curri-starter-q">{f.q}</p>
                <p className="curri-starter-a">{f.a}</p>
              </li>
            ))}
          </ul>
          <p className="note">
            더 많은 질문은 <Link href="/#faq">자주 묻는 질문</Link>에서 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* ── 5. 교육 과정 (단계표) ── */}
      <section>
        <div className="wrap">
          <span className="sec-tag">📚 교육 과정</span>
          <h2 className="sec-title">이 순서로 진행합니다</h2>
          <ol className="curri-table">
            {course.steps.map((step, i) => (
              <li key={step}>
                <span className="curri-table-num">STEP {String(i + 1).padStart(2, "0")}</span>
                <span className="curri-table-text">{step}</span>
              </li>
            ))}
          </ol>
          <p className="note">※ 실제 진도·회차는 개인 진도에 따라 달라지며 상담 시 안내해 드립니다.</p>
        </div>
      </section>

      {/* ── 6. 수강 안내 ── */}
      <section>
        <div className="wrap">
          <span className="sec-tag">🗓 수강 안내</span>
          <h2 className="sec-title">수강 안내</h2>
          <dl className="curri-info">
            <div>
              <dt>과정명</dt>
              <dd>
                {course.title} <span className="curri-info-en">{course.enName}</span>
              </dd>
            </div>
            <div>
              <dt>추천 대상</dt>
              <dd>{course.recommendFor}</dd>
            </div>
            <div>
              <dt>진행 방식</dt>
              <dd>{course.duration ?? "상담 시 안내"}</dd>
            </div>
            <div>
              <dt>수강료</dt>
              <dd>
                <span className="tbd">상담 시 안내</span>
              </dd>
            </div>
            <div>
              <dt>실습 환경</dt>
              <dd>
                100% 가정견 실습 · 기초 미용도구 지원 (<Link href="/#facility">시설 보기</Link>)
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── 7. 수강료 조회 폼 — 코리아펫은 모든 과정 상세 하단에 같은 폼을 둔다 ── */}
      <section className="consult">
        <div className="wrap">
          <span className="sec-tag">💰 수강료 조회</span>
          <h2 className="sec-title">{course.title} 수강료가 궁금하신가요?</h2>
          <p className="sec-sub">4단계만 선택하시면 담당자가 확인 후 안내해 드립니다.</p>
          <ConsultForm presetSlug={course.slug} />
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <ConsultCtaButton className="btn btn-outline btn-sm" presetSlug={course.slug}>
              전화·카톡으로 바로 상담하기
            </ConsultCtaButton>
          </div>
        </div>
      </section>
    </main>
  );
}
