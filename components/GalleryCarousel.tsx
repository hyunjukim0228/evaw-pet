"use client";

// 시설·실습 사진 캐러셀 — Originkit "Button Carousel" 컴포넌트(components/originkit/ui/button-carousel.tsx,
// 레지스트리 원본 그대로 이식) 위에 우리 galleryPhotos 데이터를 얹은 래퍼.
import KlarnaCarousel from "@/components/originkit/ui/button-carousel";
import { galleryPhotos } from "@/lib/galleryPhotos";

const items = galleryPhotos.map((src) => ({
  image: { src },
  buttonImage: { src },
}));

export default function GalleryCarousel() {
  return (
    <div style={{ maxWidth: 480, margin: "24px auto 0" }}>
      <KlarnaCarousel
        items={items}
        imageWidth={320}
        imageHeight={320}
        buttonCount={7}
        buttonSize={40}
        labelShow={false}
        backgroundColor="var(--surface-strong)"
        style={{ borderRadius: "var(--radius)" }}
      />
    </div>
  );
}
