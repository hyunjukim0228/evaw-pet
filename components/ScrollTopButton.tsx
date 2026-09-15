"use client";

import useScrolledPast from "@/lib/useScrolledPast";

/** 일정 스크롤 이후에만 나타나는 맨 위로 가기 버튼. 플로팅 CTA(우하단)와 안 겹치게 좌하단에 배치. */
export default function ScrollTopButton() {
  const visible = useScrolledPast(480);

  return (
    <button
      type="button"
      className={`scroll-top-btn${visible ? " visible" : ""}`}
      aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
