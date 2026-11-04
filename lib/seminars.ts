// 에듀세미나 — 켈리스 `main-seminar`(세미나 이력 슬라이더) 대응 데이터.
// 2026-11-04 신설: 구조만 먼저 만들어 둠. 애견미용학원 대전점의 실제 세미나 개최 이력을 확인하지 못해
// 배열을 비워 둔다. 임의로 세미나를 지어내면 없는 행사를 주장하게 되므로 절대 추측으로 채우지 말 것.
// 실제 이력(주제 / 날짜 / 한 줄 설명)을 받으면 아래 배열만 채우면 홈 섹션이 자동으로 노출된다.
export type Seminar = {
  title: string;
  date: string; // YYYY-MM-DD
  summary?: string;
};

export const seminars: Seminar[] = [];
