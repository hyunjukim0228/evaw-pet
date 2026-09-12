"use client";

import { useEffect, useState } from "react";

/** 일정 스크롤 이후에만 나타나는 맨 위로 가기 버튼. 플로팅 CTA(우하단)와 안 겹치게 좌하단에 배치. */
export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
