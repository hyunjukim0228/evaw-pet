import type { Metadata } from "next";
import PromoLanding from "@/components/PromoLanding";

export const metadata: Metadata = {
  title: "무료특강 · 분야별 세미나 | 애견미용학원 대전점",
  description: "애견미용 자격증, 펫푸드 레시피, 장례지도사, 펫아로마테라피, 펫마사지, 행동교정, 지점별 세미나까지 — 이바우펫 분야별 특강.",
};

export default function FreeLecturePage() {
  return (
    <PromoLanding
      name="무료특강 · 분야별 특강"
      detailSrc="/images/promo/free-lecture-detail.webp"
      detailAlt="이바우펫 분야별 특강&세미나 — 미용을 넘어, 반려동물을 이해하는 배움: 애견미용 자격증(민간자격), 펫푸드 레시피, 장례지도사, 펫아로마테라피, 펫마사지, 행동교정, 각 지점 원장님이 직접 진행하는 지점별 세미나"
      consultLabel="📚 무료특강 신청 상담하기"
    />
  );
}
