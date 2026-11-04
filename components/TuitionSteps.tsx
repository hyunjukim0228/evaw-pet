"use client";

// 4단계 수강료 조회 / 상담 신청 폼 (2026-11-04 신설)
// 켈리스(코리아펫아카데미) `quickdb-wrap`·`consult-dialog` 의 Step1~4 흐름을 참고한 구조:
//   Step1 관심 학과 → Step2 세부 교육과정(중복) → Step3 희망 지역 → Step4 상담내용·방문일시·연락처
// 우리 사이트는 애견미용 단일 분야라 Step1을 "학과" 대신 "수강 목적"으로 대응시킴(기존에 쓰던 6항목 재사용).
// 켈리스의 문구·코드는 쓰지 않음 — 단계 구성과 인터랙션 패턴만 참고(저작권).
//
// 인라인판(홈 #consult 섹션)과 모달판(전역 상담모달)이 이 컴포넌트 하나를 공유한다.
// 이전에는 ConsultForm(단일 폼)과 ConsultModal(2단계 폼)이 서로 다른 폼을 따로 들고 있었음.

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { branches } from "@/lib/branches";
import { courses } from "@/lib/courses";
import { contactLinks } from "@/lib/contactLinks";
import { supabase } from "@/lib/supabase";
import ChannelButton from "./ChannelButton";
import PrivacyPolicyText from "./PrivacyPolicyText";

export type TuitionIntent = "consult" | "tuition";

const branchLabel = (b: (typeof branches)[number]) => `${b.name} 애견미용학원 (${b.region})`;
const currentBranch = branches.find((b) => b.isCurrent) ?? branches[0];
const defaultBranchLabel = branchLabel(currentBranch);

// Step1 — 수강 목적. 기존 ConsultModal에서 쓰던 6항목 그대로(검증된 항목, 새 주장 아님).
const PURPOSES = [
  { value: "cert", label: "📜 자격증" },
  { value: "job", label: "💼 취업" },
  { value: "startup", label: "🏪 창업" },
  { value: "hobby", label: "🐾 취미·반려견 케어" },
  { value: "student", label: "📚 중·고등반" },
  { value: "unsure", label: "🤔 고민 중" },
] as const;
const PURPOSE_LABEL: Record<string, string> = Object.fromEntries(PURPOSES.map((p) => [p.value, p.label]));

// Step3 — 희망 지역. branches의 region을 중복 제거해 칩으로 노출(현재 지점이 있는 대전을 맨 앞으로).
const REGIONS = (() => {
  const uniq = Array.from(new Set(branches.map((b) => b.region)));
  return [currentBranch.region, ...uniq.filter((r) => r !== currentBranch.region)];
})();

// Step4 — 방문 희망 시간. 켈리스와 동일한 09:00~22:00 매시 선택.
const VISIT_HOURS = Array.from({ length: 14 }, (_, i) => `${String(9 + i).padStart(2, "0")}:00`);

const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

const schema = z.object({
  purpose: z.string().min(1, "수강 목적을 선택해 주세요."),
  courseInterests: z.array(z.string()).min(1, "관심 과정을 하나 이상 선택해 주세요."),
  region: z.string().min(1, "희망 지역을 선택해 주세요."),
  branch: z.string().min(1, "희망 지점을 선택해 주세요."),
  inquiry: z.string().optional(),
  visitDate: z.string().optional(),
  visitTime: z.string().optional(),
  name: z.string().trim().min(2, "이름은 2자 이상 입력해 주세요."),
  phone: z.string().regex(phoneRegex, "올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)"),
  agree: z.boolean().refine((v) => v === true, { message: "개인정보 수집·이용에 동의해 주세요." }),
});
type FormValues = z.infer<typeof schema>;

const COPY: Record<TuitionIntent, { next: string; submit: string }> = {
  consult: { next: "다음 단계", submit: "상담 신청하기" },
  tuition: { next: "다음 단계", submit: "수강료 조회하기" },
};

const STEP_TITLES = [
  "Step 1. 수강 목적을 선택해 주세요.",
  "Step 2. 관심 있는 교육과정을 선택해 주세요. (중복 선택 가능)",
  "Step 3. 교육을 희망하시는 지역을 선택해 주세요.",
  "Step 4. 상담 내용과 연락처를 입력해 주세요.",
];

// 오늘 이전 날짜는 못 고르게 — 방문 예약이므로.
const todayISO = () => new Date().toISOString().slice(0, 10);

export default function TuitionSteps({
  intent = "consult",
  presetSlug,
  presetBranch,
  onSubmitted,
  onError,
}: {
  intent?: TuitionIntent;
  presetSlug?: string;
  presetBranch?: string;
  onSubmitted?: () => void;
  onError?: (message: string) => void;
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const copy = COPY[intent];
  const minDate = useMemo(todayISO, []);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      purpose: "",
      // 과정상세 CTA 등에서 특정 과정을 지정해 열었으면 그 과정을 미리 선택해 둠.
      courseInterests: presetSlug ? [presetSlug] : [],
      region: currentBranch.region,
      branch: presetBranch ?? defaultBranchLabel,
      inquiry: "",
      visitDate: "",
      visitTime: "",
      name: "",
      phone: "",
      agree: false,
    },
  });

  const purpose = watch("purpose");
  const courseInterests = watch("courseInterests");
  const region = watch("region");
  const visitDate = watch("visitDate");

  // 선택한 지역의 지점만 Step3 드롭다운에 노출.
  const regionBranches = branches.filter((b) => b.region === region);

  function toggleCourse(slug: string) {
    const next = courseInterests.includes(slug)
      ? courseInterests.filter((s) => s !== slug)
      : [...courseInterests, slug];
    setValue("courseInterests", next, { shouldValidate: true });
  }

  function pickRegion(r: string) {
    setValue("region", r, { shouldValidate: true });
    // 지역을 바꾸면 그 지역의 첫 지점으로 지점도 함께 갱신(불일치 상태 방지).
    const first = branches.find((b) => b.region === r);
    if (first) setValue("branch", branchLabel(first), { shouldValidate: true });
  }

  const STEP_FIELDS: (keyof FormValues)[][] = [["purpose"], ["courseInterests"], ["region", "branch"]];

  async function next() {
    const ok = await trigger(STEP_FIELDS[step - 1]);
    if (ok) setStep(step + 1);
  }

  async function onSubmit(values: FormValues) {
    if (!supabase) {
      onError?.("지금은 상담 신청을 접수할 수 없습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    // ponytail: 방문 희망일시는 전용 컬럼 없이 inquiry 본문에 붙여 보냄 — Supabase 마이그레이션 없이 동작.
    // 방문일시로 따로 필터·정렬할 일이 생기면 visit_date/visit_time 컬럼을 추가하고 이 부분만 바꾸면 됨.
    const visitNote =
      values.visitDate || values.visitTime
        ? `[방문 희망] ${values.visitDate || "날짜 미정"} ${values.visitTime || ""}`.trim()
        : "";
    const inquiry = [values.inquiry?.trim(), visitNote].filter(Boolean).join("\n") || null;

    const { error: dbError } = await supabase.from("consult_requests").insert({
      name: values.name,
      phone: values.phone,
      course_interests: values.courseInterests,
      branch_interest: values.branch,
      purpose: values.purpose,
      inquiry,
      source_page: intent === "tuition" ? "tuition-steps" : "consult-steps",
    });

    if (dbError) {
      onError?.("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setSubmitted(true);
    onSubmitted?.();
  }

  if (submitted) {
    return (
      <div className="tuition-done">
        <p className="tuition-done-title">
          {intent === "tuition" ? "🎉 수강료 조회 신청이 접수되었습니다." : "🎉 상담 신청이 완료되었습니다."}
        </p>
        <p className="tuition-done-sub">담당자가 확인 후 연락드리겠습니다. 급하시면 아래로 바로 연결해 보세요.</p>
        <div className="consult-success-channels">
          <ChannelButton channel="phone" value={contactLinks.phone} />
          <ChannelButton channel="kakao" value={contactLinks.kakaoUrl} />
          <ChannelButton channel="naver" value={contactLinks.naverUrl} />
        </div>
      </div>
    );
  }

  return (
    <form className="consult-form tuition-steps" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* 단계 표시 — 켈리스처럼 현재 단계를 또렷하게 */}
      <ol className="tuition-progress" aria-label={`전체 4단계 중 ${step}단계`}>
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className={n === step ? "active" : n < step ? "done" : ""} aria-current={n === step ? "step" : undefined}>
            <span className="tuition-progress-num">{n}</span>
          </li>
        ))}
      </ol>
      <p className="tuition-step-title">{STEP_TITLES[step - 1]}</p>

      <div className="consult-steps">
        {step === 1 && (
          <div key="s1" className="consult-step-pane">
            <div className="consult-purpose-grid">
              {PURPOSES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  className={`consult-purpose-btn${purpose === p.value ? " active" : ""}`}
                  aria-pressed={purpose === p.value}
                  onClick={() => setValue("purpose", p.value, { shouldValidate: true })}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {errors.purpose && <p className="field-error">{errors.purpose.message}</p>}
          </div>
        )}

        {step === 2 && (
          <div key="s2" className="consult-step-pane">
            <div className="tuition-course-grid">
              {courses.map((c) => {
                const on = courseInterests.includes(c.slug);
                return (
                  <button
                    key={c.slug}
                    type="button"
                    className={`tuition-course-btn${on ? " active" : ""}`}
                    aria-pressed={on}
                    onClick={() => toggleCourse(c.slug)}
                  >
                    <span className="tuition-course-badge">{c.badge}</span>
                    <span className="tuition-course-title">{c.title}</span>
                    <span className="tuition-course-sum">{c.recommendFor}</span>
                  </button>
                );
              })}
            </div>
            {errors.courseInterests && <p className="field-error">{errors.courseInterests.message}</p>}
          </div>
        )}

        {step === 3 && (
          <div key="s3" className="consult-step-pane">
            <div className="tuition-region-chips">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`tuition-region-chip${region === r ? " active" : ""}`}
                  aria-pressed={region === r}
                  onClick={() => pickRegion(r)}
                >
                  {r}
                  {r === currentBranch.region ? " (현재 지점)" : ""}
                </button>
              ))}
            </div>
            <div className="field">
              <label htmlFor="t-branch">희망 지점</label>
              <select id="t-branch" className="field-input" {...register("branch")}>
                {regionBranches.map((b) => (
                  <option key={b.name} value={branchLabel(b)}>
                    {branchLabel(b)}
                    {b.isCurrent ? " · 지금 보고 계신 지점" : ""}
                  </option>
                ))}
              </select>
              {errors.branch && <p className="field-error">{errors.branch.message}</p>}
            </div>
            {errors.region && <p className="field-error">{errors.region.message}</p>}
          </div>
        )}

        {step === 4 && (
          <div key="s4" className="consult-step-pane">
            <p className="tuition-recap">
              {PURPOSE_LABEL[purpose]} · 관심 과정 {courseInterests.length}개 · {region}
            </p>

            <div className="field">
              <label htmlFor="t-inquiry">상담 내용 (선택)</label>
              <textarea
                id="t-inquiry"
                className="field-input"
                rows={3}
                placeholder="궁금한 점을 자유롭게 남겨주세요"
                {...register("inquiry")}
              />
            </div>

            {/* 방문 예약 — 켈리스는 jQuery UI 달력을 썼지만 네이티브 input[type=date]로 충분(접근성·모바일 기본 UI). */}
            <div className="tuition-visit-row">
              <div className="field">
                <label htmlFor="t-date">방문 희망 날짜 (선택)</label>
                <input id="t-date" className="field-input" type="date" min={minDate} {...register("visitDate")} />
              </div>
              <div className="field">
                <label htmlFor="t-time">방문 희망 시간 (선택)</label>
                <select id="t-time" className="field-input" {...register("visitTime")} disabled={!visitDate}>
                  <option value="">{visitDate ? "시간 선택" : "날짜를 먼저 선택"}</option>
                  {VISIT_HOURS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="tuition-visit-row">
              <div className="field">
                <label htmlFor="t-name">이름</label>
                <input id="t-name" className="field-input" placeholder="이름을 입력해 주세요" {...register("name")} />
                {errors.name && <p className="field-error">{errors.name.message}</p>}
              </div>
              <div className="field">
                <label htmlFor="t-phone">연락처</label>
                <input
                  id="t-phone"
                  className="field-input"
                  type="tel"
                  placeholder="010-0000-0000"
                  maxLength={13}
                  {...register("phone", {
                    onChange: (e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
                    },
                  })}
                />
                {errors.phone && <p className="field-error">{errors.phone.message}</p>}
              </div>
            </div>

            <label className="agree">
              <input type="checkbox" {...register("agree")} />
              개인정보 수집·이용에 동의합니다. (
              <button type="button" className="consult-privacy-toggle" onClick={() => setShowPrivacy((v) => !v)}>
                {showPrivacy ? "접기" : "개인정보처리방침 보기"}
              </button>
              )
            </label>
            {showPrivacy && (
              <div className="consult-privacy-embed policy">
                <PrivacyPolicyText />
              </div>
            )}
            {errors.agree && <p className="field-error">{errors.agree.message}</p>}
          </div>
        )}
      </div>

      <div className="consult-step-actions">
        {step > 1 && (
          <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>
            ← 이전
          </button>
        )}
        {step < 4 ? (
          <button type="button" className="btn btn-primary btn-lg" onClick={next}>
            {copy.next}
          </button>
        ) : (
          <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
            {isSubmitting ? "접수 중..." : copy.submit}
          </button>
        )}
      </div>
    </form>
  );
}
