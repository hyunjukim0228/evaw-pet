// 커리큘럼 데이터 — 실제 개설 과정이 확정되면 이 배열만 고치면 목록·상세·모달 어디든 전부 반영됩니다.
// 2026-09-16(3차): STEP4 스펙 — 레퍼런스(evaw-pet-grooming.co.kr) 6분류(기초/자격증/실견심화/취업창업/
// 종합심화/스페셜특강) 그대로 적용하기로 사용자 확정(AskUserQuestion). 기존 5과정(3급/2급/취업창업/
// 가정견미용/행동교정)의 실제 내용은 아래 매핑으로 흡수해 재배치 — 사진·상세 문구 등 실제 데이터는 유지.
export type Course = {
  slug: string;
  title: string;
  badge: string; // 레퍼런스 대괄호 라벨 — 카드 뱃지로 노출
  highlight?: boolean; // "종합·심화반"(🔥추천) 강조 카드
  summary: string;
  description: string;
  points: string[];
  // 과정 상세 페이지의 "커리큘럼 단계" 카드 — 켈리스 과정 상세 구조(단계별 진행) 참고, 실제 진도는 확정 필요.
  steps: string[];
  // CoursePreviewModal(퀵메뉴 과정 미리보기 팝업)용 — 없으면 "상담 시 안내"로 표시.
  duration?: string;
  // CoursePreviewModal용 — summary를 "추천 대상" 관점으로 다시 쓴 한 줄(새 주장 아님, 기존 문구 재구성).
  recommendFor: string;
  // 실제 사진이 준비된 과정만 채움(public/images/ 경로) — 없으면 카드·상세 페이지에서 이미지 영역 자체를 생략(글로만 구성).
  cardImage?: string;
  detailImage?: string;
  detailImageMo?: string; // 있으면 상세 이미지도 PC/모바일 분리(히어로와 동일한 1024px 분기)
};

export const courses: Course[] = [
  {
    slug: "basic",
    title: "기초과정",
    badge: "입문",
    summary: "애견미용을 처음 시작하는 분을 위한 기초 과정입니다.",
    description:
      "가위·클리퍼 등 기본 도구 사용법부터 목욕·드라이·기초 클리핑까지, 애견미용을 처음 배우는 분을 위한 입문 과정입니다. 1:1 개별 맞춤 진도로 진행해 필수 교육기간 없이 진행합니다.",
    points: ["기본 도구 사용법", "목욕·드라이 실습", "기초 클리핑", "1:1 맞춤 진도"],
    steps: ["도구 사용법과 커트의 원리", "목욕·드라이 기초 실습", "기초 클리핑 실습", "보호자 상담부터 인계까지 현장 실무"],
    duration: "1:1 개별 맞춤 진도로 필수 교육기간 없이 진행",
    recommendFor: "애견미용을 처음 시작하는 분",
    // 2026-09-15: 네이버 플레이스 공식블로그에서 확보한 실제 사진(lib/galleryPhotos.ts와 동일 출처)으로 배정.
    cardImage: "/images/gallery/facility-2.jpg",
    detailImage: "/images/gallery/facility-6.jpg",
  },
  {
    slug: "certificate",
    title: "자격증 취득반",
    badge: "자격증",
    summary: "3급·2급 자격증을 단계별로 취득하는 과정입니다.",
    description:
      "기초 과정을 마친 분을 대상으로 견종별 스타일링과 심화 클리핑·가위컷을 익혀 3급·2급 자격증 취득까지 이어가는 과정입니다. 1:1 개별 맞춤 진도로 필수 교육기간 없이 진행합니다.",
    points: ["견종별 스타일링", "심화 클리핑·가위컷", "자격증 실기 대비", "1:1 맞춤 진도"],
    steps: ["견종별 스타일링 이론", "심화 클리핑·가위컷 실습", "보호자 상담부터 인계까지 현장 실무", "자격증 실기 대비"],
    duration: "1:1 개별 맞춤 진도로 필수 교육기간 없이 진행",
    recommendFor: "3급·2급 자격증을 단계별로 취득하고 싶은 분",
    cardImage: "/images/gallery/facility-9.jpg",
    detailImage: "/images/gallery/facility-13.jpg",
  },
  {
    slug: "practice",
    title: "실견 심화반",
    badge: "실습",
    summary: "실제 가정견을 대상으로 심화 실습을 진행하는 과정입니다.",
    description:
      "자격증 취득 여부와 상관없이, 실제 가정에서 자란 반려견을 대상으로 목욕·빗질·부분 클리핑까지 직접 실습하며 실전 감각을 다지는 과정입니다.",
    points: ["가정견 대상 실전 실습", "목욕·빗질 기본기", "부분 클리핑 실습", "반려견 스트레스 줄이는 법"],
    steps: ["도구·안전 기본기", "목욕·드라이 실습", "빗질·엉킴 관리", "부분 클리핑 실습"],
    recommendFor: "실전 실습 위주로 실력을 다지고 싶은 분",
    // 2026-09-11: 사용자가 타사(EVAW/이바우펫) 브랜드·수상 문구 포함 사실을 인지한 상태에서 그대로 사용하기로 확정(상호명은 "애견미용학원 대전점" 유지).
    // 2026-09-15: 네이버 플레이스에서 확보한 실제 사진으로 교체 — 브랜드 문구 없는 순수 사진.
    cardImage: "/images/gallery/facility-7.jpg",
    detailImage: "/images/gallery/facility-3.jpg",
    detailImageMo: "/images/gallery/facility-8.jpg",
  },
  {
    slug: "career",
    title: "취업·창업반",
    badge: "취업",
    summary: "수료 후 취업 또는 창업까지 준비하는 과정입니다.",
    description:
      "자격증 취득 이후 실무 역량을 다지고, 취업 또는 창업까지 이어질 수 있도록 준비하는 과정입니다.",
    points: ["실무 역량 강화", "취업 연계 안내", "창업 준비 안내", "포트폴리오 준비"],
    steps: ["실무 역량 점검·보강", "포트폴리오 준비", "취업 연계 안내", "창업 준비 안내"],
    recommendFor: "자격증 취득 후 취업·창업을 준비하는 분",
    cardImage: "/images/gallery/facility-10.jpg",
    detailImage: "/images/gallery/facility-15.jpg",
  },
  {
    slug: "advanced",
    title: "종합·심화반",
    badge: "🔥추천",
    highlight: true,
    summary: "기초부터 취업·창업까지 한 번에 준비하는 종합 심화 과정입니다.",
    description:
      "기초 실습부터 자격증 취득, 실견 심화 실습, 취업·창업 준비까지 이어지는 종합 과정입니다. 개별 진도에 맞춰 단계별로 진행합니다.",
    points: ["3급·2급 자격증", "실견 심화 실습", "취업·창업 준비", "1:1 맞춤 진도"],
    steps: ["기초 도구·이론", "자격증 실기 대비", "실견 심화 실습", "취업·창업 준비"],
    recommendFor: "자격증부터 진로까지 한 번에 준비하고 싶은 분",
    cardImage: "/images/gallery/facility-14.jpg",
    detailImage: "/images/gallery/facility-17.jpg",
  },
  {
    slug: "special",
    title: "스페셜 특강",
    badge: "특강",
    summary: "행동교정 등 관심 있는 주제만 짧게 배우는 스페셜 특강입니다.",
    description:
      "정규 과정과 별도로, 애견미용과 함께 수요가 늘고 있는 반려동물 행동교정 등 관심 주제를 짧게 배워보는 특강입니다. 문제행동의 원인을 이해하고, 실습을 통해 교정 방법을 익힙니다.",
    points: ["문제행동 원인 이해", "교정 실습", "보호자 상담법", "행동교정 세미나 연계"],
    steps: ["반려견 행동 이해 기초", "문제행동 유형별 접근법", "교정 실습", "보호자 상담·사후관리"],
    recommendFor: "반려견 문제행동 등 특정 주제를 짧게 배우고 싶은 분",
    cardImage: "/images/gallery/facility-5.jpg",
    detailImage: "/images/gallery/facility-16.jpg",
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

// 2026-09-16(3차): STEP3 스펙 — 레퍼런스(evaw-pet-grooming.co.kr) 차별점 6항목 분류·워딩 그대로 적용하기로
// 사용자 확정(AskUserQuestion). 기존 4항목(2026-09-13 실제 문구)의 의미는 흡수해 재배치.
// desc는 기존 benefit-grid(홈 요약 카드·과정상세 공통 섹션)용 한 줄 설명, core/feature/effect는 STEP3 카드
// 클릭 시 뜨는 상세 모달(📌핵심/💡특징/✅효과)용.
import type { IconName } from "@/components/icons";

export type Differentiator = {
  title: string;
  badge: string;
  desc: string;
  icon: IconName;
  core: string;
  feature: string;
  effect: string;
  tags: string[];
};

export const courseDifferentiators: Differentiator[] = [
  {
    title: "100% 가정견 실견 실습",
    badge: "실전 실습",
    desc: "농장·공장견이 아닌 100% 가정견으로 현장 실무를 그대로 경험합니다.",
    icon: "heart",
    core: "농장견·전시견이 아닌 실제 가정에서 자란 반려견을 대상으로 실습합니다.",
    feature: "보호자와 반려견을 함께 마주하는 현장 그대로의 환경에서, 다양한 견종과 성격을 직접 경험합니다.",
    effect: "수료 후 현장에 바로 투입돼도 낯설지 않은 실전 감각을 기를 수 있습니다.",
    tags: ["실견실습", "가정견", "현장감"],
  },
  {
    title: "개별 맞춤 피드백",
    badge: "정예 수업",
    desc: "소수 정예로 진행해 강사가 한 사람 한 사람의 진도를 직접 확인합니다.",
    icon: "chat",
    core: "정해진 대규모 반 편성 없이, 강사가 개개인의 진도와 손기술을 직접 확인하며 진행합니다.",
    feature: "미용 방식·손기술 습관까지 짚어주는 1:1 피드백 중심 수업입니다.",
    effect: "혼자서는 놓치기 쉬운 디테일까지 교정하며 빠르게 실력을 끌어올릴 수 있습니다.",
    tags: ["소수정예", "1:1 피드백"],
  },
  {
    title: "미용 도구 제공",
    badge: "도구 지원",
    desc: "수업에 필요한 기본 미용 도구를 학원에서 제공합니다.",
    icon: "steps",
    core: "가위·클리퍼 등 수업에 필요한 기본 미용 도구를 학원에서 제공합니다.",
    feature: "초기 장비 구매 부담 없이 바로 실습을 시작할 수 있습니다.",
    effect: "도구를 직접 써보며 나에게 맞는 장비를 고를 기준을 세울 수 있습니다.",
    tags: ["도구제공", "부담없는 시작"],
  },
  {
    title: "자율출석 시간제",
    badge: "유연한 스케줄",
    desc: "정해진 등원 시간 없이 본인 일정에 맞춰 자율적으로 출석합니다.",
    icon: "unlock",
    core: "필수 교육기간 없이, 본인 일정에 맞춰 자율적으로 출석하며 진도를 맞춥니다.",
    feature: "직장인·학생 등 생활 패턴이 다른 분들도 무리 없이 병행할 수 있습니다.",
    effect: "내 속도대로 진도를 맞추며 부담 없이 자격증까지 이어갈 수 있습니다.",
    tags: ["자율출석", "시간제"],
  },
  {
    title: "취업·창업 개별 지원",
    badge: "사후 지원",
    desc: "취업연계·창업 컨설팅까지 개별 맞춤으로 지원합니다.",
    icon: "briefcase",
    core: "수료로 끝나지 않고 취업 연계와 창업 준비까지 개별로 안내합니다.",
    feature: "포트폴리오 준비부터 진로 상담까지, 과정 이후에도 이어지는 지원입니다.",
    effect: "자격증 취득 이후의 다음 단계까지 막막하지 않게 준비할 수 있습니다.",
    tags: ["취업연계", "창업지원"],
  },
  {
    title: "스페셜 특강 포함",
    badge: "특강 포함",
    desc: "행동교정·펫푸드 등 반려동물 사업의 다양한 주제를 특강으로 함께 배웁니다.",
    icon: "certificate",
    core: "정규 과정 외에도 관심 주제를 짧게 배워보는 스페셜 특강을 운영합니다.",
    feature: "행동교정·펫푸드 등 반려동물 관련 다양한 주제를 특강으로 접할 수 있습니다.",
    effect: "미용 실력에 더해 반려동물 산업 전반을 보는 시야를 넓힐 수 있습니다.",
    tags: ["특강", "다양한 주제"],
  },
];
