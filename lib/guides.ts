// 가이드(콘텐츠 마케팅) 주제 — 이바우펫 실제 가이드 콘텐츠 주제를 참고한 일반적인 업계 주제 6종.
// 아직 본문 작성 전(팩트체크 필요한 정보성 글이라 별도 브리프로 작성 예정) — 제목·한 줄 소개만.
export type GuideTopic = {
  slug: string;
  title: string;
  teaser: string;
};

export const guideTopics: GuideTopic[] = [
  { slug: "cert-diff", title: "애견미용 자격증 3급·2급 차이는?", teaser: "단계별 자격증 체계가 궁금하신 분들을 위한 안내입니다." },
  { slug: "tuition", title: "애견미용학원 비용은 어떻게 결정될까?", teaser: "수강료를 좌우하는 요소들을 정리했습니다." },
  { slug: "real-dog", title: "자격증 이후 실견미용이 중요한 이유", teaser: "실습 경험이 왜 중요한지 설명합니다." },
  { slug: "gov-support", title: "국비지원과 교육지원은 무엇이 다를까?", teaser: "두 지원 제도의 차이를 안내합니다." },
  { slug: "before-job", title: "애견미용사 취업 전 준비해야 할 것", teaser: "취업을 준비하는 분들을 위한 체크리스트입니다." },
  { slug: "startup", title: "애견미용샵 창업은 무엇부터 준비할까?", teaser: "창업을 고민하는 분들을 위한 안내입니다." },
];
