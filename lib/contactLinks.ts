// 전화·카카오톡 채널·네이버 문의 연결 정보.
// evaw-pet-grooming.co.kr 히어로의 "전화상담/카톡문의/네이버문의" 3버튼 구조를 UI만 먼저 만들어두고,
// 실제 채널이 생기면 아래 값만 채우면 됨(HeroCtaRow가 값 유무로 실제 링크/상담모달 fallback을 자동 전환).
// 2026-09-15: 카카오톡 오픈채팅·네이버 문의폼 실제 링크 반영(사용자 제공).
// 2026-09-18: 전화번호 확정 반영(사용자 제공) — Header 뱃지·상담완료 다이얼로그의 전화 버튼이
// 자동으로 tel: 실제 링크로 전환됨(값 유무로 자동 분기하는 기존 로직, 코드 수정 불필요).
export const contactLinks = {
  phone: "010-4347-7645",
  kakaoUrl: "https://open.kakao.com/o/sGpFVTJi", // 카카오톡 오픈채팅
  naverUrl: "https://form.naver.com/response/1wXCqJdJr0R", // 네이버 폼(문의)
};
