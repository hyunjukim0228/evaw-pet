"use client";

import { useState } from "react";
import BenefitIcon from "./BenefitIcon";
import DifferentiatorModal from "./DifferentiatorModal";
import { courseDifferentiators, type Differentiator } from "@/lib/courses";

// STEP3: 홈 "이런 점이 다릅니다" 섹션 — 4카드 정적 목록 → 6카드 인터랙티브 그리드로 확장.
// 모바일1/태블릿2/PC3(.diff-grid), hover 시 살짝 떠오름, 클릭하면 상세 모달.
export default function DifferentiatorGrid() {
  const [selected, setSelected] = useState<Differentiator | null>(null);

  return (
    <>
      <ul className="diff-grid">
        {courseDifferentiators.map((d) => (
          <li key={d.title}>
            <button type="button" className="diff-card" onClick={() => setSelected(d)}>
              <BenefitIcon name={d.icon} />
              <span className="diff-badge">{d.badge}</span>
              <b>{d.title}</b>
              <p>{d.desc}</p>
            </button>
          </li>
        ))}
      </ul>
      <DifferentiatorModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
