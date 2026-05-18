-- Local development only. Two test users for 2-player game testing.
--
-- Sign-in credentials:
--   Player 1: local1@inno.game / localDev123!  (UUID: 11111111-1111-4111-8111-111111111111)
--   Player 2: local2@inno.game / localDev123!  (UUID: 22222222-2222-4222-8222-222222222222)

INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at,
  recovery_token, recovery_sent_at, email_change_token_new, email_change,
  email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
  is_super_admin, created_at, updated_at, phone, phone_confirmed_at,
  phone_change, phone_change_token, phone_change_sent_at,
  email_change_token_current, email_change_confirm_status, banned_until,
  reauthentication_token, reauthentication_sent_at, is_sso_user, is_anonymous
) VALUES
(
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-4111-8111-111111111111',
  'authenticated', 'authenticated', 'local1@inno.game',
  extensions.crypt('localDev123!', extensions.gen_salt('bf')),
  now(), NULL, '', now(), '', NULL, '', '', NULL, now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
  NULL, now(), now(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, false
),
(
  '00000000-0000-0000-0000-000000000000',
  '22222222-2222-4222-8222-222222222222',
  'authenticated', 'authenticated', 'local2@inno.game',
  extensions.crypt('localDev123!', extensions.gen_salt('bf')),
  now(), NULL, '', now(), '', NULL, '', '', NULL, now(),
  '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
  NULL, now(), now(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, false
);

INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
(
  gen_random_uuid(),
  '11111111-1111-4111-8111-111111111111',
  '11111111-1111-4111-8111-111111111111',
  jsonb_build_object('sub', '11111111-1111-4111-8111-111111111111', 'email', 'local1@inno.game'),
  'email', now(), now(), now()
),
(
  gen_random_uuid(),
  '22222222-2222-4222-8222-222222222222',
  '22222222-2222-4222-8222-222222222222',
  jsonb_build_object('sub', '22222222-2222-4222-8222-222222222222', 'email', 'local2@inno.game'),
  'email', now(), now(), now()
);

INSERT INTO public.users (id, username) VALUES
('11111111-1111-4111-8111-111111111111', 'player1'),
('22222222-2222-4222-8222-222222222222', 'player2');
