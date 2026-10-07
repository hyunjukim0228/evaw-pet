"use client";

import Link from "next/link";
import { useConsultModal } from "./ConsultModalContext";

// 사업자정보 고시 — 사용자 제공 실제 등록정보(2026-09-13) 기준, 주소만 대전점으로 교체.
// 운영등록증·배상책임보험약관은 같은 사업자(이바우펫) 홈페이지의 실제 게시 문서로 연결(2026-09-20, 사용자 제공 링크).
// 시간표·인스타그램은 아직 실제 페이지/링크가 없어 tbd로 표시.
export default function Footer() {
  const { open } = useConsultModal();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <p>
          <b>애견미용학원 대전점</b>
        </p>
        <p className="footer-biz-info">
          학원명 : 애견미용학원대전점 · 대표 : 김명자 · 사이트 소유자 : 김현주
          <br />
          사업자등록번호 : 211-87-42130
          <br />
          주소 : 대전광역시 서구 대덕대로 182 10층 <span className="tbd">(둔산동 1160)</span>
          <br />
          운영시간 : 월~목 11:00~21:30 | 토 11:00~19:00
          <br />
          대표전화 : 010-4347-7645 · 대표이메일 : sbshyunduu@naver.com
        </p>
        <p className="footer-links">
          <a
            href="https://evawpetkorea.imweb.me/?preview_mode=1&modal_menu=m202512240ea01d7889e84"
            target="_blank"
            rel="noopener noreferrer"
          >
            운영등록증
          </a>
          <a
            href="https://evawpetkorea.imweb.me/?preview_mode=1&modal_menu=m20260126c89055763436f"
            target="_blank"
            rel="noopener noreferrer"
          >
            배상책임보험약관
          </a>
          <span className="tbd">시간표</span>
          <button type="button" onClick={() => open()}>
            수강료 안내
          </button>
          <span className="tbd">인스타그램</span>
          <a href="https://www.evawpet.com/?mode=policy" target="_blank" rel="noopener noreferrer">
            이용약관
          </a>
          <Link href="/privacy">개인정보처리방침</Link>
        </p>
        <p className="copyright">
          이메일무단수집거부 · © 2026 애견미용학원대전점. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
