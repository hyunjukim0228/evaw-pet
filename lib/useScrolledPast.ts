"use client";

import { useEffect, useState } from "react";

/** 스크롤이 px를 넘으면 true — ScrollTopButton·FloatingCta·MobileCtaBar가 공용으로 씀. */
export default function useScrolledPast(px: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    function onScroll() {
      setPast(window.scrollY > px);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [px]);

  return past;
}
