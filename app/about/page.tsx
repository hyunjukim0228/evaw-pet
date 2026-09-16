import type { Metadata } from "next";
import Link from "next/link";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import GallerySection from "@/components/GallerySection";
import DifferentiatorGrid from "@/components/DifferentiatorGrid";
import FacultyGallery from "@/components/FacultyGallery";

export const metadata: Metadata = {
  title: "학원소개 | 애견미용학원 대전점",
  description: "애견미용학원 대전점 소개 — 자격증 취득과 실무 역량을 함께 준비하는 애견미용 전문 교육 공간입니다.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">홈</Link> / 학원소개
          </p>
          <span className="eyebrow">ABOUT</span>
          <h1>학원소개</h1>
          <p>애견미용학원 대전점을 소개합니다.</p>
        </div>
      </section>

      {/* 2026-09-16: 학원 소개 문구 — 같은 사업자(이바우펫, 사업자등록번호 211-87-42130·대표 김명자)의
          공식 소개 페이지 내용을 참고해, 문장 구조·순서를 다르게 다시 써서 반영(그대로 복사 아님). */}
      <section className="about">
        <div className="wrap" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <span className="sec-tag">🏫 학원소개</span>
          <h2 className="sec-title">손으로 익히는 일이라, 손을 직접 잡아드립니다</h2>
          <p>
            애견미용학원 대전점은 자격증 한 장을 내드리는 곳이 아니라, 실제로 손을 움직여 미용사가 될 수 있게
            돕는 곳입니다.
          </p>
          <p>
            여러 사람이 같은 진도로 함께 가는 수업 대신 1:1 개별 진도로 진행합니다. 손이 빠른 분도, 느린 분도
            있습니다. 느린 건 실력이 없어서가 아니라 속도의 차이라고 생각하기 때문에, 강사가 매 수업 직접
            손을 잡아드리며 될 때까지 진도를 넘기지 않습니다.
          </p>
          <p>
            실습은 100% 가정견으로 진행합니다. 공장견·농장견이 아니라 보호자와 함께 사는 반려견을 대상으로
            하기 때문에, 실제 현장과 같은 조건에서 배우게 됩니다.
          </p>
          <p>
            수료증을 드리는 날이 목표가 아닙니다. 자격증을 딴 다음 취업이든 창업이든, 실제로 일을 시작하는
            날까지 함께하는 과정이라고 생각합니다.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="sec-tag">✨ 애견미용학원 대전점만의 차이</span>
          <h2 className="sec-title">이런 점이 다릅니다</h2>
          <DifferentiatorGrid />
        </div>
      </section>

      <section id="gallery">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">📸 수업 현장</span>
          <h2 className="sec-title">시설·실습 사진</h2>
          <p className="sec-sub">실제 실습 현장과 완성 사진입니다.</p>
          <GallerySection />
        </div>
      </section>

      {/* 강사진 — 대전점 단독 프로필이 아직 없어, 대전점을 포함한 전국 19개 지점을 함께 운영하는
          같은 사업자의 전체 강사진 명단으로 대체(정직한 표기: "전국 캠퍼스 강사진"). */}
      <section id="faculty">
        <div className="wrap" style={{ textAlign: "center" }}>
          <span className="sec-tag">🧑‍🏫 교육진</span>
          <h2 className="sec-title">전국 캠퍼스 강사진</h2>
          <p className="sec-sub">
            대전점을 포함한 전국 19개 지점에 이 강사님들이 함께합니다. 사진을 누르면 크게 볼 수 있습니다.
          </p>
          <FacultyGallery />
        </div>
      </section>

      <section className="consult">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">🎓 더 궁금하신 점이 있으신가요?</h2>
          <p className="sec-sub">이름과 연락처만 남겨주시면 담당자가 안내해 드립니다.</p>
          <ConsultCtaButton className="btn btn-primary btn-lg">🎓 무료 상담 신청하기</ConsultCtaButton>
        </div>
      </section>
    </main>
  );
}
