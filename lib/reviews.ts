// 수강생 후기 — 실제 후기 데이터 없음. 구조 설계용 placeholder만 채워둠(실제 인물이 쓴 것처럼 보이지 않게
// "○○○님" + [예시] 표기로 명확히 표시). 실제 후기 확보되면 이 배열만 교체.
// 2026-09-16: 헤드라인 인용구 + 아바타 구조로 확장(레퍼런스 evaw-pet-grooming.co.kr의 후기 카드 형태 참고) —
// 실제 있었던 것처럼 보이는 구체적 일화를 새로 지어내지 않고, [예시] 표기를 헤드라인·본문 모두에 유지.
export type Review = {
  name: string;
  course: string;
  avatar: string;
  headline: string;
  text: string;
};

export const reviews: Review[] = [
  {
    name: "○○○님",
    course: "애견미용 3급 과정",
    avatar: "🌱",
    headline: "[예시] 실제 수강생 후기 헤드라인이 들어갈 자리입니다.",
    text: "[예시] 실제 수강생 후기 본문이 들어갈 자리입니다.",
  },
  {
    name: "○○○님",
    course: "가정견미용 과정",
    avatar: "🐾",
    headline: "[예시] 실제 수강생 후기 헤드라인이 들어갈 자리입니다.",
    text: "[예시] 실제 수강생 후기 본문이 들어갈 자리입니다.",
  },
  {
    name: "○○○님",
    course: "취업·창업 준비 과정",
    avatar: "💼",
    headline: "[예시] 실제 수강생 후기 헤드라인이 들어갈 자리입니다.",
    text: "[예시] 실제 수강생 후기 본문이 들어갈 자리입니다.",
  },
];
