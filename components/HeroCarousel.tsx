import Link from "next/link";

// 메인 배너 — 2026-10-07 사용자 지시로 슬라이드 6장 → 배너 1장 고정(자격증·실견수업 배너, 1920×850).
// 모바일에서는 .hero-carousel 자체가 숨겨지고 HeroCopy 헤드라인부터 시작(globals.css 참고).
// ponytail: 배너가 다시 여러 장이 되면 git 이력의 Swiper 버전(ead4642)을 되살리면 됨.
export default function HeroCarousel() {
  return (
    // 배너 속 "자격증·실견수업 알아보기" 버튼 그래픽 → 배너 전체를 커리큘럼 링크로
    <Link href="/curriculum" className="hero-carousel" aria-label="자격증·실견수업 알아보기 — 커리큘럼 보기">
      <img
        src="/images/hero/main-banner.webp"
        alt="자격증 준비는 빠르게, 수업은 현장 실무 그대로 — 3급·2급 동시취득 준비, 개별 진도, 가정견 100% 실습"
        className="hero-img"
        draggable={false}
      />
    </Link>
  );
}
