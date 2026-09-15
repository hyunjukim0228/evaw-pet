"use client";

// 어느 페이지에서든(퀵메뉴·과정상세 CTA·지점카드 등) 같은 상담 모달을 열 수 있게 하는 전역 상태.
// 켈리스의 "상담센터" 모달(관심과정 다중선택 + 연락처)을 참고한 구조.
import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

type Intent = "consult" | "tuition"; // consult=일반 상담신청, tuition=간편 수강료 조회 — 폼·제출 내용은 같고 문구만 다름

type OpenOptions = {
  courseSlug?: string; // 관심 과정 프리셋 (과정상세 CTA 등에서)
  branchName?: string; // 관심 지점 프리셋 (전국 지점 카드 클릭 시)
  intent?: Intent;
};

type ConsultModalContextValue = {
  isOpen: boolean;
  presetSlug?: string;
  presetBranch?: string;
  intent: Intent;
  open: (options?: OpenOptions) => void;
  close: () => void;
};

const ConsultModalContext = createContext<ConsultModalContextValue | null>(null);

export function ConsultModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetSlug, setPresetSlug] = useState<string | undefined>(undefined);
  const [presetBranch, setPresetBranch] = useState<string | undefined>(undefined);
  const [intent, setIntent] = useState<Intent>("consult");

  const open = useCallback((options?: OpenOptions) => {
    setPresetSlug(options?.courseSlug);
    setPresetBranch(options?.branchName);
    setIntent(options?.intent ?? "consult");
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, presetSlug, presetBranch, intent, open, close }),
    [isOpen, presetSlug, presetBranch, intent, open, close]
  );

  return <ConsultModalContext.Provider value={value}>{children}</ConsultModalContext.Provider>;
}

export function useConsultModal() {
  const ctx = useContext(ConsultModalContext);
  if (!ctx) throw new Error("useConsultModal은 ConsultModalProvider 안에서만 사용할 수 있습니다.");
  return ctx;
}
