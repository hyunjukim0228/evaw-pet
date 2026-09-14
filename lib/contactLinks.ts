// 전화·카카오톡 채널·네이버 톡톡 연결 정보 — 2026-09-14 기준 전부 미확정(값 없음).
// evaw-pet-grooming.co.kr 히어로의 "전화상담/카톡문의/네이버문의" 3버튼 구조를 UI만 먼저 만들어두고,
// 실제 채널이 생기면 아래 값만 채우면 됨(HeroCtaRow가 값 유무로 실제 링크/상담모달 fallback을 자동 전환).
export const contactLinks = {
  phone: "", // 예: "010-1234-5678" — 채우면 tel: 링크로 자동 전환
  kakaoUrl: "", // 예: "http://pf.kakao.com/_xxxxx/chat" — 카카오톡 채널 URL
  naverUrl: "", // 예: "http://talk.naver.com/xxxxx" — 네이버 톡톡 URL
};
