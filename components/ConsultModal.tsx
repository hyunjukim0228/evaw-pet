"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { branches } from "@/lib/branches";
import { contactLinks } from "@/lib/contactLinks";
import { supabase } from "@/lib/supabase";
import ChannelButton from "./ChannelButton";
import { useConsultModal } from "./ConsultModalContext";

const branchLabel = (b: (typeof branches)[number]) => `${b.name} 애견미용학원 (${b.region})`;
const defaultBranchLabel = branchLabel(branches.find((b) => b.isCurrent) ?? branches[0]);

const INTENT_COPY = {
  consult: { title: "상담 신청", lead: "수강 목적과 희망 지점을 선택해 주시면 더 정확히 안내해 드립니다.", submit: "상담 신청하기" },
  tuition: { title: "간편 수강료 조회", lead: "수강 목적과 희망 지점을 선택해 주시면 수강료를 안내해 드립니다.", submit: "수강료 조회하기" },
};

// STEP8: 수강 목적 버튼 선택 — 레퍼런스(evaw-pet-grooming.co.kr) 상담모달 STEP1 항목 그대로.
const PURPOSES = [
  { value: "cert", label: "📜 자격증" },
  { value: "job", label: "💼 취업" },
  { value: "startup", label: "🏪 창업" },
  { value: "hobby", label: "🐾 취미·반려견 케어" },
  { value: "student", label: "📚 중·고등반" },
  { value: "unsure", label: "🤔 고민 중" },
] as const;
const PURPOSE_LABEL: Record<string, string> = Object.fromEntries(PURPOSES.map((p) => [p.value, p.label]));

// 연락처 검증 — 010 등 01[016789]로 시작, 하이픈 유무 모두 허용(2026-09-16 스펙 정규식).
const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

const schema = z.object({
  purpose: z.string().min(1, "수강 목적을 선택해 주세요."),
  branch: z.string().min(1, "희망 지점을 선택해 주세요."),
  name: z.string().trim().min(2, "이름은 2자 이상 입력해 주세요."),
  phone: z.string().regex(phoneRegex, "올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)"),
  inquiry: z.string().optional(),
  agree: z.boolean().refine((v) => v === true, { message: "개인정보 수집·이용에 동의해 주세요." }),
});
type FormValues = z.infer<typeof schema>;

// STEP8: 상담모달 1단계(수강목적·희망지점)→2단계(이름·연락처·문의사항) 2-STEP 플로우.
// evaw-pet-grooming.co.kr 상담모달 구조 참고 — 관심 과정(courseInterest) 드롭다운은 화면에서 빼고,
// 과정상세 CTA 등에서 넘어온 presetSlug는 화면에 노출하지 않고 제출 시 course_interests에 그대로 실어 보냄.
export default function ConsultModal() {
  const { isOpen, presetSlug, presetBranch, intent, close } = useConsultModal();
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const copy = INTENT_COPY[intent];

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      purpose: "",
      branch: defaultBranchLabel,
      name: "",
      phone: "",
      inquiry: "",
      agree: false,
    },
  });

  // 퀵메뉴·과정상세 등에서 특정 과정을 지정해 열었을 때는 courseInterest 선택 UI 없이 presetSlug로만 들고 다님.
  // 지점은 카드 클릭 프리셋이 있으면 그걸, 없으면 이 사이트 기본 지점(대전)을 기본값으로.
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      reset({
        purpose: "",
        branch: presetBranch ?? defaultBranchLabel,
        name: "",
        phone: "",
        inquiry: "",
        agree: false,
      });
    }
  }, [isOpen, presetBranch, reset]);

  async function goToStep2() {
    const ok = await trigger(["purpose", "branch"]);
    if (ok) setStep(2);
  }

  async function onSubmit(values: FormValues) {
    if (!supabase) {
      setToastMsg("지금은 상담 신청을 접수할 수 없습니다. 잠시 후 다시 시도해 주세요.");
      setToastOpen(true);
      return;
    }

    // TODO(실제 연동 지점): 지금은 브라우저에서 Supabase(anon key, RLS insert-only)로 직접 저장.
    // 정적 export 사이트라 서버 API 라우트가 없어 이 방식을 유지(별도 서버 배포 전환 시 이 부분만 교체).
    const { error: dbError } = await supabase.from("consult_requests").insert({
      name: values.name,
      phone: values.phone,
      course_interests: presetSlug ? [presetSlug] : [],
      branch_interest: values.branch,
      purpose: values.purpose,
      inquiry: values.inquiry || null,
      source_page: presetSlug ? `curriculum/${presetSlug}` : intent === "tuition" ? "modal-tuition" : "modal",
    });

    if (dbError) {
      setToastMsg("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      setToastOpen(true);
      return;
    }
    setSubmitted(true);
  }

  const purpose = watch("purpose");

  return (
    <Toast.Provider swipeDirection="right">
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
        <Dialog.Portal>
          <Dialog.Overlay className="modal-overlay" />
          <Dialog.Content className="modal-panel" aria-describedby={undefined}>
            <Dialog.Close asChild>
              <button className="modal-close" aria-label="닫기">
                ×
              </button>
            </Dialog.Close>

            {submitted ? (
              <div style={{ padding: "20px 0 4px", textAlign: "center" }}>
                <Dialog.Title asChild>
                  <p style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 4 }}>🎉 상담 신청이 완료되었습니다.</p>
                </Dialog.Title>
                <p style={{ fontWeight: 400, fontSize: ".88rem", color: "var(--ink-soft)", marginBottom: 20 }}>
                  담당자가 확인 후 연락드리겠습니다. 급하시면 아래로 바로 연결해 보세요.
                </p>
                <div className="consult-success-channels">
                  <ChannelButton channel="phone" value={contactLinks.phone} />
                  <ChannelButton channel="kakao" value={contactLinks.kakaoUrl} />
                  <ChannelButton channel="naver" value={contactLinks.naverUrl} />
                </div>
              </div>
            ) : (
              <form className="consult-form" style={{ padding: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Dialog.Title asChild>
                  <h3 className="sec-title" style={{ fontSize: "1.2rem", marginBottom: 4 }}>
                    {copy.title}
                  </h3>
                </Dialog.Title>
                <p className="sec-sub" style={{ marginBottom: 10 }}>
                  {copy.lead}
                </p>
                <p className="consult-step-indicator">STEP {step} / 2</p>

                {/* 2026-09-16(2차): 두 STEP을 flex-row로 나란히 두고 translateX로 밀던 방식을 버림 —
                    높이가 다른 두 STEP이 같은 트랙 안에서 서로의 높이만큼 강제로 늘어나면서(align-items:
                    stretch 기본값) STEP1에 불필요한 빈 공간이 생기고 모달이 과하게 커지는 버그가 있었음
                    (사용자 스크린샷으로 확인). 활성 STEP 하나만 렌더링하고 key로 전환 애니메이션만 재생. */}
                <div className="consult-steps">
                  {step === 1 ? (
                    <div key="step1" className="consult-step-pane">
                      <div className="field">
                        <label>수강 목적</label>
                        <div className="consult-purpose-grid">
                          {PURPOSES.map((p) => (
                            <button
                              key={p.value}
                              type="button"
                              className={`consult-purpose-btn${purpose === p.value ? " active" : ""}`}
                              onClick={() => setValue("purpose", p.value, { shouldValidate: true })}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                        {errors.purpose && <p className="field-error">{errors.purpose.message}</p>}
                      </div>

                      <div className="field">
                        <label htmlFor="m-branch">희망 지점</label>
                        <select id="m-branch" className="field-input" {...register("branch")}>
                          {branches.map((b) => (
                            <option key={b.name} value={branchLabel(b)}>
                              {branchLabel(b)}
                              {b.isCurrent ? " (현재 지점)" : ""}
                            </option>
                          ))}
                        </select>
                        {errors.branch && <p className="field-error">{errors.branch.message}</p>}
                      </div>

                      <button type="button" className="btn btn-primary btn-lg btn-full" onClick={goToStep2}>
                        무료 상담 가능 여부 확인하기
                      </button>
                    </div>
                  ) : (
                    <div key="step2" className="consult-step-pane">
                      {purpose && <p className="consult-selected-purpose">선택하신 목적: {PURPOSE_LABEL[purpose]}</p>}
                      <div className="field">
                        <label htmlFor="m-name">이름</label>
                        <input id="m-name" className="field-input" placeholder="이름을 입력해 주세요" {...register("name")} />
                        {errors.name && <p className="field-error">{errors.name.message}</p>}
                      </div>

                      <div className="field">
                        <label htmlFor="m-phone">연락처</label>
                        <input
                          id="m-phone"
                          className="field-input"
                          type="tel"
                          placeholder="010-0000-0000"
                          maxLength={13}
                          {...register("phone", {
                            onChange: (e) => {
                              e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
                            },
                          })}
                        />
                        {errors.phone && <p className="field-error">{errors.phone.message}</p>}
                      </div>

                      <div className="field">
                        <label htmlFor="m-inquiry">문의사항 (선택)</label>
                        <textarea
                          id="m-inquiry"
                          className="field-input"
                          rows={3}
                          placeholder="궁금한 점을 자유롭게 남겨주세요"
                          {...register("inquiry")}
                        />
                      </div>

                      <label className="agree">
                        <input type="checkbox" {...register("agree")} />
                        개인정보 수집·이용에 동의합니다. <span className="tbd">[약관 내용 확정 필요]</span>
                      </label>
                      {errors.agree && <p className="field-error">{errors.agree.message}</p>}

                      <div className="consult-step-actions">
                        <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                          ← 이전 단계
                        </button>
                        <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} style={{ flex: 1 }}>
                          {isSubmitting ? "접수 중..." : copy.submit}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            )}
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
