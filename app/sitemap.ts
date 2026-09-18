import type { MetadataRoute } from "next";
import { courses } from "@/lib/courses";

// 2026-09-18: 네이버 서치어드바이저 등록용 사이트맵. Next.js sitemap.ts 컨벤션 — 정적 export 빌드 시
// /sitemap.xml로 그대로 생성됨(app/icon.png 등과 같은 방식, 빌드 시점 1회 생성). courses.ts에 과정이
// 추가/삭제되면 이 파일 수정 없이 자동으로 반영(courses 배열을 그대로 순회).
const BASE_URL = "https://www.evawacademy.com";

// output:"export"(정적 export)에서는 이 라우트가 정적으로 고정된다는 걸 명시해야 빌드됨.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/curriculum`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...courses.map((c) => ({
      url: `${BASE_URL}/curriculum/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${BASE_URL}/branches`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
}
