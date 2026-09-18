import type { Metadata } from "next";
import Link from "next/link";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import GuideGrid from "@/components/GuideGrid";

export const metadata: Metadata = {
  title: "가이드 | 애견미용학원 대전점",
  description: "애견미용 자격증·취업·창업을 준비하며 궁금할 만한 주제를 정리했습니다.",
};

export default function GuidePage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">홈</Link> / 가이드
          </p>
          <span className="eyebrow">GUIDE</span>
          <h1>가이드</h1>
          <p>애견미용을 배우기 전, 배우는 중, 배우고 난 뒤에 자주 궁금해하시는 주제를 정리했습니다.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="note">※ 카드를 누르면 핵심 내용을 바로 확인하실 수 있습니다.</p>
          <GuideGrid />
        </div>
      </section>

      <section className="consult">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">💡 더 궁금하신 점이 있으신가요?</h2>
          <p className="sec-sub">이름과 연락처만 남겨주시면 담당자가 안내해 드립니다.</p>
          <ConsultCtaButton className="btn btn-primary btn-lg">🎓 무료 상담 신청하기</ConsultCtaButton>
        </div>
      </section>
    </main>
  );
}
