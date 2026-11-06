import Link from "next/link";
import ConsultForm from "@/components/ConsultForm";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import HeroCarousel from "@/components/HeroCarousel";
import HeroCtaRow from "@/components/HeroCtaRow";
import QuickCourseNav from "@/components/QuickCourseNav";
import CtaBanner from "@/components/CtaBanner";
import BranchCard from "@/components/BranchCard";
import { branches } from "@/lib/branches";
import ReviewSlider from "@/components/ReviewSlider";
import GuideGrid from "@/components/GuideGrid";
import GallerySection from "@/components/GallerySection";
import FaqSection from "@/components/FaqSection";
import DifferentiatorGrid from "@/components/DifferentiatorGrid";
import CourseSlider from "@/components/CourseSlider";
// 2026-11-04 켈리스(코리아펫) 홈 부품 이식분 — 브리프: AI-Sessions/wiki/briefs/evawacademy-켈리스부품이식-20261104.md
import CourseTabs from "@/components/CourseTabs";
import NewsSlider from "@/components/NewsSlider";
import FacilityTour from "@/components/FacilityTour";
import SupportPrograms from "@/components/SupportPrograms";

// 학원소개 체크리스트 — **로 감싼 부분은 강조 표시(핵심 확인 포인트만 눈에 먼저 들어오게)
const CHECKLIST = [
  { title: "교육과정", desc: "처음 하는 사람도 따라갈 수 있는 **단계별 1:1 교육**인지 확인하세요." },
  { title: "100% 가정견 실습", desc: "농장·공장견이 아닌 **가정견 실습**인지 확인하세요." },
  { title: "자격증 단기 취득", desc: "**필수 교육기간**이 필요한지, **자격증별 기간**에 대해 확인하세요." },
  { title: "취업·창업 지원", desc: "수강·수료 이후 **취업 및 창업**까지, 이후 진로를 고려할 수 있는지 확인하세요." },
  { title: "비용·장학지원 혜택", desc: "월 수강 기준이 아닌 **재료비·응시료 포함 총 금액**과 지원을 확인하세요." },
];

export default function HomePage() {
  return (
    <main id="top">
      {/* 히어로 배너 캐러셀 (PC/모바일 별도 이미지, 6슬라이드 — 켈리스 방식). */}
      <section className="hero" aria-label="메인 배너">
        <HeroCarousel />
        {/* 2026-11-04: 배너 하단 물결 — 켈리스 `waves` 대응. 순수 CSS/SVG, 장식이므로 aria-hidden. */}
        <div className="hero-waves" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C240,80 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
        {/* 2026-10-15: 모바일 배너 아래 문구 블록(HeroCopy) 삭제 요청 — 검색엔진용 h1만 화면에 안 보이게 유지 */}
        <h1 className="sr-only">애견미용학원</h1>
      </section>

      {/* 히어로 보조 CTA·신뢰지표·빠른 과정 탐색 — evaw-pet-grooming.co.kr 홈 히어로 구조(큰 CTA버튼·채널행·신뢰바·
          아이콘퀵메뉴 + 오른쪽 사진)를 그대로 배치까지 참고, 문구·수치는 우리 실제 데이터만 쓰고 비주얼은 사이트
          단일 액센트 디자인을 그대로 유지(레퍼런스의 다색 파스텔 카드·네이비는 따라가지 않음). 전화 채널은 아직
          없어 HeroCtaRow가 상담모달로 대체 처리. 왼쪽 텍스트·CTA / 오른쪽 사진 슬라이드쇼 2단 배치(2026-09-15,
          "반투명 배경" 시도 대신 레퍼런스처럼 실제 사진 컬럼으로 교체). */}
      <section id="hero-extras">
        <div className="wrap">
          <div className="hero-extras-grid">
            <div>
              <ConsultCtaButton className="btn btn-primary btn-lg btn-full hero-main-cta">
                🎓 애견미용학원 장학지원 신청하기
              </ConsultCtaButton>
              <HeroCtaRow />
              <div className="hero-trust-bar">
                <div className="trust-stat">
                  <b>전국 21개</b>
                  <span>직영지점 운영</span>
                </div>
                <div className="trust-stat">
                  <b>5,600+명</b>
                  <span>누적 수강생</span>
                </div>
                <div className="trust-stat">
                  <b>100%</b>
                  <span>가정견 실습</span>
                </div>
              </div>
            </div>
            {/* 2026-10-07: 사진 슬라이드쇼 → 장학지원 안내 이미지(사용자 제공). 이미지 속 버튼 그래픽 때문에 전체를 상담 버튼으로 */}
            <ConsultCtaButton className="hero-scholarship">
              <img
                src="/images/scholarship/scholarship-hero.webp"
                alt="애견미용의 시작, 장학지원으로 더 가볍게 — 수강비 지원·미용도구 풀세트·온라인 강의. 장학지원 혜택 확인하기"
              />
            </ConsultCtaButton>
          </div>
          <QuickCourseNav />
        </div>
      </section>

      {/* 가정견미용 과정 하이라이트 사진 */}
      <section id="home-grooming-highlight">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🐩 대표 과정</span>
          <h2 className="sec-title">이바우펫 대표 과정</h2>
          <p className="sec-sub">자격증 취득부터 가정견 실습, 우리 강아지 케어까지 — 목표에 맞는 과정을 골라보세요.</p>
          <CourseSlider />
          {/* 2026-10-20: 장학지원·무료특강 썸네일 → 각 랜딩페이지 */}
          <div className="promo-thumbs">
            <Link href="/scholarship">
              <img src="/images/promo/scholarship-thumb.webp" alt="한국유기견구호연맹 수강비 지원 — 수강비 장학지원 50%, 미용도구 풀세트·온라인 강의. 자세히 보기" />
            </Link>
            <Link href="/free-lecture">
              <img src="/images/promo/free-lecture-thumb.webp" alt="이바우펫과 함께하는 특별한 배움 — 무료특강 및 각종 세미나 진행. 눈 내리는 겨울 배경, 선물상자 안에 앉은 크림색 니트 토이푸들. CLICK" />
            </Link>
          </div>
        </div>
      </section>

      {/* 학원 소개 — 2026-10-07: 제목 교체 + "애견미용학원 선택 시 체크리스트" 5카드(사용자 Word 메모) */}
      <section id="about" className="about">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🏫 학원소개</span>
          <h2 className="sec-title">강아지를 사랑하는 마음이 기술의 기준이 되도록</h2>
          <div className="check-box">
            <p className="check-head">
              <span>애견미용학원 선택 시,</span>
              이 부분은 <em>꼭 확인</em>하세요
            </p>
            <ol className="check-list">
              {CHECKLIST.map((c, i) => (
                <li key={c.title}>
                  <span className="check-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{c.title}</b>
                    <p>{c.desc.split("**").map((t, j) => (j % 2 ? <strong key={j}>{t}</strong> : t))}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Link href="/about" className="btn btn-outline btn-sm">
            학원소개 자세히 보기
          </Link>
        </div>
      </section>

      {/* 시설·실습 — 네이버 플레이스에 등록된 실제 사진(브랜드 문구·미검증 수상 그래픽은 제외하고 순수 실습·완성 사진만 사용) */}
      <section id="gallery" className="gallery">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">📸 수업 현장</span>
          <h2 className="sec-title">이바우펫 현장스토리</h2>
          <p className="sec-sub">
            강아지가 좋아서 애견미용을 배우기 시작했다면,
            <br />
            그 마음은 교육과정 안에서도 이어져야 합니다.
          </p>
          <GallerySection />
        </div>
      </section>

      {/* 2026-11-04 신설 — 켈리스 `main-fac`(시설 둘러보기) 대응.
          ⚠️ 공간 라벨은 보유 사진을 직접 열어 확인한 것만 사용(없는 시설 주장 금지) — FacilityTour 주석 참조.
          섹션 위치는 현장스토리 바로 뒤에 둠(소유자 지정 섹션 순서에 새로 끼운 자리이므로 조정 가능). */}
      <section id="facility">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🏫 시설 안내</span>
          <h2 className="sec-title">학원 둘러보기</h2>
          <p className="sec-sub">수업이 어디서, 어떻게 진행되는지 미리 보실 수 있습니다.</p>
          <FacilityTour />
        </div>
      </section>

      {/* 에듀세미나 섹션은 2026-11-04 사용자 요청으로 제거 — 실제 개최 이력이 없어 "준비 중" 안내만 뜨는
          빈 섹션이었음. 컴포넌트(SeminarSlider.tsx)와 데이터(lib/seminars.ts)는 남겨둠 —
          실제 세미나 이력이 확정되면 여기에 섹션만 다시 넣으면 된다. */}

      {/* 커리큘럼 (요약 — 전체 내용은 /curriculum) — STEP4: 사진카드 그리드 → 번호+제목+한줄설명 컴팩트
          리스트로 변경, 클릭 시 상세 모달(CoursePreviewModal) */}
      <section id="curriculum" className="curriculum">
        <div className="wrap">
          {/* 2026-11-04: 목록(CourseCompactList) → 겨울 로드맵 이미지 1장(제목·초안 안내문 포함). 누르면 과정 페이지 */}
          <h2 className="sr-only">내 상황에 맞춰 진행하는 커리큘럼</h2>
          <Link href="/curriculum" className="curriculum-roadmap">
            <img
              src="/images/curriculum-roadmap.webp"
              alt="내 상황에 맞춰 진행하는 커리큘럼 — 01 기초과정(입문), 02 자격증 취득반(3급·2급), 03 실견 심화반(실습), 04 취업·창업반, 05 종합·심화반(추천), 06 스페셜 특강. 위 과정 구성은 초안 예시입니다."
            />
          </Link>

          {/* 2026-11-04 신설: 목표별 탭 + 탭별 과정 카드 — 켈리스 `main-curri`(학과 탭 × 탭별 슬라이더) 참고.
              데이터는 lib/courses.ts 그대로, 위 로드맵 이미지와 같은 6과정을 눌러서 비교하도록 보조. */}
          <CourseTabs />
        </div>
      </section>

      {/* 강점 섹션 — STEP3: 4카드 정적 목록 → 6카드 인터랙티브 그리드(클릭 시 상세 모달)로 확장 */}
      <section className="benefits">
        <div className="wrap">
          <span className="sec-tag">✨ 애견미용학원만의 차이</span>
          <h2 className="sec-title">왜 이바우펫에서 해야 할까요?</h2>
          <DifferentiatorGrid />
          {/* 2026-11-04 신설: 지원 제도 바로가기 — 켈리스 `main-benefit`의 지원제도 카드 대응.
              이미 사이트가 주장 중인 제도만 추림(새 제도 없음). 상세는 SupportPrograms 주석 참조. */}
          <SupportPrograms />
        </div>
      </section>

      {/* 장학지원 — 2026-10-07 신설(사용자 Word 메모 예시 구성) */}
      <section id="scholarship" className="scholarship">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🎁 장학지원</span>
          <h2 className="scholarship-title">
            수강료가 걱정된다면
            <br />
            <em>장학지원 가능 여부</em>부터 확인하세요.
          </h2>
          <p className="sec-sub">
            장학지원은 개인의 상황과 교육기관의 기준에 따라 달라질 수 있습니다. 상담을 통해 본인에게 적용 가능한 지원이
            있는지 먼저 확인해보세요.
          </p>
          <div className="scholarship-chips">
            {["장학지원 가능 여부", "수강료 상담", "교육과정 안내", "취업·창업 상담"].map((t) => (
              <ConsultCtaButton key={t} className="scholarship-chip">
                {t}
              </ConsultCtaButton>
            ))}
          </div>
        </div>
      </section>

      {/* 분야별 특강 — 2026-10-07: 특강 안내 이미지 추가(사용자 메모 "이미지 넣기") */}
      <section id="special">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🎯 스페셜 특강</span>
          <h2 className="sec-title">분야별 특강</h2>
          <p className="sec-sub">애견미용 교육 이외에도 반려동물 산업 분야별 특강을 진행합니다.</p>
          <img
            src="/images/special/special-1.webp"
            alt="분야별 특강 — 애견미용 자격증, 펫푸드 레시피, 반려견 행동교정사, 장례지도사, 펫아로마테라피, 펫마사지"
            className="highlight-photo"
            style={{ maxWidth: 640 }}
          />
          <div style={{ marginTop: 24 }}>
            <ConsultCtaButton className="btn btn-outline btn-sm">특강 문의하기</ConsultCtaButton>
          </div>
        </div>
      </section>

      {/* 상담 신청 — 2026-10-07: 특강 바로 뒤로 이동, 문구를 예시 스타일로 교체(입력칸은 기존 유지) */}
      <section id="consult" className="consult">
        <div className="wrap">
          <span className="sec-tag">📝 상담 신청</span>
          <h2 className="sec-title">
            내게 맞는 애견미용학원,
            <br />
            먼저 상담받아보세요.
          </h2>
          <p className="sec-sub">등록 전 궁금한 내용을 편하게 남겨주세요.</p>
          <ConsultForm />
          <p className="note">
            전화 상담도 가능합니다. <a href="tel:010-4347-7645">010-4347-7645</a>
          </p>
        </div>
      </section>

      {/* 수강생 후기 — 2026-09-18: 같은 사업자(이바우펫) 공식 후기 데이터 기반으로 교체(lib/reviews.ts 참고) */}
      <section id="reviews">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">⭐ 수강생 후기</span>
          <h2 className="sec-title">수강생들의 생생한 후기</h2>
          <ReviewSlider />
        </div>
      </section>

      <CtaBanner text="궁금한 과정이 있으신가요? 지금 무료로 상담받아보세요." />

      {/* FAQ */}
      <section id="faq" className="faq">
        <div className="wrap">
          <span className="sec-tag">❓ FAQ</span>
          <h2 className="sec-title">자주 묻는 질문</h2>
          <FaqSection />
        </div>
      </section>

      {/* STEP6b: 새소식 — 실제 소식 확정 전, 카드 구조만 설계 */}
      <section id="news">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">📰 새소식</span>
          <h2 className="sec-title">지점 새소식</h2>
          {/* 2026-11-04: 정적 3열 그리드 → 날짜 앞세운 카드 슬라이더(켈리스 `main-photo` 포토스토리 패턴).
              소식 내용은 lib/news.ts 그대로. */}
          <NewsSlider />
        </div>
      </section>

      {/* 가이드 콘텐츠 미리보기 — 2026-09-18: 카드 클릭 시 GuidePreviewModal로 실제 정리된 내용 바로 확인 */}
      <section id="guide-preview">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">💡 가이드</span>
          <h2 className="sec-title">궁금할 때 보는 가이드</h2>
          <p className="sec-sub">자격증·비용·취업·창업까지, 자주 궁금해하시는 내용을 정리했습니다. 카드를 누르면 바로 확인하실 수 있습니다.</p>
          <GuideGrid />
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
          <span className="sec-tag">📍 찾아오시는 길</span>
          <h2 className="sec-title">오시는길</h2>
          <p>
            <b>주소</b>
            <br />
            대전광역시 서구 대덕대로 182 10층 (지번 둔산동 1160)
          </p>
          <p>
            <b>전화</b>
            <br />
            <a href="tel:010-4347-7645">010-4347-7645</a>
          </p>
          <p className="note">※ 지도·주차·대중교통 안내는 추후 추가합니다.</p>
        </div>
      </section>

      {/* 전국 지점 */}
      <section id="branches">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🗺️ 지점 안내</span>
          <h2 className="sec-title">전국 지점</h2>
          <p className="sec-sub">애견미용학원은 전국 21개 지점 네트워크 중 하나입니다.</p>
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

    </main>
  );
}
