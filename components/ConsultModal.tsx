"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { courses } from "@/lib/courses";
import { branches } from "@/lib/branches";
import { supabase } from "@/lib/supabase";
import { useConsultModal } from "./ConsultModalContext";

const branchLabel = (b: (typeof branches)[number]) => `${b.name} 애견미용학원 (${b.region})`;
const defaultBranchLabel = branchLabel(branches.find((b) => b.isCurrent) ?? branches[0]);

const INTENT_COPY = {
  consult: { title: "상담 신청", lead: "관심 있는 과정을 선택해 주시면 더 정확히 안내해 드립니다.", submit: "상담 신청하기" },
  tuition: { title: "간편 수강료 조회", lead: "관심 과정과 지점을 선택해 주시면 수강료를 안내해 드립니다.", submit: "수강료 조회하기" },
};

// 연락처 검증 — 010 등 01[016789]로 시작, 하이픈 유무 모두 허용(2026-09-16 스펙 정규식).
const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

const schema = z.object({
  name: z.string().trim().min(2, "이름은 2자 이상 입력해 주세요."),
  phone: z.string().regex(phoneRegex, "올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)"),
  branch: z.string().min(1, "희망 지점을 선택해 주세요."),
  courseInterest: z.string().min(1, "관심 과정을 선택해 주세요."),
  agree: z.boolean().refine((v) => v === true, { message: "개인정보 수집·이용에 동의해 주세요." }),
});
type FormValues = z.infer<typeof schema>;

export default function ConsultModal() {
  const { isOpen, presetSlug, presetBranch, intent, close } = useConsultModal();
  const [submitted, setSubmitted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const copy = INTENT_COPY[intent];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      branch: defaultBranchLabel,
      courseInterest: presetSlug ?? "",
      agree: false,
    },
  });

  // 퀵메뉴·과정상세 등에서 특정 과정을 지정해 열었을 때 그 과정을 미리 선택. 지점은 카드 클릭 프리셋이 있으면 그걸,
  // 없으면 이 사이트 기본 지점(대전)을 기본값으로 — 어느 쪽이든 사용자가 드롭다운에서 직접 바꿀 수 있음.
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      reset({
        name: "",
        phone: "",
        branch: presetBranch ?? defaultBranchLabel,
        courseInterest: presetSlug ?? "",
        agree: false,
      });
    }
  }, [isOpen, presetSlug, presetBranch, reset]);

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
      course_interests: [values.courseInterest],
      branch_interest: values.branch,
      source_page: presetSlug ? `curriculum/${presetSlug}` : intent === "tuition" ? "modal-tuition" : "modal",
    });

    if (dbError) {
      setToastMsg("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      setToastOpen(true);
      return;
    }
    setSubmitted(true);
    reset();
  }

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
              <>
                <Dialog.Title asChild>
                  <p style={{ textAlign: "center", fontWeight: 700, padding: "20px 0 4px" }}>
                    상담 신청이 완료되었습니다.
                  </p>
                </Dialog.Title>
                <p style={{ textAlign: "center", fontWeight: 400, fontSize: ".88rem", color: "var(--ink-soft)", paddingBottom: 16 }}>
                  담당자가 확인 후 연락드리겠습니다.
                </p>
              </>
            ) : (
              <form className="consult-form" style={{ padding: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Dialog.Title asChild>
                  <h3 className="sec-title" style={{ fontSize: "1.2rem", marginBottom: 4 }}>
                    {copy.title}
                  </h3>
                </Dialog.Title>
                <p className="sec-sub" style={{ marginBottom: 18 }}>
                  {copy.lead}
                </p>

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
                  <label htmlFor="m-branch">희망 지점</label>
                  <select id="m-branch" className="field-input" {...register("branch")}>
                    {branches.map((b) => (
                      <option key={b.name} value={branchLabel(b)}>
                        {branchLabel(b)}
                        {b.isCurrent ? " · 지금 보고 계신 지점" : ""}
                      </option>
                    ))}
                  </select>
                  {errors.branch && <p className="field-error">{errors.branch.message}</p>}
                </div>

                <div className="field">
                  <label htmlFor="m-course">관심 과정</label>
                  <select id="m-course" className="field-input" defaultValue="" {...register("courseInterest")}>
                    <option value="" disabled>
                      선택해 주세요
                    </option>
                    {courses.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  {errors.courseInterest && <p className="field-error">{errors.courseInterest.message}</p>}
                </div>

                <label className="agree">
                  <input type="checkbox" {...register("agree")} />
                  개인정보 수집·이용에 동의합니다. <span className="tbd">[약관 내용 확정 필요]</span>
                </label>
                {errors.agree && <p className="field-error">{errors.agree.message}</p>}

                <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={isSubmitting}>
                  {isSubmitting ? "접수 중..." : copy.submit}
                </button>
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
