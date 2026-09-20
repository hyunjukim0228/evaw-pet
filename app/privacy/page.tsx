import type { Metadata } from "next";
import Link from "next/link";
import PrivacyPolicyText from "@/components/PrivacyPolicyText";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 애견미용학원 대전점",
  description: "애견미용학원 대전점 홈페이지 개인정보처리방침.",
};

// 2026-09-20: 상담 신청 폼(ConsultModal)이 실제로 수집하는 항목(이름·연락처·수강목적·희망지점·문의사항)과
// 실제 처리 흐름(Supabase 저장, 텔레그램 알림 — [[홈페이지-상담폼-supabase-telegram연동]])만 반영.
// 참고로 삼으려던 evawpet.com 개인정보처리방침은 아임웹 기본 템플릿이 그대로 방치된 상태(회사명도
// "(주)웨이브홀딩스", 위탁사도 "OOO PG" 등 미기입 placeholder)라 그대로 베낄 수 없어 이 학원 기준으로 새로 작성.
export default function PrivacyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="breadcrumb">
            <Link href="/">홈</Link> / 개인정보처리방침
          </p>
          <span className="eyebrow">PRIVACY</span>
          <h1>개인정보처리방침</h1>
          <p>시행일자 2026년 9월 20일</p>
        </div>
      </section>

      <section>
        <div className="wrap policy">
          <PrivacyPolicyText />
        </div>
      </section>
    </main>
  );
}
