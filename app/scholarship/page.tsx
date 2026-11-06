import type { Metadata } from "next";
import PromoLanding from "@/components/PromoLanding";

export const metadata: Metadata = {
  title: "수강비 장학지원 50% | 애견미용학원",
  description: "한국유기견구호연맹 수강비 지원 — 수강비 지원, 미용도구 풀세트, 온라인 강의 세 가지 혜택.",
};

export default function ScholarshipPage() {
  return (
    <PromoLanding
      name="수강비 장학지원"
      detailSrc="/images/promo/scholarship-detail.webp"
      detailAlt="배움의 부담은 더 가볍게 — 한국유기견구호연맹 수강비 지원, 수강비 장학지원 50%. 시작부터 든든한 장학혜택: 수강비 50% 지원, 미용도구 풀세트, 온라인 강의 제공, 다양한 분야별 특강. 개별맞춤 커리큘럼(자격증 준비부터 실무 포트폴리오까지): 01 기초·위그 실습, 02 자격증 준비, 03 가정견 실습, 04 포트폴리오 제작 — 개인별 진도에 맞춰 단계적으로. 배움 이후의 도전까지 함께: 취업 연계 지원, 초기 창업 컨설팅. 장학지원 신청 절차: 01 상담 및 모집 확인, 02 장학지원 신청, 03 심사 및 결과 안내, 04 등록 후 수업 시작 — 정원제로 운영되며 신청 가능 여부는 상담 시 확인. 장학지원은 심사 및 적용 기준에 따라 달라질 수 있으며, 자격증은 민간자격으로 취득 기간은 개인의 진도와 연습량에 따라 달라짐"
      consultLabel="🎓 장학지원 상담 신청하기"
    />
  );
}
