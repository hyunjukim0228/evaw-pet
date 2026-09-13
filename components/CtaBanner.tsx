import ConsultCtaButton from "./ConsultCtaButton";

type Props = {
  text: string;
  presetSlug?: string;
};

/** 콘텐츠 블록 사이사이에 넣는 슬림 CTA 배너 — 전국 지점망 신뢰 배지 + 짧은 유도문 + 상담 버튼. */
export default function CtaBanner({ text, presetSlug }: Props) {
  return (
    <section className="cta-banner">
      <div className="wrap">
        <p className="cta-banner-trust">전국 18개 지점 운영</p>
        <h2 className="cta-banner-text">{text}</h2>
        <ConsultCtaButton className="btn btn-primary btn-lg" presetSlug={presetSlug}>
          무료 상담 신청하기
        </ConsultCtaButton>
      </div>
    </section>
  );
}
