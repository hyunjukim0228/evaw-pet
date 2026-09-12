"use client";

import { ReactNode } from "react";
import { useConsultModal } from "./ConsultModalContext";

type Props = {
  children: ReactNode;
  className?: string;
  presetSlug?: string;
};

// 서버 컴포넌트 페이지(about/curriculum 등)에서 상담 모달을 여는 버튼이 필요할 때 이 컴포넌트만 끼워 넣으면 됨.
export default function ConsultCtaButton({ children, className, presetSlug }: Props) {
  const { open } = useConsultModal();
  return (
    <button type="button" className={className} onClick={() => open(presetSlug)}>
      {children}
    </button>
  );
}
