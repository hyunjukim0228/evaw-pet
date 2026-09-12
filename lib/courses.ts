// 커리큘럼 데이터 — 실제 개설 과정이 확정되면 이 배열만 고치면 목록·상세·모달 어디든 전부 반영됩니다.
export type Course = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  points: string[];
  // 과정 상세 페이지의 "커리큘럼 단계" 카드 — 켈리스 과정 상세 구조(단계별 진행) 참고, 실제 진도는 확정 필요.
  steps: string[];
  // 실제 사진이 준비된 과정만 채움(public/images/ 경로) — 없으면 카드·상세 페이지에서 이미지 영역 자체를 생략(글로만 구성).
  cardImage?: string;
  detailImage?: string;
  detailImageMo?: string; // 있으면 상세 이미지도 PC/모바일 분리(히어로와 동일한 1024px 분기)
};

export const courses: Course[] = [
  {
    slug: "level-3",
    title: "애견미용 3급 과정",
    summary: "애견미용을 처음 시작하는 분을 위한 기초 과정입니다.",
    description:
      "가위·클리퍼 등 기본 도구 사용법부터 목욕·드라이·기초 클리핑까지, 애견미용을 처음 배우는 분을 위한 입문 과정입니다.",
    points: ["기본 도구 사용법", "목욕·드라이 실습", "기초 클리핑", "자격증 3급 대비"],
    steps: ["도구 사용법과 커트의 원리", "목욕·드라이 기초 실습", "기초 클리핑 실습", "자격증 3급 대비 실기"],
  },
  {
    slug: "level-2",
    title: "애견미용 2급 과정",
    summary: "3급 이수자를 위한 심화·실전 실습 과정입니다.",
    description:
      "3급 과정을 마친 분을 대상으로 견종별 스타일링과 심화 실습을 진행하는 과정입니다. 실제 반려견을 대상으로 한 실습 비중이 높습니다.",
    points: ["견종별 스타일링", "심화 클리핑·가위컷", "실전 실습 위주", "자격증 2급 대비"],
    steps: ["견종별 스타일링 이론", "심화 클리핑·가위컷 실습", "실견 대상 심화 실습", "자격증 2급 대비 실기"],
  },
  {
    slug: "career",
    title: "취업·창업 준비 과정",
    summary: "수료 후 취업 또는 창업까지 준비하는 과정입니다.",
    description:
      "자격증 취득 이후 실무 역량을 다지고, 취업 또는 창업까지 이어질 수 있도록 준비하는 과정입니다.",
    points: ["실무 역량 강화", "취업 연계 안내", "창업 준비 안내", "포트폴리오 준비"],
    steps: ["실무 역량 점검·보강", "포트폴리오 준비", "취업 연계 안내", "창업 준비 안내"],
  },
  {
    slug: "home-grooming",
    title: "가정견미용 과정",
    summary: "내 반려견을 집에서 직접 관리하고 싶은 분들을 위한 과정입니다.",
    description:
      "자격증 취득이 목적이 아니어도 괜찮습니다. 목욕·빗질·부분 클리핑을 직접 할 수 있도록 돕는 실습 중심 과정으로, 반려견과 함께하는 일상 관리에 초점을 둡니다.",
    points: ["가정에서 바로 쓰는 손질법", "목욕·빗질 기본기", "부분 클리핑 실습", "반려견 스트레스 줄이는 법"],
    steps: ["도구·안전 기본기", "목욕·드라이 실습", "빗질·엉킴 관리", "부분 클리핑 실습"],
    // 2026-09-11: 사용자가 타사(EVAW/이바우펫) 브랜드·수상 문구 포함 사실을 인지한 상태에서 그대로 사용하기로 확정(상호명은 "애견미용학원 대전점" 유지).
    cardImage: "/images/courses/home-grooming-card.webp",
    detailImage: "/images/courses/home-grooming-detail-pc.webp",
    detailImageMo: "/images/courses/home-grooming-detail-mo.webp",
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

// 과정 상세 페이지마다 반복 노출하는 공통 신뢰 섹션 — 켈리스 과정 상세("이 일이 좋은 이유"/"차별점")를 참고해 애견미용사 진로에 맞게 재작성.
// [미검증] 실제 취업 데이터 아님, 일반적인 업계 특징 소개 문구 — 과장 표현(취업 보장·100% 등) 없이 완충 서술.
export const careerBenefits = [
  { title: "적성만 맞으면 진입 장벽이 낮은 편", desc: "학력·전공 무관하게 시작하는 분이 많습니다.", icon: "unlock" },
  { title: "자격증 기반 진로", desc: "3급·2급 단계별 자격증으로 실력을 증명할 수 있습니다.", icon: "certificate" },
  { title: "취업과 창업, 두 갈래 진로", desc: "숍 취업과 개인 창업 모두 준비하실 수 있습니다.", icon: "briefcase" },
  { title: "실무 중심 커리큘럼", desc: "이론보다 실습 비중이 높은 과정으로 구성했습니다.", icon: "steps" },
] as const;

export const courseDifferentiators = [
  { title: "실견 실습 중심", desc: "실제 반려견을 대상으로 한 실습 위주 수업입니다.", icon: "heart" },
  { title: "단계별 커리큘럼", desc: "3급→2급→취업·창업까지 순서대로 이어집니다.", icon: "steps" },
  { title: "1:1 상담 지원", desc: "등록 전후 궁금한 점을 개별로 안내해 드립니다.", icon: "chat" },
  { title: "취업·창업 연계 안내", desc: "수료 후 진로까지 함께 안내해 드립니다.", icon: "briefcase" },
] as const;
