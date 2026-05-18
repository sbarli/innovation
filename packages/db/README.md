# @inno/db

Supabase CLI configuration, database migrations, and seed data for the Innovation game.

This package is not imported by any app — it is used by developers to manage the local Supabase stack and run database migrations.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started) (installed as dev dependency)
- [Docker](https://www.docker.com/) running locally

## Local Development

### Start local Supabase

```bash
pnpm --filter @inno/db start
```

This starts a local Supabase stack (PostgreSQL, Auth, Studio) using Docker.

### Stop local Supabase

```bash
pnpm --filter @inno/db stop
```

### Reset the database with seeds

```bash
pnpm --filter @inno/db db:reset:seeds
```

Runs an interactive picker to select optional seed modules, then resets the database.
`seed.core.sql` (local dev users) and `seed.cards.sql` (105 game cards) always run.

### Reset for CI (no prompts)

```bash
pnpm --filter @inno/db db:reset:ci
```

Writes an empty optional seed file and resets immediately — suitable for CI.

## Card seed generation

Before first use, generate the card seed file from the card data export:

```bash
node packages/db/scripts/generate-cards-seed.mjs
```

This reads `docs/innovation_db.cards.json` and writes `supabase/seeds/seed.cards.sql`.
Commit the result — it only needs to be re-run if the card data changes.

## Ports (local stack)

| Service    | Port  |
|------------|-------|
| API        | 54321 |
| Database   | 54322 |
| Studio     | 54323 |
| Inbucket   | 54324 |
| Analytics  | 54327 |

## Environment variables

The backend app reads its `DATABASE_URL` from `.env.local`. For local development, Supabase prints the connection string when you run `supabase start`. Example:

```
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```
