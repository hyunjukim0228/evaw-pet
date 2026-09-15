import Link from "next/link";
import CourseThumb from "@/components/CourseThumb";
import ConsultForm from "@/components/ConsultForm";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import HeroCarousel from "@/components/HeroCarousel";
import HeroCtaRow from "@/components/HeroCtaRow";
import QuickCourseNav from "@/components/QuickCourseNav";
import BenefitIcon from "@/components/BenefitIcon";
import CtaBanner from "@/components/CtaBanner";
import BranchCard from "@/components/BranchCard";
import { courses } from "@/lib/courses";
import { branches } from "@/lib/branches";
import { reviews } from "@/lib/reviews";
import { guideTopics } from "@/lib/guides";
import { galleryPhotos } from "@/lib/galleryPhotos";

const FAQS = [
  { q: "초보자도 수강 가능한가요?", a: "네, 대부분 처음 시작하시는 분들이며 기초 과정부터 차근차근 진행합니다." },
  { q: "자격증 취득까지 얼마나 걸리나요?", a: "과정과 개인 진도에 따라 다릅니다. 상담 시 정확한 기간을 안내해 드립니다." },
  { q: "실견 실습은 어떻게 진행되나요?", a: "실제 반려견을 대상으로 한 실습을 중심으로 진행합니다. 세부 방식은 상담 시 안내해 드립니다." },
  { q: "직장인·주부도 수강 가능한가요?", a: "시간대별 수업 운영 여부는 상담을 통해 확인해 드립니다." },
  { q: "수료 후 취업·창업이 가능한가요?", a: "수료 후 취업과 창업 모두 준비하실 수 있도록 안내하고 있습니다. 구체적인 지원 내용은 상담 시 확인해 주세요." },
  { q: "수강료는 얼마인가요?", a: "과정별로 상이하며, 상담을 통해 정확히 안내해 드립니다." },
  { q: "온라인으로도 배울 수 있나요?", a: "실습 중심 과정 특성상 오프라인 수업이 기본이며, 자세한 사항은 상담 시 안내합니다." },
  { q: "국비지원과 교육지원의 차이가 뭔가요?", a: "지원 제도별로 대상과 조건이 다릅니다. 상담 시 어떤 제도에 해당하는지 확인해 드립니다." },
  { q: "지점이 어디에 있나요?", a: "전국 19개 지점 네트워크 중 하나로 대전점을 운영하고 있습니다. 다른 지역 지점은 아래 전국 지점 안내에서 확인하실 수 있습니다." },
];

export default function HomePage() {
  return (
    <main id="top">
      {/* 히어로 배너 캐러셀 (PC/모바일 별도 이미지, 6슬라이드 — 켈리스 방식). */}
      <section className="hero" aria-label="메인 배너">
        <HeroCarousel />
        <div className="hero-copy">
          <p className="eyebrow hero-badge">📍 대전 · 애견미용학원</p>
          <h1>
            처음 배우는 애견미용,
            <br />
            <em>자격증부터 실전 실습까지</em>
          </h1>
          <p className="lead">애견미용학원 대전점에서 기초부터 차근차근 시작하세요.</p>
          <Link href="#consult" className="btn btn-primary btn-lg">
            🎓 무료 상담 신청하기
          </Link>
        </div>
      </section>

      {/* 히어로 보조 CTA·신뢰지표·빠른 과정 탐색 — evaw-pet-grooming.co.kr 홈 히어로 구조(CTA행·신뢰바·아이콘퀵메뉴)를
          참고하되, 문구·수치는 우리 실제 데이터만 쓰고 비주얼은 사이트 단일 액센트 디자인을 그대로 유지(레퍼런스의
          다색 파스텔 카드는 따라가지 않음). 전화·카톡·네이버 채널은 아직 없어 HeroCtaRow가 상담모달로 대체 처리. */}
      <section id="hero-extras">
        <div className="wrap">
          <HeroCtaRow />
          <div className="hero-trust-bar">
            <div className="trust-stat">
              <b>전국 19개</b>
              <span>직영지점 운영</span>
            </div>
            <div className="trust-stat">
              <b>100%</b>
              <span>가정견 실습</span>
            </div>
          </div>
          <QuickCourseNav />
        </div>
      </section>

      {/* 가정견미용 과정 하이라이트 사진 */}
      <section id="home-grooming-highlight">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">🛁 가정견미용 과정</h2>
          <p className="sec-sub">내 반려견을 집에서 직접 관리하고 싶은 분들을 위한 과정입니다.</p>
          <img src="/images/gallery/facility-12.jpg" alt="가정견미용 과정" className="highlight-photo" />
          <div style={{ marginTop: 20 }}>
            <Link href="/curriculum/home-grooming" className="btn btn-outline btn-sm">
              가정견미용 과정 자세히 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 강점 섹션 */}
      <section className="benefits">
        <div className="wrap">
          <span className="sec-tag">✨ 애견미용학원 대전점만의 차이</span>
          <h2 className="sec-title">이런 점이 다릅니다</h2>
          <ul className="benefit-grid">
            <li>
              <BenefitIcon name="certificate" />
              <b>자격증 3급·2급</b>
              <p>단계별 자격증 과정 운영</p>
            </li>
            <li>
              <BenefitIcon name="heart" />
              <b>실견 실습 중심</b>
              <p>실제 반려견 대상 실습 위주 수업</p>
            </li>
            <li>
              <BenefitIcon name="briefcase" />
              <b>취업·창업 지원</b>
              <p>수료 후 진로까지 함께 안내</p>
            </li>
            <li>
              <BenefitIcon name="chat" />
              <b>1:1 상담</b>
              <p>등록 전 궁금한 점 미리 확인</p>
            </li>
          </ul>
        </div>
      </section>

      {/* 학원 소개 (요약 — 전체 내용은 /about) */}
      <section id="about" className="about">
        <div className="wrap" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 className="sec-title">🏫 학원소개</h2>
          <p>
            애견미용학원 대전점은 기초부터 실전까지, 자격증 취득과 실무 역량을 함께 준비하는 애견미용 전문
            교육 공간입니다.
          </p>
          <p>
            강사진 소개, 연혁 등 상세 내용은 준비되는 대로 채워 넣습니다. <span className="tbd">[내용 확정 필요]</span>
          </p>
          <Link href="/about" className="btn btn-outline btn-sm">
            학원소개 자세히 보기
          </Link>
        </div>
      </section>

      {/* 시설·실습 — 네이버 플레이스에 등록된 실제 사진(브랜드 문구·미검증 수상 그래픽은 제외하고 순수 실습·완성 사진만 사용) */}
      <section id="gallery" className="gallery">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">📸 수업 현장</span>
          <h2 className="sec-title">시설·실습 사진</h2>
          <p className="sec-sub">실제 실습 현장과 완성 사진입니다.</p>
          <div className="photo-grid">
            {galleryPhotos.map((src) => (
              <img key={src} src={src} alt="애견미용 실습 현장" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* 커리큘럼 (요약 — 전체 내용은 /curriculum) */}
      <section id="curriculum" className="curriculum">
        <div className="wrap">
          <span className="sec-tag">📚 커리큘럼</span>
          <h2 className="sec-title">수강 과정 안내</h2>
          <div className="course-grid">
            {courses.map((course) => (
              <article key={course.slug} className="course-card">
                <CourseThumb src={course.cardImage} alt={course.title} className="ph-course" />
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

      {/* 수강생 후기 — 실제 후기 없어 구조만 설계, 예시 문구로 명시 */}
      <section id="reviews">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">⭐ 수강생 후기</span>
          <h2 className="sec-title">수강생들의 생생한 후기</h2>
          <p className="sec-sub">※ 아래는 구성 예시이며, 실제 수강생 후기로 교체될 예정입니다.</p>
          <div className="review-grid">
            {reviews.map((r) => (
              <div key={r.name + r.course} className="review-card">
                <div className="review-stars">{"★".repeat(r.rating)}</div>
                <p className="review-text">{r.text}</p>
                <p className="review-meta">
                  <b>{r.name}</b> · {r.course}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner text="궁금한 과정이 있으신가요? 지금 무료로 상담받아보세요." />

      {/* 분야별 특강 */}
      <section id="special">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🎯 스페셜 특강</span>
          <h2 className="sec-title">분야별 특강</h2>
          <p className="sec-sub">
            정규 과정과 별도로, 관심 있는 주제만 짧게 배워보는 특강도 준비되어 있습니다.
            <br />
            주제·일정은 <span className="tbd">상담 시 안내</span>해 드립니다.
          </p>
          <div style={{ marginTop: 24 }}>
            <ConsultCtaButton className="btn btn-outline btn-sm">특강 문의하기</ConsultCtaButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq">
        <div className="wrap">
          <span className="sec-tag">❓ FAQ</span>
          <h2 className="sec-title">자주 묻는 질문</h2>
          <div className="faq-list">
            {FAQS.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 가이드 콘텐츠 미리보기 */}
      <section id="guide-preview">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">💡 궁금할 때 보는 가이드</h2>
          <p className="sec-sub">자격증·비용·취업·창업까지, 자주 궁금해하시는 내용을 정리했습니다.</p>
          <div className="guide-grid">
            {guideTopics.slice(0, 3).map((g) => (
              <div key={g.slug} className="guide-card">
                <b>{g.title}</b>
                <p>{g.teaser}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link href="/guide" className="btn btn-outline btn-sm">
              가이드 전체보기
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner text="더 궁금한 점은 상담을 통해 자세히 안내해 드립니다." />

      {/* 오시는길 */}
      <section id="location" className="location">
        <div className="wrap location-info" style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 className="sec-title">📍 오시는길</h2>
          <p>
            <b>주소</b>
            <br />
            대전광역시 서구 대덕대로 182 10층 (지번 둔산동 1160)
          </p>
          <p>
            <b>전화</b>
            <br />
            <span className="tbd">전화번호 등록 예정</span>
          </p>
          <p className="note">※ 지도·주차·대중교통 안내는 추후 추가합니다.</p>
        </div>
      </section>

      {/* 전국 지점 */}
      <section id="branches">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">🗺️ 전국 지점</h2>
          <p className="sec-sub">애견미용학원 대전점은 전국 19개 지점 네트워크 중 하나입니다.</p>
          <div className="branch-grid">
            {branches.map((b) => (
              <BranchCard key={b.region + b.name} branch={b} />
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link href="/branches" className="btn btn-outline btn-sm">
              전국 지점 전체보기
            </Link>
          </div>
        </div>
      </section>

      {/* 상담 신청 CTA */}
      <section id="consult" className="consult">
        <div className="wrap">
          <h2 className="sec-title">🎓 지금 바로 무료 상담 받으세요</h2>
          <p className="sec-sub">이름과 연락처만 남겨주시면 담당자가 안내해 드립니다.</p>
          <ConsultForm />
        </div>
      </section>
    </main>
  );
}
