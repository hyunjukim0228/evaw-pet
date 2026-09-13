// 전국 지점 안내 — evaw-pet-grooming.co.kr/branches/ 확인(2026-09-13) 기준 실제 운영 지점 18곳 + 오픈예정 1곳.
// 우리 지점(대전)이 이 네트워크의 하나임을 보여주는 신뢰 요소로 사용.
export type Branch = {
  region: string;
  name: string;
  address: string;
  isCurrent?: boolean; // 지금 이 사이트가 소개하는 지점(대전)
};

export const branches: Branch[] = [
  { region: "서울", name: "신림", address: "서울특별시 관악구 남부순환로 1630 2층" },
  { region: "서울", name: "노원", address: "서울특별시 노원구 상계로3길 21 5층 501호" },
  { region: "서울", name: "종로", address: "서울특별시 종로구 삼일대로17길 51 스타골드빌딩 3층" },
  { region: "서울", name: "천호", address: "서울특별시 강동구 천호대로 1037 10층" },
  { region: "서울", name: "강남", address: "서울특별시 강남구 선릉로86길 39 서영빌딩 5층" },
  { region: "경기", name: "분당", address: "경기도 성남시 분당구 백현로101번길 13 5층" },
  { region: "경기", name: "일산", address: "경기도 고양시 일산동구 정발산로 47 웅신아트 5층" },
  { region: "경기", name: "부천", address: "경기도 부천시 원미구 부일로 496" },
  { region: "경기", name: "평택", address: "경기도 평택시 중앙2로 16 2층" },
  { region: "경기", name: "수원", address: "경기도 수원시 팔달구 덕영대로 905 1101호, 1106호" },
  { region: "인천", name: "인천", address: "인천광역시 남동구 인하로 501 8층" },
  { region: "대전", name: "대전", address: "대전광역시 서구 대덕대로 182 10층", isCurrent: true },
  { region: "대구", name: "반월당", address: "대구광역시 중구 달구벌대로 2118 예미안타워빌딩 7층" },
  { region: "대구", name: "대구", address: "대구광역시 동구 동대구로 525-1 3층" },
  { region: "부산", name: "서면", address: "부산광역시 부산진구 중앙대로 711 3층" },
  { region: "부산", name: "연산", address: "부산광역시 연제구 월드컵대로 141 동화빌딩 10층" },
  { region: "경남", name: "창원", address: "경상남도 창원시 성산구 원이대로 652 7층" },
  { region: "충남", name: "천안", address: "충청남도 천안시 동남구 만남로 30 로얄빌딩 5층" },
  { region: "광주", name: "광주", address: "광주광역시 서구 상무중앙로 7 10층" },
];
