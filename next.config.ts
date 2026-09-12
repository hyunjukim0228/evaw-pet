import type { NextConfig } from "next";

// output:"export" → `next build` 결과가 순수 정적 파일(out/)로 나옵니다.
// 어떤 호스팅(가비아·카페24·Vercel·Netlify 등)에도 그대로 올릴 수 있습니다.
// 단, API 라우트/서버 기능은 못 씀 — 상담폼 전송은 외부 서비스(구글폼 웹훅 등) 연동으로 처리 예정.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // 정적 export 시 Next 이미지 최적화 서버가 없어서 필요
};

export default nextConfig;
