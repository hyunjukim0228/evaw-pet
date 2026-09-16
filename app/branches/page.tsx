import type { Metadata } from "next";
import Link from "next/link";
import ConsultCtaButton from "@/components/ConsultCtaButton";
import BranchMapSection from "@/components/BranchMapSection";

export const metadata: Metadata = {
  title: "전국 지점 | 애견미용학원 대전점",
  description: "전국 19개 지점 네트워크 안내 — 애견미용학원 대전점을 포함한 전국 지점 위치를 확인하세요.",
};

export default function BranchesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">홈</Link> / 전국 지점
          </p>
          <span className="eyebrow">BRANCHES</span>
          <h1>전국 지점</h1>
          <p>전국 19개 지점 네트워크 — 대전점을 포함한 전국 지점 위치를 확인하실 수 있습니다.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <BranchMapSection />
          <p className="note">※ 신규 지점이 순차적으로 오픈 예정입니다. 지점별 상세 정보는 상담 시 안내해 드립니다.</p>
        </div>
      </section>

      <section className="consult">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="sec-title">🗺️ 가까운 지점이 궁금하신가요?</h2>
          <p className="sec-sub">이름과 연락처만 남겨주시면 담당자가 안내해 드립니다.</p>
          <ConsultCtaButton className="btn btn-primary btn-lg">🎓 무료 상담 신청하기</ConsultCtaButton>
        </div>
      </section>
    </main>
  );
}
