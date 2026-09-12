"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** 페이지 안의 각 섹션(히어로 제외)이 스크롤로 화면에 들어올 때 스무스하게 나타나게 함.
    페이지마다 별도 코드 없이 여기 하나로 전체 사이트에 적용됨. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("main section:not(.hero)"));
    if (targets.length === 0) return;

    // 구형 브라우저 등 IntersectionObserver 미지원 시 콘텐츠가 영원히 숨겨지지 않게 즉시 전부 보이게 처리.
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((t) => t.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
