-- 상담 신청이 들어올 때마다 텔레그램으로 알림 보내기
-- schema.sql을 먼저 실행한 뒤, 이 파일을 Supabase 대시보드 > SQL Editor 에서 실행하세요.
--
-- 실행 전에 아래 두 값을 먼저 준비해서 v_bot_token / v_chat_id 자리에 채워 넣으세요:
--   1) 봇 토큰: 텔레그램에서 @BotFather 검색 → /newbot → 이름 정하면 토큰(숫자:영문 조합) 받음
--   2) chat_id: 방금 만든 봇에게 텔레그램으로 아무 메시지나 한 번 보낸 뒤,
--      브라우저에서 https://api.telegram.org/bot<봇토큰>/getUpdates 접속 →
--      응답 JSON에서 "chat":{"id": 이 숫자} 를 복사

create extension if not exists pg_net with schema extensions;

create or replace function notify_telegram_on_consult_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_bot_token text := 'REPLACE_WITH_BOT_TOKEN';   -- 예: 123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  v_chat_id   text := 'REPLACE_WITH_CHAT_ID';     -- 예: 123456789
  v_message   text;
begin
  v_message := format(
    E'🐶 새 상담 신청\n이름: %s\n연락처: %s\n관심 과정: %s\n관심 지점: %s\n신청 화면: %s',
    new.name,
    new.phone,
    nullif(array_to_string(new.course_interests, ', '), ''),
    coalesce(new.branch_interest, '없음'),
    coalesce(new.source_page, '-')
  );

  perform net.http_post(
    url := format('https://api.telegram.org/bot%s/sendMessage', v_bot_token),
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object('chat_id', v_chat_id, 'text', v_message)
  );

  return new;
end;
$$;

drop trigger if exists trg_notify_telegram_on_consult_request on consult_requests;
create trigger trg_notify_telegram_on_consult_request
  after insert on consult_requests
  for each row
  execute function notify_telegram_on_consult_request();

-- 확인: 아래로 테스트 행을 하나 넣어보면 텔레그램으로 알림이 오는지 바로 확인 가능합니다.
-- insert into consult_requests (name, phone, source_page) values ('테스트', '010-0000-0000', 'sql-test');
