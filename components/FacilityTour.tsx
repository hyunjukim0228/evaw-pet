"use client";

// 시설 둘러보기 (2026-11-04 신설) — 켈리스 `main-fac`(공간별 카드) 구조 참고.
//
// ⚠️ 중요: 켈리스는 로비·뷰티강의장·쿠킹강의장·테라스·락커룸으로 나눠 소개하지만,
// 우리가 가진 사진(public/images/gallery/*.jpg 16장)을 2026-11-04에 직접 열어 확인한 결과
// 그런 공간 구분 사진은 없고 전부 "실습 현장 / 완성컷" 사진이었다.
// 없는 시설을 라벨로 주장하지 않기 위해, 사진에서 실제로 확인되는 공간만 카드로 만든다.
// 공간이 추가로 확인되면(또는 실제 시설 사진을 받으면) 아래 SPACES에 항목만 더하면 된다.
//
// 각 항목의 photo는 그 설명을 실제로 보여주는 사진으로 직접 확인해 배정한 것:
//  - facility-6  : 전동/접이식 미용 테이블이 줄지어 있고 위그가 선반에 비치된 넓은 강의장
//  - facility-2  : 위그(연습용 모형)로 가위 컷을 연습하는 장면
//  - facility-1  : 실제 가정견을 미용 테이블에 올려 작업하는 장면
//  - facility-10 : 배경천·소품을 갖춘 완성컷 촬영 공간

import Image from "next/image";

const SPACES = [
  {
    photo: "/images/gallery/facility-6.jpg",
    title: "미용 실습 강의장",
    desc: "미용 테이블이 줄지어 놓인 실습 강의장입니다. 자리마다 따로 작업하며 수업이 진행됩니다.",
    alt: "애견미용학원 미용 실습 강의장 — 미용 테이블이 줄지어 놓이고 선반에 위그가 비치된 넓은 실습 공간",
  },
  {
    photo: "/images/gallery/facility-2.jpg",
    title: "위그 연습 공간",
    desc: "실견에 들어가기 전, 위그(연습용 모형)로 가위 컷을 반복해서 연습합니다.",
    alt: "애견미용학원 위그 연습 — 미용 테이블 위 흰 위그를 가위로 커트하는 모습",
  },
  {
    photo: "/images/gallery/facility-1.jpg",
    title: "실견 미용 실습",
    desc: "실제 가정견을 미용 테이블에 올려 상담부터 인계까지 현장 그대로 실습합니다.",
    alt: "애견미용학원 실견 실습 — 미용 테이블 위 가정견과 가위·빗 등 미용 도구",
  },
  {
    photo: "/images/gallery/facility-10.jpg",
    title: "완성컷 촬영 공간",
    desc: "미용을 마친 강아지의 완성컷을 배경천과 소품을 두고 촬영합니다.",
    alt: "애견미용학원 완성컷 촬영 공간 — 숲 배경천과 꽃·과일 소품 앞에 앉은 미용 완료된 비숑",
  },
];

export default function FacilityTour() {
  return (
    <ul className="facility-grid">
      {SPACES.map((s) => (
        <li key={s.title} className="facility-card">
          <div className="facility-photo">
            <Image src={s.photo} alt={s.alt} fill sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="facility-body">
            <h3 className="facility-title">{s.title}</h3>
            <p className="facility-desc">{s.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
