"use client";

// 전역 상담/수강료 조회 모달.
// 2026-11-04: 모달 안에 따로 들고 있던 2단계 폼을 걷어내고 TuitionSteps(4단계, 인라인판과 공유)로 교체.
// 켈리스의 `consult-dialog`(수강료 조회 모달)와 `quickdb-wrap`(인라인 폼)이 같은 폼을 쓰는 구조와 동일한 접근.
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
import TuitionSteps from "./TuitionSteps";
import { useConsultModal } from "./ConsultModalContext";

const INTENT_COPY = {
  consult: {
    title: "상담 신청",
    lead: "수강 목적과 관심 과정을 선택해 주시면 더 정확히 안내해 드립니다.",
  },
  tuition: {
    title: "간편 수강료 조회",
    lead: "4단계만 선택하시면 수강료를 안내해 드립니다.",
  },
};

export default function ConsultModal() {
  const { isOpen, presetSlug, presetBranch, intent, close } = useConsultModal();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  // 모달을 닫고 다시 열면 폼을 처음 단계부터 새로 — key를 바꿔 TuitionSteps를 리마운트.
  const [formKey, setFormKey] = useState(0);
  const copy = INTENT_COPY[intent];

  useEffect(() => {
    if (isOpen) setFormKey((k) => k + 1);
  }, [isOpen]);

  function showError(message: string) {
    setToastMsg(message);
    setToastOpen(true);
  }

  return (
    <Toast.Provider swipeDirection="right">
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
        <Dialog.Portal>
          <Dialog.Overlay className="modal-overlay" />
          <Dialog.Content className="modal-panel modal-panel-wide" aria-describedby={undefined}>
            <Dialog.Close asChild>
              <button className="modal-close" aria-label="닫기">
                ×
              </button>
            </Dialog.Close>

            <Dialog.Title asChild>
              <h3 className="sec-title" style={{ fontSize: "1.35rem", marginBottom: 4 }}>
                {copy.title}
              </h3>
            </Dialog.Title>
            <p className="sec-sub" style={{ marginBottom: 14, fontSize: ".95rem" }}>
              {copy.lead}
            </p>

            <TuitionSteps
              key={formKey}
              intent={intent}
              presetSlug={presetSlug}
              presetBranch={presetBranch}
              onError={showError}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Toast.Root className="toast-root" open={toastOpen} onOpenChange={setToastOpen} duration={4000}>
        <Toast.Description>{toastMsg}</Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="toast-viewport" />
    </Toast.Provider>
  );
}
