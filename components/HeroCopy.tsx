"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

// 히어로 텍스트 순차(stagger) 등장 — 2026-09-16 스펙: initial{opacity:0,y:30}→animate{opacity:1,y:0} 순차.
// prefers-reduced-motion이면 이동 없이 즉시 나타남(스펙 요구사항).
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function HeroCopy() {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
      };

  return (
    <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
      <motion.p variants={item} className="eyebrow hero-badge">
        📍 대전 · 애견미용학원
      </motion.p>
      <motion.h1 variants={item}>
        처음 배우는 애견미용,
        <br />
        <em>자격증부터 실전 실습까지</em>
      </motion.h1>
      <motion.p variants={item} className="lead">
        애견미용학원 대전점에서 기초부터 차근차근 시작하세요.
      </motion.p>
      <motion.div variants={item}>
        <Link href="#consult" className="btn btn-primary btn-lg">
          🎓 무료 상담 신청하기
        </Link>
      </motion.div>
    </motion.div>
  );
}
