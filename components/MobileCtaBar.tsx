"use client";

import { contactLinks } from "@/lib/contactLinks";
import ChannelButton from "./ChannelButton";
import { useConsultModal } from "./ConsultModalContext";

/** 모바일 전용 하단 고정 CTA 바 — 아이콘 탭 3개(수강료조회/카톡/네이버) + 대형 CTA버튼(무료상담신청).
    데스크톱은 FloatingCta(우측 하단 플로팅 그룹)가 대신하므로 globals.css에서 숨김 처리
    (2026-09-16 스펙: 모바일=풀바, 데스크톱=플로팅 그룹으로 역할 분리).
    전화번호가 아직 없어 전화상담 자리를 "간편 수강료 조회"(상담모달 tuition 모드)로 대체(2026-09-15). */
export default function MobileCtaBar() {
  const { open } = useConsultModal();
  return (
    <div className="mobile-cta-bar">
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
