"use client";

import type { Branch } from "@/lib/branches";
import { useConsultModal } from "./ConsultModalContext";

/** 클릭하면 그 지점을 "관심 지점"으로 담아 상담 모달이 열리는 지점 카드.
    2026-09-16: 현재 지점 강조(빨간 테두리+뱃지)를 걷어내고 은은한 텍스트 표시만 남김(사용자 요청). */
export default function BranchCard({ branch }: { branch: Branch }) {
  const { open } = useConsultModal();

  return (
    <button
      type="button"
      className="branch-card"
      onClick={() => open({ branchName: `${branch.name} 애견미용학원 (${branch.region})` })}
    >
      <span className="branch-region">{branch.region}</span>
      <b className="branch-name">
        {branch.name} 애견미용학원
        {branch.isCurrent && <span className="branch-current-mark">· 현재 지점</span>}
      </b>
      <p className="branch-addr">{branch.address}</p>
      <span className="branch-inquire-hint">이 지점 문의하기 →</span>
    </button>
  );
}
