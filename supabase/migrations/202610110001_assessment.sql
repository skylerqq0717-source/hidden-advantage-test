begin;

-- All records stay outside the exposed public API schema.
create schema if not exists advantage_private;
revoke all on schema advantage_private from public, anon, authenticated;

create table advantage_private.access_codes (
  id uuid primary key default gen_random_uuid(),
  code_hash text not null unique,
  uses smallint not null default 0 check (uses between 0 and 3),
  active boolean not null default true,
  label text not null default '',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
create table advantage_private.attempts (
  id uuid primary key,
  code_id uuid not null references advantage_private.access_codes(id),
  token_hash text not null,
  created_at timestamptz not null default now()
);
create index attempts_code_id_idx on advantage_private.attempts(code_id);
create table advantage_private.results (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null unique references advantage_private.attempts(id),
  scores jsonb not null,
  version integer not null default 1 check (version = 1),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table advantage_private.access_codes enable row level security;
alter table advantage_private.attempts enable row level security;
alter table advantage_private.results enable row level security;
revoke all on all tables in schema advantage_private from public, anon, authenticated;

create function advantage_private.hash_value(p_value text)
returns text language sql immutable strict set search_path = '' as $$
  select encode(sha256(convert_to(p_value, 'UTF8')), 'hex');
$$;

-- Run from the owner's SQL editor. Plaintext codes are returned only once.
create function advantage_private.issue_codes(p_quantity integer, p_label text default '')
returns table(code_id uuid, code text)
language plpgsql security definer set search_path = '' as $$
declare v_code text; v_id uuid;
begin
  if p_quantity is null or p_quantity < 1 or p_quantity > 1000 or length(p_label) > 200 then
    raise exception 'Invalid code batch';
  end if;
  for i in 1..p_quantity loop
    v_code := 'HA-' || upper(replace(gen_random_uuid()::text, '-', ''));
    insert into advantage_private.access_codes(code_hash, label)
    values (advantage_private.hash_value(v_code), coalesce(p_label, '')) returning id into v_id;
    code_id := v_id; code := v_code; return next;
  end loop;
end;
$$;
revoke all on all functions in schema advantage_private from public, anon, authenticated;

create function public.advantage_verify_code(p_code text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_code advantage_private.access_codes%rowtype;
begin
  if p_code is null or length(p_code) > 100 or length(trim(p_code)) < 16 then
    return jsonb_build_object('error', 'INVALID_CODE');
  end if;
  select * into v_code from advantage_private.access_codes
    where code_hash = advantage_private.hash_value(upper(trim(p_code)))
      and active and (expires_at is null or expires_at > now());
  if not found then return jsonb_build_object('error', 'INVALID_CODE'); end if;
  return jsonb_build_object('remaining', 3 - v_code.uses);
end;
$$;

create function public.advantage_start_attempt(p_code text, p_request_id uuid, p_token text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_code advantage_private.access_codes%rowtype; v_attempt advantage_private.attempts%rowtype;
begin
  if p_code is null or length(p_code) > 100 or length(trim(p_code)) < 16
    or p_request_id is null or p_token is null or p_token !~ '^[a-f0-9]{64}$' then
    return jsonb_build_object('error', 'INVALID_REQUEST');
  end if;
  -- The lock serializes starts from all devices; the counter and insert commit together.
  select * into v_code from advantage_private.access_codes
    where code_hash = advantage_private.hash_value(upper(trim(p_code)))
      and active and (expires_at is null or expires_at > now()) for update;
  if not found then return jsonb_build_object('error', 'INVALID_CODE'); end if;
  select * into v_attempt from advantage_private.attempts where id = p_request_id;
  if found then
    if v_attempt.code_id <> v_code.id or v_attempt.token_hash <> advantage_private.hash_value(p_token) then
      return jsonb_build_object('error', 'INVALID_REQUEST');
    end if;
    return jsonb_build_object('attemptId', v_attempt.id, 'remaining', 3 - v_code.uses);
  end if;
  if v_code.uses >= 3 then return jsonb_build_object('error', 'QUOTA_EXHAUSTED'); end if;
  insert into advantage_private.attempts(id, code_id, token_hash)
    values (p_request_id, v_code.id, advantage_private.hash_value(p_token));
  update advantage_private.access_codes set uses = uses + 1 where id = v_code.id;
  return jsonb_build_object('attemptId', p_request_id, 'remaining', 2 - v_code.uses);
end;
$$;

create function public.advantage_finish_attempt(p_attempt_id uuid, p_token text, p_answers jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_attempt advantage_private.attempts%rowtype;
  v_result advantage_private.results%rowtype;
  v_scores jsonb := '{}'::jsonb;
  v_sum integer; v_answer integer;
begin
  if p_attempt_id is null or p_token is null or p_token !~ '^[a-f0-9]{64}$' then
    return jsonb_build_object('error', 'INVALID_ATTEMPT');
  end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'array' then
    return jsonb_build_object('error', 'INCOMPLETE_ANSWERS');
  end if;
  if jsonb_array_length(p_answers) <> 48 or exists (
    select 1 from jsonb_array_elements(p_answers) as a(value)
      where jsonb_typeof(a.value) <> 'number' or a.value::text !~ '^[1-5]$'
  ) then return jsonb_build_object('error', 'INCOMPLETE_ANSWERS'); end if;
  select * into v_attempt from advantage_private.attempts
    where id = p_attempt_id and token_hash = advantage_private.hash_value(p_token) for update;
  if not found or not exists (select 1 from advantage_private.access_codes where id = v_attempt.code_id and active) then
    return jsonb_build_object('error', 'INVALID_ATTEMPT');
  end if;
  select * into v_result from advantage_private.results where attempt_id = v_attempt.id;
  if found then
    if not v_result.active then return jsonb_build_object('error', 'RESULT_NOT_FOUND'); end if;
    return jsonb_build_object('id', v_result.id, 'scores', v_result.scores, 'createdAt', v_result.created_at, 'version', v_result.version);
  end if;
  -- Fixed questionnaire v1: eight items per dimension; the eighth is reverse scored.
  for dimension in 0..5 loop
    v_sum := 0;
    for item in 0..7 loop
      v_answer := (p_answers ->> (dimension * 8 + item))::integer;
      if item = 7 then v_answer := 6 - v_answer; end if;
      v_sum := v_sum + v_answer;
    end loop;
    v_scores := v_scores || jsonb_build_object('D' || (dimension + 1)::text, round((v_sum::numeric / 8 - 1) * 25, 1));
  end loop;
  insert into advantage_private.results(attempt_id, scores)
    values (v_attempt.id, v_scores) returning * into v_result;
  return jsonb_build_object('id', v_result.id, 'scores', v_result.scores, 'createdAt', v_result.created_at, 'version', v_result.version);
end;
$$;

-- A random share id grants read access only to this result, never to codes/answers.
create function public.advantage_get_result(p_result_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_result advantage_private.results%rowtype;
begin
  select * into v_result from advantage_private.results where id = p_result_id and active;
  if not found then return jsonb_build_object('error', 'RESULT_NOT_FOUND'); end if;
  return jsonb_build_object('id', v_result.id, 'scores', v_result.scores, 'createdAt', v_result.created_at, 'version', v_result.version);
end;
$$;

revoke all on function public.advantage_verify_code(text) from public;
revoke all on function public.advantage_start_attempt(text, uuid, text) from public;
revoke all on function public.advantage_finish_attempt(uuid, text, jsonb) from public;
revoke all on function public.advantage_get_result(uuid) from public;
grant execute on function public.advantage_verify_code(text) to anon, authenticated;
grant execute on function public.advantage_start_attempt(text, uuid, text) to anon, authenticated;
grant execute on function public.advantage_finish_attempt(uuid, text, jsonb) to anon, authenticated;
grant execute on function public.advantage_get_result(uuid) to anon, authenticated;

commit;
