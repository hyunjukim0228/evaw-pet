# Supabase 연동 설정 (상담 신청 폼)

이 사이트는 정적 export(`output:"export"`)라 서버가 없습니다. 상담 신청 폼(홈 하단, 상담 모달)은
브라우저에서 Supabase에 **직접** 데이터를 저장하고, 저장되는 순간 텔레그램으로 알림이 오도록 구성합니다.

프로젝트: https://cabdouqmzzarroblzepl.supabase.co

## 1. 테이블 만들기

Supabase 대시보드 → SQL Editor → `schema.sql` 내용을 그대로 붙여넣고 실행.

### 1-1. 컬럼 추가 마이그레이션 (실행 안 하면 상담폼이 깨짐)

- `2026-09-16-add-purpose-inquiry.sql` — 상담모달 2-STEP 개편(수강목적 선택·문의사항 입력 추가)으로
  `purpose`·`inquiry` 컬럼이 필요합니다. **이 파일을 SQL Editor에서 실행하기 전까지는 실제 상담 신청 제출이
  Supabase insert 에러로 실패**합니다(테이블에 없는 컬럼을 insert하려 하기 때문). 배포 전 반드시 실행하세요.

## 2. 텔레그램 알림 연결

1. 텔레그램 앱에서 `@BotFather` 검색 → `/newbot` → 이름 정하면 **봇 토큰**을 줍니다 (숫자:영문 조합).
2. 방금 만든 봇에게 텔레그램으로 아무 메시지나 한 번 보냅니다 (봇과 대화를 시작해야 chat_id를 알 수 있음).
3. 브라우저에서 `https://api.telegram.org/bot<봇토큰>/getUpdates` 접속 → 응답 JSON에서 `"chat":{"id": 숫자}` 값을 복사 (이게 **chat_id**).
4. `telegram-notify.sql`을 열어 `REPLACE_WITH_BOT_TOKEN`, `REPLACE_WITH_CHAT_ID` 두 자리를 방금 값으로 채운 뒤, SQL Editor에서 실행.
5. 파일 맨 아래 주석의 테스트 insert문 주석을 풀고 한 번 실행해서 텔레그램으로 알림이 오는지 확인.

## 3. 사이트에 연결 키 넣기 (anon key)

1. Supabase 대시보드 → Project Settings → API → **anon / public** key 복사 (service_role 키 절대 아님 — 그건 공개되면 안 됨).
2. `site/.env.example`을 `site/.env.local`로 복사하고 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 붙여넣기.
3. 로컬 확인: `npm run dev` → 상담 폼 제출 → Supabase Table Editor에서 행 생성 확인 + 텔레그램 알림 확인.
4. **배포본(Vercel)에도 반드시 등록**: Vercel 대시보드 → 이 프로젝트 → Settings → Environment Variables 에
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 두 개를 동일하게 추가 → 재배포.
   (정적 export라 이 값들은 빌드 시점에 파일에 박혀 들어갑니다 — 값 바뀌면 재배포 필요.)

## 보안 메모

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`는 브라우저 코드에 그대로 노출됩니다 — 이건 정상입니다(Supabase가 그렇게 설계됨).
  안전한 이유는 `schema.sql`에서 Row Level Security를 켜고 **insert만** 허용했기 때문 — 이 anon key로는
  다른 사람의 상담 신청 내역을 조회·수정·삭제할 수 없습니다.
- 텔레그램 봇 토큰은 `telegram-notify.sql` 안의 데이터베이스 함수에 저장됩니다 — 이건 SQL Editor 접근 권한이
  있는 프로젝트 소유자만 볼 수 있고, 사이트 코드(클라이언트)에는 전혀 노출되지 않습니다.
