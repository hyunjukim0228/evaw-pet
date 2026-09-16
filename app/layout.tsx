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
import MobileCtaBar from "@/components/MobileCtaBar";
import QuickMenu from "@/components/QuickMenu";
import ConsultModal from "@/components/ConsultModal";
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

export const metadata: Metadata = {
  title: "애견미용학원 대전점 | 자격증·실습 과정 안내",
  description:
    "애견미용학원 대전점 — 자격증 3급·2급, 실견 실습 중심 애견미용 과정 안내. 상담 신청은 지금 바로 문의해 주세요.",
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
          <FloatingCta />
          <MobileCtaBar />
          <ScrollTopButton />
          <ConsultModal />
          <ScrollReveal />
        </ConsultModalProvider>
      </body>
    </html>
  );
}
