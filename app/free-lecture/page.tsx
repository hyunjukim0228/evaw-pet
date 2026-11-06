import type { Metadata } from "next";
import PromoLanding from "@/components/PromoLanding";

export const metadata: Metadata = {
  title: "무료특강 · 분야별 세미나 | 애견미용학원",
  description: "애견미용 자격증(민간자격), 펫푸드 레시피, 장례지도사, 펫아로마테라피, 펫마사지, 행동교정, 지점별 세미나 — 이바우펫 분야별 특강&세미나. 미용을 넘어, 반려동물을 이해하는 배움.",
};

export default function FreeLecturePage() {
  return (
    <PromoLanding
      name="무료특강 · 분야별 특강"
      detailSrc="/images/promo/free-lecture-detail.webp"
      detailAlt="이바우펫 분야별 특강&세미나 — 전문가와 함께하는 배움. 미용을 넘어, 반려동물을 이해하는 배움. 01 애견미용 자격증(기초부터 실무까지, 관련 자격은 민간자격), 02 펫푸드 레시피(직접 만들어보는 반려견 음식), 03 장례지도사(소중한 마지막까지 함께하는 전문 케어), 04 펫아로마테라피(향기로 알아보는 반려동물 케어), 05 펫마사지(편안함을 전하는 부드러운 터치), 06 행동교정(반려견의 마음을 이해하는 소통), 07 지점별 세미나(각 지점 원장님이 직접 전하는 펫미용 세미나)"
      consultLabel="📚 무료특강 신청 상담하기"
    />
  );
}
