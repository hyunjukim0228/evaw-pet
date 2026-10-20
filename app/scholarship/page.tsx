import type { Metadata } from "next";
import PromoLanding from "@/components/PromoLanding";

export const metadata: Metadata = {
  title: "수강비 장학지원 50% | 애견미용학원 대전점",
  description: "한국유기견구호연맹 수강비 지원 — 수강비 지원, 미용도구 풀세트, 온라인 강의 세 가지 혜택.",
};

export default function ScholarshipPage() {
  return (
    <PromoLanding
      name="수강비 장학지원"
      detailSrc="/images/promo/scholarship-detail.webp"
      detailAlt="배우고 싶은 마음이 시작으로 이어지도록 — 한국유기견구호연맹 수강비 지원. 시작을 돕는 세 가지 혜택: 01 수강비 지원, 02 미용도구 풀세트, 03 온라인 강의(사이버스 학습 지원). 준비의 부담은 덜고, 배움의 기회는 더 가까이"
      consultLabel="🎓 장학지원 상담 신청하기"
    />
  );
}
