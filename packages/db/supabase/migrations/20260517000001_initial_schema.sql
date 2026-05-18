SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

-- Reads backend_service from JWT claims. Used by RLS policies.
CREATE OR REPLACE FUNCTION "public"."backend_service"() RETURNS "text"
  LANGUAGE "sql" STABLE SECURITY DEFINER
  SET "search_path" TO 'public'
  AS $$
    SELECT nullif(trim(auth.jwt() ->> 'backend_service'), '')
  $$;

ALTER FUNCTION "public"."backend_service"() OWNER TO "postgres";

-- Automatically enables RLS on newly created public tables.
CREATE OR REPLACE FUNCTION "public"."rls_auto_enable"() RETURNS "event_trigger"
  LANGUAGE "plpgsql" SECURITY DEFINER
  SET "search_path" TO 'pg_catalog'
  AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table', 'partitioned table')
  LOOP
    IF cmd.schema_name = 'public' THEN
      BEGIN
        EXECUTE format('ALTER TABLE IF EXISTS %s ENABLE ROW LEVEL SECURITY', cmd.object_identity);
      EXCEPTION WHEN OTHERS THEN
        RAISE LOG 'rls_auto_enable: failed on %', cmd.object_identity;
      END;
    END IF;
  END LOOP;
END;
$$;

ALTER FUNCTION "public"."rls_auto_enable"() OWNER TO "postgres";

CREATE EVENT TRIGGER "rls_auto_enable_trigger"
  ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
  EXECUTE PROCEDURE "public"."rls_auto_enable"();

-- Trigger function for updated_at columns
CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
  LANGUAGE "plpgsql"
  AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';
SET default_table_access_method = "heap";

-- Users (mirrors auth.users; id = Supabase auth user UUID)
CREATE TABLE IF NOT EXISTS "public"."users" (
  "id"         uuid    PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  "username"   text    NOT NULL UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

-- Rooms
CREATE TABLE IF NOT EXISTS "public"."rooms" (
  "id"               uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  "name"             text    NOT NULL,
  "host_id"          uuid    NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  "available_to_join" boolean NOT NULL DEFAULT true,
  "created_at"       timestamptz NOT NULL DEFAULT now()
);

-- Room members (composite PK)
CREATE TABLE IF NOT EXISTS "public"."room_members" (
  "room_id" uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  "user_id" uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  PRIMARY KEY ("room_id", "user_id")
);

-- Games
CREATE TABLE IF NOT EXISTS "public"."games" (
  "id"                    uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  "room_id"               uuid    NOT NULL UNIQUE REFERENCES public.rooms(id) ON DELETE CASCADE,
  "stage"                 text    NOT NULL DEFAULT 'setup',
  "current_player_id"     uuid    NOT NULL REFERENCES public.users(id),
  "current_action_number" integer NOT NULL DEFAULT 1,
  "winner_id"             uuid    REFERENCES public.users(id),
  "deck"                  jsonb   NOT NULL DEFAULT '{}',
  "age_achievements"      jsonb   NOT NULL DEFAULT '{}',
  "created_at"            timestamptz NOT NULL DEFAULT now(),
  "updated_at"            timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER "games_set_updated_at"
  BEFORE UPDATE ON "public"."games"
  FOR EACH ROW EXECUTE PROCEDURE "public"."set_updated_at"();

-- Player game details
CREATE TABLE IF NOT EXISTS "public"."player_game_details" (
  "id"                  uuid  PRIMARY KEY DEFAULT gen_random_uuid(),
  "game_id"             uuid  NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  "player_id"           uuid  NOT NULL REFERENCES public.users(id),
  "board"               jsonb NOT NULL DEFAULT '{}',
  "hand"                text[]NOT NULL DEFAULT '{}',
  "score_pile"          text[]NOT NULL DEFAULT '{}',
  "age_achievements"    text[]NOT NULL DEFAULT '{}',
  "special_achievements"text[]NOT NULL DEFAULT '{}',
  UNIQUE ("game_id", "player_id")
);

-- Cards
CREATE TABLE IF NOT EXISTS "public"."cards" (
  "id"               uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  "card_id"          text    NOT NULL UNIQUE,
  "name"             text    NOT NULL,
  "age"              integer NOT NULL,
  "color"            text    NOT NULL,
  "dogma_resource"   text    NOT NULL,
  "resource_totals"  jsonb   NOT NULL DEFAULT '{}',
  "resource_spaces"  jsonb   NOT NULL DEFAULT '{}',
  "dogma_effects"    jsonb   NOT NULL DEFAULT '[]'
);

-- RLS policies: only the backend service role can access all tables
ALTER TABLE "public"."users"               ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."rooms"               ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."room_members"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."games"               ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."player_game_details" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."cards"               ENABLE ROW LEVEL SECURITY;

CREATE POLICY "backend_only" ON "public"."users"
  FOR ALL USING (public.backend_service() = 'inno-backend');

CREATE POLICY "backend_only" ON "public"."rooms"
  FOR ALL USING (public.backend_service() = 'inno-backend');

CREATE POLICY "backend_only" ON "public"."room_members"
  FOR ALL USING (public.backend_service() = 'inno-backend');

CREATE POLICY "backend_only" ON "public"."games"
  FOR ALL USING (public.backend_service() = 'inno-backend');

CREATE POLICY "backend_only" ON "public"."player_game_details"
  FOR ALL USING (public.backend_service() = 'inno-backend');

CREATE POLICY "backend_only" ON "public"."cards"
  FOR ALL USING (public.backend_service() = 'inno-backend');
