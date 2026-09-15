"use client";

import { contactLinks } from "@/lib/contactLinks";
import ChannelButton from "./ChannelButton";
import { useConsultModal } from "./ConsultModalContext";
import useScrolledPast from "@/lib/useScrolledPast";

/** 하단 고정 CTA 바 — 간편수강료조회/카톡문의/네이버문의/무료상담신청 4버튼
    (evaw-pet-grooming.co.kr 하단 고정바 구조 참고).
    - 모바일: 항상 노출(globals.css @media max-width:768px에서 무조건 표시로 강제) — 같은 화면의
      FloatingCta(원형 버튼)는 모바일에서 이 바로 대체되도록 숨김 처리.
    - PC: 기본은 숨겨져 있다가 스크롤을 일정 이상 내리면 나타남(ScrollTopButton과 같은 기준,
      2026-09-15 추가 — 레퍼런스 evaw-pet-grooming.co.kr이 PC에서도 스크롤 시 하단 CTA를 보여주는 것 참고).
      이때 FloatingCta는 겹치지 않게 자동으로 숨겨짐(FloatingCta.tsx에서 같은 훅 사용).
    전화번호가 아직 없어 전화상담 자리를 "간편 수강료 조회"(상담모달 tuition 모드)로 대체(2026-09-15). */
export default function MobileCtaBar() {
  const { open } = useConsultModal();
  const visible = useScrolledPast(480);
  return (
    <div className={`mobile-cta-bar${visible ? " visible" : ""}`}>
      <div className="mobile-cta-bar-row">
        <button type="button" onClick={() => open({ intent: "tuition" })} className="btn-channel btn-channel-phone">
          💰 수강료조회
        </button>
        <ChannelButton channel="kakao" value={contactLinks.kakaoUrl} />
        <ChannelButton channel="naver" value={contactLinks.naverUrl} />
        <button type="button" onClick={() => open()} className="btn-channel btn-channel-consult">
          🎓 무료상담신청
        </button>
      </div>
    </div>
  );
}
