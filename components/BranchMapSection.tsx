"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import BranchCard from "./BranchCard";
import BranchMarquee from "./BranchMarquee";
import { branches } from "@/lib/branches";

// 2026-09-16 스펙: 지점 필터 탭(전체/서울경기·인천/충청대전/경상대구·부산/전라광주) + framer-motion layout 애니메이션.
// 지역 그룹핑은 lib/branches.ts의 실제 region 값(서울/경기/인천/대전/충남/대구/부산/경남/광주)을 4개 권역으로 묶음.
// 탭 라벨의 "·인천"/"·부산"은 표시 텍스트일 뿐, 그룹핑 로직(regionGroup)은 그대로 서울/경기 쪽·경상/대구 쪽에 포함.
const TABS = ["전체", "서울/경기·인천", "충청/대전", "경상/대구·부산", "전라/광주"] as const;
type Tab = (typeof TABS)[number];

function regionGroup(region: string): Exclude<Tab, "전체"> {
  if (region === "서울" || region === "경기" || region === "인천") return "서울/경기·인천";
  if (region === "대전" || region === "충남") return "충청/대전";
  if (region === "대구" || region === "부산" || region === "경남") return "경상/대구·부산";
  return "전라/광주";
}

export default function BranchMapSection() {
  const [tab, setTab] = useState<Tab>("전체");
  const reduceMotion = useReducedMotion();
  const filtered = tab === "전체" ? branches : branches.filter((b) => regionGroup(b.region) === tab);

  return (
    <div>
      <BranchMarquee />
      <div className="branch-tabs" role="tablist" aria-label="지역 필터">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={`branch-tab${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <motion.div layout={!reduceMotion} className="branch-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((b) => (
            <motion.div
              key={b.region + b.name}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
            >
              <BranchCard branch={b} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
