"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useConsultModal } from "./ConsultModalContext";

const NAV = [
  { href: "/about", label: "학원소개" },
  { href: "/curriculum", label: "커리큘럼" },
  { href: "/#gallery", label: "시설·실습" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#location", label: "오시는길" },
];

// nav 항목이 가리키는 "섹션 id" — 앵커면 # 뒤, 페이지 링크면 경로 첫 세그먼트(홈에도 같은 id의 섹션이 있음).
function sectionIdFor(href: string): string | null {
  const hashIdx = href.indexOf("#");
  if (hashIdx !== -1) return href.slice(hashIdx + 1) || null;
  const seg = href.replace(/^\//, "");
  return seg || null;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const { open: openConsult } = useConsultModal();

  // 스크롤 시 헤더 배경을 더 또렷하게 — 히어로 바로 아래라 투명한 채로는 대비가 약함.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 홈에서만: 지금 보고 있는 섹션에 맞춰 nav 메뉴 활성화 표시.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const ids = Array.from(new Set(NAV.map((n) => sectionIdFor(n.href)).filter(Boolean))) as string[];
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 } // 화면 중앙 부근의 얇은 띠 — 그 지점을 지나는 섹션만 활성화
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="wrap header-inner">
        <Link href="/" className="logo-slot" aria-label="애견미용학원 대전점 홈">
          {/* 로고 준비되면 이 자리를 <Image src="/images/logo.png" .../> 로 교체 */}
          <span className="logo-text">
            애견미용학원<em>대전점</em>
          </span>
        </Link>

        <nav className={`nav-links${open ? " open" : ""}`} aria-label="주요 메뉴">
          {NAV.map((item) => {
            const id = sectionIdFor(item.href);
            const isActive = id !== null && id === activeSection;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "active" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          {/* 모바일 펼침 패널 안에서만 보이는 CTA (데스크톱은 header-cta가 대신함) */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openConsult();
            }}
            className="btn btn-primary mobile-only-cta"
            style={{ justifyContent: "center" }}
          >
            무료 상담 신청
          </button>
        </nav>

        <div className="header-cta">
          <span className="call-slot" title="전화번호 등록 예정">
            전화상담 준비중
          </span>
          <button type="button" onClick={() => openConsult()} className="btn btn-primary btn-sm">
            무료 상담 신청
          </button>
        </div>

        <button
          className="nav-toggle"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
