"use client";

import { useState } from "react";
import { guideTopics } from "@/lib/guides";
import GuidePreviewModal from "./GuidePreviewModal";

// 가이드 카드 그리드 — 홈 미리보기(topics 일부)·/guide 전체 페이지(topics 전체) 공용.
// 카드를 누르면 GuidePreviewModal로 핵심 요약을 바로 보여줌(클릭 시 "간단하게" 가이드 확인 요청 반영).
export default function GuideGrid({ limit }: { limit?: number }) {
  const [selected, setSelected] = useState<string | null>(null);
  const topics = limit ? guideTopics.slice(0, limit) : guideTopics;

  return (
    <>
      <div className="guide-grid">
        {topics.map((g) => (
          <button key={g.slug} type="button" className="guide-card" onClick={() => setSelected(g.slug)}>
            <b>{g.title}</b>
            <p>{g.teaser}</p>
            <span className="guide-card-hint">가이드 보기 →</span>
          </button>
        ))}
      </div>
      <GuidePreviewModal slug={selected} onClose={() => setSelected(null)} />
    </>
  );
}
