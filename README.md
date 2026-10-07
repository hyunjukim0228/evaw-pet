# 애견미용학원 대전점 홈페이지 (evawacademy.com)

> **인수인계 문서** — 2026-10-07 기준. 이 저장소를 처음 받은 사람이 이 파일 하나만 읽고 수정·배포까지 할 수 있도록 정리했습니다.
> 사람이든 AI(Claude Code 등)든 작업 전에 이 문서를 먼저 읽어주세요.

| 항목 | 값 |
|---|---|
| 실제 사이트 | https://evawacademy.com (www 포함), https://evaw-pet.vercel.app |
| 저장소 | https://github.com/hyunjukim0228/evaw-pet (branch `main`) |
| 호스팅 | Vercel 프로젝트 `evaw-pet` (team `evaw1`) — **`main`에 push하면 자동 배포** |
| 상담폼 DB | Supabase 프로젝트 `cabdouqmzzarroblzepl` |
| 상담 알림 | 텔레그램 봇 `@ibawpet_hj_bot` |
| 사이트 소유자 | 김현주 |

---

## 1. 시작하기

```bash
git clone https://github.com/hyunjukim0228/evaw-pet.git
cd evaw-pet
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포 전 반드시 통과 확인 (결과물: out/)
```

- Node 20 이상.
- 환경변수는 `.env.production`에 이미 커밋돼 있어 따로 설정하지 않아도 빌드됩니다(아래 4장 참고).

## 2. 배포

1. 수정 → `npm run build` 통과 확인
2. 바꾼 파일만 골라서 `git add <파일>` (`git add -A`는 쓰지 마세요. `.env.local` 같은 로컬 파일이 섞여 올라갈 수 있습니다)
3. `git commit` → `git push origin main`
4. 1분 안팎 뒤 Vercel이 자동 배포 → 사이트에서 확인 (안 보이면 Ctrl+F5)

주의
- 배포 확인은 **브라우저로 한두 번**만 하세요. `curl` 등으로 짧은 간격으로 반복 요청하면 Vercel 봇 차단(Security Checkpoint)에 걸려 일반 방문자까지 403이 뜰 수 있습니다(실제 발생 이력 있음).
- 배포 실패·환경변수·도메인 설정은 Vercel 대시보드에서 봅니다. 접근 권한이 없으면 사이트 소유자에게 요청하세요.

## 3. 기술 스택과 구조

- **Next.js 16 (App Router) + React 19 + TypeScript**, `next.config.ts`에서 `output: "export"` → **순수 정적 사이트**입니다.
  - 서버 기능(API 라우트, 서버 액션, 이미지 최적화 서버)은 **쓸 수 없습니다.** 서버 로직이 필요하면 Supabase 같은 외부 서비스를 써야 합니다.
  - Next 16은 예전 버전과 API가 다릅니다(예: 동적 라우트 `params`가 Promise → `await params`). `AGENTS.md` 참고.
- 스타일: `app/globals.css` 한 파일(Tailwind 없음). Airbnb 스타일 토큰 — 강조색 `#ff385c`(`--primary`), 카드 라운드 14px, 버튼 8px, 폰트 Inter(영문) + Noto Sans KR(한글). 새 컴포넌트는 기존 클래스(`.wrap` `.sec-tag` `.sec-title` `.sec-sub` `.btn` `.btn-primary` `.btn-outline` 등)를 먼저 재사용하세요.
- 주요 라이브러리: Swiper(배너), Radix Dialog(모달), react-hook-form + zod(상담폼), @supabase/supabase-js.

### 무엇을 고치려면 어디를 여나

| 고칠 것 | 파일 |
|---|---|
| 홈 화면 섹션 순서·문구 | `app/page.tsx` |
| 메인 배너 이미지 | `public/images/hero/hero-N-pc.webp`(1920×850) / `hero-N-mo.webp`, 목록은 `components/HeroCarousel.tsx` |
| 히어로 아래 퀵메뉴 4칸 | `components/QuickCourseNav.tsx` |
| 헤더 아래 상시 메뉴 바 | `components/QuickMenu.tsx` |
| 과정(커리큘럼) 내용 | `lib/courses.ts` (목록·상세 페이지·팝업 전부 여기서 나옴) |
| FAQ | `lib/faq.ts` |
| 지점 목록 | `lib/branches.ts` |
| 후기 / 가이드 / 새소식 | `lib/reviews.ts` / `lib/guides.ts` / `lib/news.ts` |
| 전화·카톡·네이버 문의 링크 | `lib/contactLinks.ts` |
| 푸터(사업자 정보·링크) | `components/Footer.tsx` |
| 개인정보처리방침 본문 | `components/PrivacyPolicyText.tsx` (`/privacy` 페이지와 상담 모달이 함께 씀) |
| 상담 모달 / 홈 하단 상담폼 | `components/ConsultModal.tsx` / `components/ConsultForm.tsx` |
| 중간중간 CTA 띠 | `components/CtaBanner.tsx` |
| 색·여백·폰트 | `app/globals.css` 상단 `:root` |
| 검색엔진(네이버 소유확인 메타·제목·설명) | `app/layout.tsx`, `app/sitemap.ts`, `public/robots.txt` |

페이지: `/` 홈, `/about` 학원소개, `/curriculum` 과정 목록, `/curriculum/[slug]` 과정 상세, `/guide` 가이드, `/branches` 전국 지점, `/privacy` 개인정보처리방침.

## 4. 상담폼 (Supabase + 텔레그램)

```
방문자 상담 신청 → 브라우저가 Supabase consult_requests 테이블에 직접 insert
                → DB 트리거(pg_net)가 텔레그램 봇으로 알림 전송
```

- 연결값: `.env.production`의 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  - anon(공개) 키는 브라우저에 노출되도록 **설계된 값**이라 커밋돼 있어도 괜찮습니다. RLS로 **insert만** 허용돼 있어 이 키로는 신청 내역을 조회·수정·삭제할 수 없습니다.
  - **`service_role` 키는 절대 저장소·코드·채팅에 넣지 마세요.**
- 테이블·RLS·트리거 SQL과 설정 절차: `supabase/README.md`, `supabase/*.sql`.
  - `telegram-notify.sql`의 봇 토큰·chat_id는 `REPLACE_WITH_...` 자리표시자입니다. 실제 값은 Supabase SQL Editor 안에만 있습니다.
- 상담 신청 내역 보기: Supabase 대시보드 → Table Editor → `consult_requests` (Supabase 멤버 권한 필요).
- 알림 받는 사람을 바꾸려면: 새 담당자가 봇에게 메시지 1회 → chat_id 확인 → 트리거 함수의 chat_id 수정(`supabase/README.md` 2장).
- 폼 입력 항목을 바꾸면 **DB 컬럼도 같이** 추가해야 합니다. 없는 컬럼에 insert하면 상담 신청이 실패합니다.

## 5. 확정된 사실·규칙 (임의로 바꾸지 말 것)

- **표기**: 사이트명 "애견미용학원 대전점", 푸터 학원명 "애견미용학원대전점", 사이트 소유자 김현주.
- **사업자 정보**(푸터): 대표 김명자 · 사업자등록번호 211-87-42130 · 대전광역시 서구 대덕대로 182 10층 · 010-4347-7645 · sbshyunduu@naver.com.
- **지점 수는 "전국 21개"**(2026-10-07 소유자 확정). 단 `lib/branches.ts` 목록에는 아직 21개가 다 들어 있지 않습니다.
- 같은 사업자(이바우펫/EVAW)가 전국 지점을 직영합니다. 콘텐츠·브랜드 기준 사이트는 evaw-pet-grooming.co.kr, 구조·배치 레퍼런스는 g-sa.kelispetacademy.com입니다.
- **EVAW 로고·문구가 들어간 배너 이미지는 사용하기로 소유자가 확정**했습니다(사이트명은 그대로 유지).
- **새 이미지를 받으면 반드시 이미지 안의 내용(브랜드·문구·수상 표기)을 눈으로 확인한 뒤 넣으세요.** 크기만 보고 넣었다가 타사 문구가 그대로 노출될 뻔한 이력이 있습니다. 넣을 때는 WebP로 변환해 `public/images/` 아래에 둡니다.
- 전화번호·수강료·지점 수·자격증 체계 같은 **수치·사실은 추측으로 채우지 말고** 소유자에게 확인하세요.
- **홈 섹션 순서**(2026-10-07 소유자 지정): 히어로 → 가정견미용 → 학원소개(선택 체크리스트) → 이바우펫 현장스토리 → 커리큘럼 → 왜 이바우펫 → 장학지원 → 분야별 특강 → 상담폼 → (강사진·후기·FAQ·새소식·가이드·오시는길·전국지점).

## 6. 남은 일 / 미확정 항목

- [ ] 자격증·실견수업 가로 배너 이미지(1885×834)를 받았지만 위치가 정해지지 않아 미사용
- [ ] 장학지원 이미지가 메인 배너 1번과 히어로 오른쪽 칸에 **중복** 노출 중. 오른쪽 칸을 다른 사진으로 바꿀지 결정 필요
- [ ] 커리큘럼 6과정은 **초안 문구**(화면에 "초안 예시" 안내문 노출 중). 실제 과정명·기간·수강료 확정 후 `lib/courses.ts` 교체, 안내문 삭제
- [ ] 로고 미수령 → 헤더는 텍스트 로고. 받으면 `components/Header.tsx` 교체
- [ ] 상담폼 동의 문구 옆 `[약관 내용 확정 필요]` 표시(`components/ConsultForm.tsx`)
- [ ] 푸터 "시간표"·"인스타그램" 링크 없음, 주소 지번 "(둔산동 1160)" 확인 표시
- [ ] 오시는길 지도·주차·대중교통 안내 미추가
- [ ] 새소식은 카드 구조만 있음(`lib/news.ts`)
- [ ] `lib/branches.ts`를 21개 지점 실데이터로 보강

> 화면에서 빨간 굵은 글씨(`className="tbd"`)로 보이는 부분은 전부 "아직 확정 안 됨" 표시입니다. `grep -rn 'className="tbd"' app components`로 한 번에 찾을 수 있습니다.

## 7. 인수인계 체크리스트 (넘겨주는 쪽이 할 일)

- [ ] GitHub: 저장소 Settings → Collaborators → 받는 사람 초대(Write 이상), 또는 Transfer ownership
- [ ] Vercel: 프로젝트 멤버 초대(팀 플랜 필요) 또는 프로젝트 Transfer — 권한이 없어도 push하면 배포는 됩니다
- [ ] Supabase: 프로젝트 멤버 초대(상담 내역 확인·DB 수정용)
- [ ] 텔레그램: 상담 알림 받을 사람 정하기(필요하면 chat_id 추가·변경)
- [ ] 도메인(evawacademy.com) 구매처 계정: DNS를 바꿀 일이 있을 때만 공유

## 8. 이력 요약

- 2026-09-11 기획(요구사항정의서) → 정적 HTML 초안 → Next.js 16 다중 페이지로 재구축
- 2026-09-14~15 상담폼 Supabase 연동, 텔레그램 알림, Vercel 배포, 커스텀 도메인 연결
- 2026-09-16~18 레퍼런스 구조(퀵메뉴·상담모달·차이점·후기·가이드·FAQ) 반영
- 2026-09-20 개인정보처리방침 페이지, 운영등록증·배상책임보험약관 링크
- 2026-10-07 소유자 Word 메모대로 홈 재구성(섹션 순서·문구·장학지원 섹션), 메인 배너 1번·가정견 이미지 교체, 푸터 정보 수정, 전국 21개

상세 작업 기록은 기존 작업자의 Obsidian 노트(`AI-Sessions/wiki/projects/홈페이지만들기.md`)에 있습니다. 필요하면 요청하세요.
