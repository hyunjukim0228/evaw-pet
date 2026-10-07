import Link from "next/link";
import CourseCompactList from "@/components/CourseCompactList";
import ConsultForm from "@/components/ConsultForm";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import HeroCarousel from "@/components/HeroCarousel";
import HeroCopy from "@/components/HeroCopy";
import HeroCtaRow from "@/components/HeroCtaRow";
import QuickCourseNav from "@/components/QuickCourseNav";
import CtaBanner from "@/components/CtaBanner";
import BranchCard from "@/components/BranchCard";
import { branches } from "@/lib/branches";
import ReviewSlider from "@/components/ReviewSlider";
import GuideGrid from "@/components/GuideGrid";
import { news } from "@/lib/news";
import GallerySection from "@/components/GallerySection";
import FaqSection from "@/components/FaqSection";
import DifferentiatorGrid from "@/components/DifferentiatorGrid";
import FacultyGallery from "@/components/FacultyGallery";

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
        <HeroCopy />
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
          <h2 className="sec-title">🛁 가정견 친구들이 미용 오는 학원</h2>
          <p className="sec-sub">보호자와 함께 오는 가정견으로 실제 미용실 업무 흐름을 그대로 배웁니다.</p>
          {/* 2026-10-07: 슬라이드쇼 → 사용자 제공 가정견 실견수업 상세 이미지(세로형) */}
          <img
            src="/images/home-grooming-practice.webp"
            alt="가정견 100% 미용실습 — 보호자와 함께 오는 가정견, 상담부터 인계까지(미용 상담·목욕과 드라이·전체 미용·보호자 인계) 직접 배우는 실견수업"
            className="highlight-photo"
            style={{ maxWidth: 560 }}
          />
          <div style={{ marginTop: 20 }}>
            <Link href="/curriculum/practice" className="btn btn-outline btn-sm">
              가정견 100% 실견수업 살펴보기
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

      {/* 커리큘럼 (요약 — 전체 내용은 /curriculum) — STEP4: 사진카드 그리드 → 번호+제목+한줄설명 컴팩트
          리스트로 변경, 클릭 시 상세 모달(CoursePreviewModal) */}
      <section id="curriculum" className="curriculum">
        <div className="wrap">
          <span className="sec-tag">📚 커리큘럼</span>
          <h2 className="sec-title">내 상황에 맞춰 진행하는 커리큘럼</h2>
          <CourseCompactList />
          <p className="note">※ 위 과정 구성은 초안 예시입니다. 실제 개설 과정명·커리큘럼은 확정되는 대로 교체합니다.</p>
        </div>
      </section>

      {/* 강점 섹션 — STEP3: 4카드 정적 목록 → 6카드 인터랙티브 그리드(클릭 시 상세 모달)로 확장 */}
      <section className="benefits">
        <div className="wrap">
          <span className="sec-tag">✨ 애견미용학원 대전점만의 차이</span>
          <h2 className="sec-title">왜 이바우펫에서 해야 할까요?</h2>
          <DifferentiatorGrid />
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

      {/* 강사진(홈) — 2026-09-16: /about#faculty와 동일한 전국 캠퍼스 강사진 실사진(라이트박스 확대)을
          여기서도 바로 보여줌. 같은 사업자(이바우펫)가 대전점을 포함한 전국 21개 지점을 직영. */}
      <section id="faculty-teaser">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🧑‍🏫 교수진</span>
          <h2 className="sec-title">전국 캠퍼스 강사진</h2>
          <p className="sec-sub">
            대전점을 포함한 전국 21개 지점에 이 강사님들이 함께합니다. 사진을 누르면 크게 볼 수 있습니다.
          </p>
          <FacultyGallery />
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
          <div className="news-grid">
            {news.map((n) => (
              <article key={n.branch + n.title} className="news-card">
                <span className="news-branch-badge">{n.branch}</span>
                <h3>{n.title}</h3>
                <p>{n.summary}</p>
                <span className="news-date">{n.date}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 가이드 콘텐츠 미리보기 — 2026-09-18: 카드 클릭 시 GuidePreviewModal로 실제 정리된 내용 바로 확인 */}
      <section id="guide-preview">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">💡 궁금할 때 보는 가이드</h2>
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
          <h2 className="sec-title">📍 오시는길</h2>
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
          <h2 className="sec-title">🗺️ 전국 지점</h2>
          <p className="sec-sub">애견미용학원 대전점은 전국 21개 지점 네트워크 중 하나입니다.</p>
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
