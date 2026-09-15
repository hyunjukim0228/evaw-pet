// 수강생 후기 — 실제 후기 데이터 없음. 구조 설계용 placeholder만 채워둠(실제 인물이 쓴 것처럼 보이지 않게
// "○○○님" + [예시 문구]로 명확히 표시). 실제 후기 확보되면 이 배열만 교체.
// photo: 네이버 플레이스에서 확보한 실제 실습·완성견 사진(갤러리와 동일 출처, lib/galleryPhotos.ts) —
// 그동안 갤러리 그리드에만 쓰이던 나머지 사진 중 3장을 후기 카드마다 다르게 배정(2026-09-15).
// 이 사진이 그 후기를 쓴 손님의 강아지라는 뜻은 아님 — 후기 자체가 예시 문구임을 위 disclaimer로 이미 명시.
export type Review = {
  name: string;
  course: string;
  rating: number;
  text: string;
  photo?: string;
};

export const reviews: Review[] = [
  {
    name: "○○○님",
    course: "애견미용 3급 과정",
    rating: 5,
    text: "[예시] 실제 수강생 후기가 들어갈 자리입니다.",
    photo: "/images/gallery/facility-1.jpg",
  },
  {
    name: "○○○님",
    course: "가정견미용 과정",
    rating: 5,
    text: "[예시] 실제 수강생 후기가 들어갈 자리입니다.",
    photo: "/images/gallery/facility-11.jpg",
  },
  {
    name: "○○○님",
    course: "취업·창업 준비 과정",
    rating: 5,
    text: "[예시] 실제 수강생 후기가 들어갈 자리입니다.",
    photo: "/images/gallery/facility-16.jpg",
  },
];
