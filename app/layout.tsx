import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import QuickSideBar from "@/components/QuickSideBar"; // 2026-11-04 켈리스 우측 세로 퀵바 대응(넓은 화면 전용)
import MobileCtaBar from "@/components/MobileCtaBar";
import QuickMenu from "@/components/QuickMenu";
import ConsultModal from "@/components/ConsultModal";
import EventPopup from "@/components/EventPopup";
import ScrollTopButton from "@/components/ScrollTopButton";
import ScrollReveal from "@/components/ScrollReveal";
import { ConsultModalProvider } from "@/components/ConsultModalContext";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
});

// 디자인 시스템(Airbnb 톤) 지정 폰트가 Cereal(라이선스 폰트)라 대체 권고인 Inter 사용.
// 한글은 Inter에 글리프가 없어 자동으로 Noto Sans KR로 폴백 — 숫자·영문만 Inter, 한글은 그대로.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const siteTitle = "애견미용학원 자격증 가정견실습 과정 장학지원신청";
const siteDescription =
  "애견미용학원 대전점 — 자격증 3급·2급, 실견 실습 중심 애견미용 과정 안내. 상담 신청은 지금 바로 문의해 주세요.";

export const metadata: Metadata = {
  metadataBase: new URL("https://evawacademy.com"),
  title: siteTitle,
  description: siteDescription,
  // 2026-10-15: og:image가 없으면 카톡·네이버가 페이지 사진을 임의로 골라 썸네일이 바뀜 → 고정 배너 사용.
  // 카톡 호환 위해 webp 대신 jpg. 2026-11-04: 겨울 수강혜택 배너로 교체(1200x630 권장 규격).
  // ⚠️ "26년 마지막 수강혜택" 문구가 박혀 있어 2027년에는 교체 필요.
  openGraph: {
    type: "website",
    siteName: "애견미용학원 대전점",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "이바우펫 애견미용학원 — 26년 마지막 수강혜택: 수강비지원 50%, 미용도구 풀세트, 온라인 강의, 무료 특강",
      },
    ],
  },
  // 2026-09-18: 네이버 서치어드바이저 사이트 소유확인용(사용자 제공 토큰) — Next Metadata API의
  // verification.other가 <meta name="naver-site-verification" content="..."> 로 그대로 렌더됨.
  verification: {
    other: {
      "naver-site-verification": "a0064416c6fa3f5146f6f0920a75e93cbbbaffc8",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKr.variable}`}>
      <body>
        <ConsultModalProvider>
          <Header />
          <QuickMenu />
          {children}
          <Footer />
          <QuickSideBar />
          <FloatingCta />
          <MobileCtaBar />
          <ScrollTopButton />
          <ConsultModal />
          <EventPopup />
          <ScrollReveal />
        </ConsultModalProvider>
      </body>
    </html>
  );
}
