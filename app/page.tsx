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
import { guideTopics } from "@/lib/guides";
import { news } from "@/lib/news";
import { galleryPhotos } from "@/lib/galleryPhotos";
import GallerySection from "@/components/GallerySection";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import FaqSection from "@/components/FaqSection";
import DifferentiatorGrid from "@/components/DifferentiatorGrid";

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
                🎓 무료 상담 + 수강료 확인하기
              </ConsultCtaButton>
              <HeroCtaRow />
              <div className="hero-trust-bar">
                <div className="trust-stat">
                  <b>전국 19개</b>
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
            <PhotoSlideshow images={galleryPhotos} intervalMs={2000} alt="애견미용학원 대전점" className="hero-extras-photo" />
          </div>
          <QuickCourseNav />
        </div>
      </section>

      {/* 가정견미용 과정 하이라이트 사진 */}
      <section id="home-grooming-highlight">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">🛁 가정견미용 과정</h2>
          <p className="sec-sub">내 반려견을 집에서 직접 관리하고 싶은 분들을 위한 과정입니다.</p>
          <PhotoSlideshow images={galleryPhotos} intervalMs={2000} alt="가정견미용 과정" />
          <div style={{ marginTop: 20 }}>
            <Link href="/curriculum/practice" className="btn btn-outline btn-sm">
              가정견미용 과정 자세히 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 강점 섹션 — STEP3: 4카드 정적 목록 → 6카드 인터랙티브 그리드(클릭 시 상세 모달)로 확장 */}
      <section className="benefits">
        <div className="wrap">
          <span className="sec-tag">✨ 애견미용학원 대전점만의 차이</span>
          <h2 className="sec-title">이런 점이 다릅니다</h2>
          <DifferentiatorGrid />
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
          <GallerySection />
        </div>
      </section>

      {/* 커리큘럼 (요약 — 전체 내용은 /curriculum) — STEP4: 사진카드 그리드 → 번호+제목+한줄설명 컴팩트
          리스트로 변경, 클릭 시 상세 모달(CoursePreviewModal) */}
      <section id="curriculum" className="curriculum">
        <div className="wrap">
          <span className="sec-tag">📚 커리큘럼</span>
          <h2 className="sec-title">수강 과정 안내</h2>
          <CourseCompactList />
          <p className="note">※ 위 과정 구성은 초안 예시입니다. 실제 개설 과정명·커리큘럼은 확정되는 대로 교체합니다.</p>
        </div>
      </section>

      {/* STEP6a: 강사진 요약(홈) — 전체 프로필은 /about#faculty. 단체사진 확보 전까지는 텍스트 중심으로만
          구성(사진 영역 자체를 생략). 스크롤 리빌 애니메이션은 main section 공통 규칙 자동 적용. */}
      <section id="faculty-teaser">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🧑‍🏫 교수진</span>
          <h2 className="sec-title">전국 지점의 전문 강사진</h2>
          <p className="sec-sub">
            전국 19개 지점, 각 지점마다 전문 강사진이 함께합니다.
          </p>
          <Link href="/about#faculty" className="btn btn-outline btn-sm">
            강사진 보기
          </Link>
        </div>
      </section>

      {/* 수강생 후기 — 실제 후기 없어 구조만 설계, 예시 문구로 명시 */}
      <section id="reviews">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">⭐ 수강생 후기</span>
          <h2 className="sec-title">수강생들의 생생한 후기</h2>
          <p className="sec-sub">※ 아래는 구성 예시이며, 실제 수강생 후기로 교체될 예정입니다.</p>
          <ReviewSlider />
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

      {/* 가이드 콘텐츠 미리보기 */}
      <section id="guide-preview">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">💡 궁금할 때 보는 가이드</h2>
          <p className="sec-sub">자격증·비용·취업·창업까지, 자주 궁금해하시는 내용을 정리했습니다.</p>
          <div className="guide-grid">
            {guideTopics.map((g) => (
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
