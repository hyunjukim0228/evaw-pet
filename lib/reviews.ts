// 수강생 후기 — 실제 후기 데이터 없음. 구조 설계용 placeholder만 채워둠(실제 인물이 쓴 것처럼 보이지 않게
// "○○○님" + [예시 문구]로 명확히 표시). 실제 후기 확보되면 이 배열만 교체.
export type Review = {
  name: string;
  course: string;
  rating: number;
  text: string;
};

export const reviews: Review[] = [
  {
    name: "○○○님",
    course: "애견미용 3급 과정",
    rating: 5,
    text: "[예시] 실제 수강생 후기가 들어갈 자리입니다.",
  },
  {
    name: "○○○님",
    course: "가정견미용 과정",
    rating: 5,
    text: "[예시] 실제 수강생 후기가 들어갈 자리입니다.",
  },
  {
    name: "○○○님",
    course: "취업·창업 준비 과정",
    rating: 5,
    text: "[예시] 실제 수강생 후기가 들어갈 자리입니다.",
  },
];
