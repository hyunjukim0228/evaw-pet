type Props = {
  src?: string;
  srcMo?: string; // 있으면 PC/모바일 분리 렌더(히어로와 동일한 1024px 분기 클래스 재사용)
  alt: string;
  className: string;
};

/** 과정 카드·상세 이미지 — 실제 사진(src)이 있을 때만 렌더. 없으면 아무것도 안 그려서 글로만 구성됨. */
export default function CourseThumb({ src, srcMo, alt, className }: Props) {
  if (src && srcMo) {
    return (
      <>
        <img src={src} alt={alt} className={`photo hero-img pc ${className}`} />
        <img src={srcMo} alt={alt} className={`photo hero-img mo ${className}`} />
      </>
    );
  }
  if (src) return <img src={src} alt={alt} className={`photo ${className}`} />;
  return null;
}
