import Link from "next/link";
import ConsultCtaButton from "./ConsultCtaButton";

type Props = { name: string; detailSrc: string; detailAlt: string; consultLabel: string };

// 2026-10-20: 홈 썸네일(장학지원·무료특강)을 누르면 오는 랜딩페이지 — 세로 상세 이미지 1장 + 하단 고정 상담 버튼.
export default function PromoLanding({ name, detailSrc, detailAlt, consultLabel }: Props) {
  return (
    <main className="promo-landing">
      <p className="breadcrumb wrap">
        <Link href="/">홈</Link> / {name}
      </p>
      <h1 className="sr-only">{name}</h1>
      <img src={detailSrc} alt={detailAlt} />
      <div className="promo-cta">
        <ConsultCtaButton className="btn btn-primary btn-lg btn-full">{consultLabel}</ConsultCtaButton>
      </div>
    </main>
  );
}
