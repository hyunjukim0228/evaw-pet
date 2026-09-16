// 수강생 후기 — 실제 후기 데이터 없음. 구조 설계용 placeholder만 채워둠(실제 인물이 쓴 것처럼 보이지 않게
// "○○○님" + [예시] 표기로 명확히 표시). 실제 후기 확보되면 이 배열만 교체.
// 2026-09-16: ReviewSlider.tsx 스펙(큰따옴표 오버레이 + 이름·과정 뱃지 구조)에 맞춰 avatar 필드 제거.
// 2026-09-16(2차): 3건→5건(실제 과정 5개 전부)로 확대 — PC(slidesPerView:3)에서 슬라이드 개수가
// 화면에 보이는 개수와 같으면 Swiper가 넘길 게 없어 "안 넘어가는" 것처럼 보이던 문제 해결(사용자 지적).
// 2026-09-16(3차): STEP5 스펙 — 5건→6건(유형: 직장인·자격증/비전공초보/실견미용/취업준비/창업준비/
// 반려견케어), avatar(이모지) 필드 재도입. courses.ts가 STEP4로 6분류 taxonomy로 바뀌어 course 라벨도 갱신.
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
    course: "자격증 취득반",
    avatar: "👔",
    headline: "[예시] 직장 다니면서도 자격증 딸 수 있었어요.",
    text: "[예시] 실제 수강생 후기 본문이 들어갈 자리입니다.",
  },
  {
    name: "○○○님",
    course: "기초과정",
    avatar: "🌱",
    headline: "[예시] 비전공에 완전 초보였는데 천천히 따라갈 수 있었어요.",
    text: "[예시] 실제 수강생 후기 본문이 들어갈 자리입니다.",
  },
  {
    name: "○○○님",
    course: "실견 심화반",
    avatar: "✂️",
    headline: "[예시] 실제 강아지로 배우니까 확실히 다르더라고요.",
    text: "[예시] 실제 수강생 후기 본문이 들어갈 자리입니다.",
  },
  {
    name: "○○○님",
    course: "취업·창업반",
    avatar: "💼",
    headline: "[예시] 취업 준비하는데 실질적인 도움을 받았어요.",
    text: "[예시] 실제 수강생 후기 본문이 들어갈 자리입니다.",
  },
  {
    name: "○○○님",
    course: "종합·심화반",
    avatar: "🏪",
    headline: "[예시] 창업까지 생각하고 있어서 종합반으로 준비 중이에요.",
    text: "[예시] 실제 수강생 후기 본문이 들어갈 자리입니다.",
  },
  {
    name: "○○○님",
    course: "스페셜 특강",
    avatar: "🐾",
    headline: "[예시] 우리 강아지 행동교정 때문에 특강 들었는데 좋았어요.",
    text: "[예시] 실제 수강생 후기 본문이 들어갈 자리입니다.",
  },
];
