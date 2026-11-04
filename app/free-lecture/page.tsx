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
      detailAlt="이바우펫 분야별 특강 & 세미나 — 미용 기술에 반려견을 이해하는 깊이를 더하다. 펫미용(미용원리·베이싱·드라이, 푸들 스포팅라인·테디베어 얼굴컷, 노령견 미용 시 보정), 독피트니스·피어프리(공포·불안·스트레스를 줄이는 미용, 반려견 움직임·자세·체중 분산), 펫마사지(경혈·근막이완 마사지, 한방 스파팩·허브 온찜질팩), 펫푸드(명타르트·명초콜릿·수제쿠키, 건조 간식·명파스타·명새우), 행동교정(반려견의 행동과 심리 이해, 미용 현장의 소통과 안전) 분야별 특강 진행 안내"
      consultLabel="📚 무료특강 신청 상담하기"
    />
  );
}
