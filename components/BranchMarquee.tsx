import { branches } from "@/lib/branches";

// STEP2: 전국 지점명이 끊김 없이 옆으로 흐르는 마퀴 띠. 목록을 2번 이어붙여 이음매 없이 순환시키고,
// prefers-reduced-motion에서는 CSS(@keyframes 자체를 멈춤)로 정지 — JS 분기 불필요.
export default function BranchMarquee() {
  const names = branches.map((b) => `${b.name}점`);
  const loop = [...names, ...names];

  return (
    <div className="branch-marquee" aria-hidden="true">
      <div className="branch-marquee-track">
        {loop.map((name, i) => (
          <span key={i} className="branch-marquee-item">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
