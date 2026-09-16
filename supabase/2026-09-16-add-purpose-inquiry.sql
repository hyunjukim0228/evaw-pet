-- STEP8: 상담모달 2-STEP 플로우 — 수강목적(purpose)·문의사항(inquiry) 컬럼 추가.
-- Supabase 대시보드 > SQL Editor 에서 schema.sql 실행 이후, 이 파일을 그대로 실행하세요.

alter table consult_requests
  add column if not exists purpose text,     -- STEP1에서 고른 수강목적 값 (예: "cert","job","startup","hobby","student","unsure")
  add column if not exists inquiry text;     -- STEP2 "문의사항(선택)" 자유 입력
