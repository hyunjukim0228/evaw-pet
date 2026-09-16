// 새소식 — STEP6b: 지점 소식 카드 구조만 설계, 실제 내용은 확정 전이라 "[내용 확정 필요]"로 명시.
export type NewsItem = {
  branch: string;
  title: string;
  summary: string;
  date: string; // YYYY-MM-DD
};

export const news: NewsItem[] = [
  {
    branch: "대전",
    title: "[내용 확정 필요] 대전점 소식",
    summary: "[내용 확정 필요]",
    date: "2026-09-16",
  },
  {
    branch: "강남",
    title: "[내용 확정 필요] 강남점 소식",
    summary: "[내용 확정 필요]",
    date: "2026-09-16",
  },
  {
    branch: "부산 서면",
    title: "[내용 확정 필요] 서면점 소식",
    summary: "[내용 확정 필요]",
    date: "2026-09-16",
  },
  {
    branch: "대구",
    title: "[내용 확정 필요] 대구점 소식",
    summary: "[내용 확정 필요]",
    date: "2026-09-16",
  },
];
