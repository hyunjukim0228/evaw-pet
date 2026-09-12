// 강점·차별점 섹션용 작은 라인 아이콘 — evaw-pet-grooming.co.kr의 "차별점" 섹션(아이콘+텍스트) 구조를 참고.
// 이모지 대신 인라인 SVG로 통일(디자인 시스템 톤 유지, 색상은 accent 아닌 ink).

type IconProps = { className?: string };
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function CertificateIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="M9 12.5L7 21l5-3 5 3-2-8.5" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5 6 5c2 0 3.5 1.2 4 2.5.5-1.3 2-2.5 4-2.5 3.5 0 5 3.5 3.5 6.5C19 15.65 12 20 12 20z" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5h16v11H8l-4 4V5z" />
    </svg>
  );
}

export function UnlockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7.5-2" />
    </svg>
  );
}

export function StepsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V14M12 20V9M20 20V4" />
    </svg>
  );
}

export const ICONS = {
  certificate: CertificateIcon,
  heart: HeartIcon,
  briefcase: BriefcaseIcon,
  chat: ChatIcon,
  unlock: UnlockIcon,
  steps: StepsIcon,
} as const;

export type IconName = keyof typeof ICONS;
