import type { Metadata } from "next";
import Link from "next/link";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import BenefitIcon from "@/components/BenefitIcon";

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

      <section className="about">
        <div className="wrap" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 className="sec-title">기초부터 실전까지</h2>
          <p>
            애견미용학원 대전점은 기초부터 실전까지, 자격증 취득과 실무 역량을 함께 준비하는 애견미용 전문
            교육 공간입니다.
          </p>
          <p>
            강사진 소개, 연혁 등 상세 내용은 준비되는 대로 채워 넣습니다. <span className="tbd">[내용 확정 필요]</span>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
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

      <section id="gallery">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">시설·실습 사진</h2>
          <p className="sec-sub">실제 수업·시설 사진은 촬영 후 업로드 예정입니다.</p>
        </div>
      </section>

      {/* 강사진 — 실제 프로필 확보 전까지 구조만 설계, 예시 문구로 명시 */}
      <section id="faculty">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">강사진</h2>
          <p className="sec-sub">※ 아래는 구성 예시이며, 실제 강사진 소개로 교체될 예정입니다.</p>
          <div className="faculty-grid">
            {["대표 강사", "수석 강사", "실습 강사"].map((role) => (
              <div key={role} className="faculty-card">
                <b>○○○</b>
                <span className="faculty-role">{role}</span>
                <p>[예시] 경력·자격 소개가 들어갈 자리입니다.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="consult">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">더 궁금하신 점이 있으신가요?</h2>
          <p className="sec-sub">이름과 연락처만 남겨주시면 담당자가 안내해 드립니다.</p>
          <ConsultCtaButton className="btn btn-primary btn-lg">무료 상담 신청하기</ConsultCtaButton>
        </div>
      </section>
    </main>
  );
}
