# Innovation Card Game

A digital 2-player implementation of the [Innovation card game](https://www.asmadigames.com/innovation.html) by Carl Chudyk / Asmadi Games.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Monorepo | Turborepo + pnpm |
| Backend | NestJS (REST via ts-rest + Socket.IO v4) |
| Database | PostgreSQL via Supabase + Drizzle ORM |
| Auth | Supabase Auth (JWT verified in NestJS) |
| Frontend | Expo (iOS, Android, Web via react-native-web) |
| Real-time | Socket.IO v4 |
| Secret Management | Doppler |
| Deployment | GCP Cloud Run |

## Repository Structure

```text
innovation/
├── apps/
│   ├── backend/          (@inno/backend — NestJS REST + Socket.IO)
│   └── native/           (@inno/native — Expo + react-native-web)
└── packages/
    ├── api-contracts/    (@inno/api-contracts — ts-rest contract definitions)
    ├── constants/        (@inno/constants — game enums + socket events)
    ├── db/               (@inno/db — Supabase CLI, migrations, seeds)
    ├── db-schema/        (@inno/db-schema — Drizzle schema + TypeScript types)
    ├── eslint-custom/    (@inno/eslint-custom — shared ESLint config)
    ├── tsconfig/         (tsconfig — shared TypeScript configs)
    ├── ui/               (@inno/ui — shared UI components)
    └── utils/            (@inno/utils — shared utility functions)
```

## Prerequisites

- **Node.js** ≥ 22 (see `.nvmrc` — use `nvm use` to switch)
- **pnpm** ≥ 10 — `npm install -g pnpm`
- **Doppler CLI** — `brew install dopplerhq/cli/doppler`
- **Supabase CLI** — `brew install supabase/tap/supabase`
- **Docker** — required for local Supabase
- **Expo Go** app or iOS/Android simulator for mobile testing

## Local Development

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure secrets with Doppler

Secrets are managed via [Doppler](https://doppler.com). Each app has its own Doppler project (`backend`, `native`), configured in `doppler.yaml`.

```bash
doppler login       # authenticate (once per machine)
doppler setup       # links each app directory to its Doppler project
```

See [Secret Variables](#secret-variables) below for the variables that must exist in each Doppler project.

### 3. Start local Supabase

```bash
cd packages/db
pnpm start          # starts local Supabase stack (requires Docker)
pnpm db:reset       # applies migrations + seeds test data
```

- **Supabase Studio:** <http://localhost:54323>
- **API URL:** <http://localhost:54321>

### 4. Run the backend

```bash
doppler run --project backend --config dev -- pnpm dev:backend
```

Server starts on `http://localhost:8080`. `GET /health` returns 200 when ready.

### 5. Run the Expo app

```bash
doppler run --project native --config dev -- pnpm dev:native
```

Press `i` for iOS simulator, `a` for Android emulator, `w` for web.

---

## External Services

These are configured manually and are not touched by the code.

### Supabase (remote database + auth)

1. Create a project at [supabase.com](https://supabase.com)
2. Enable Email auth: Authentication → Providers → Email
3. Run migrations against the remote project: `supabase db push` from `packages/db/`
4. Copy credentials from Dashboard → Settings → API into your env files

### GCP Cloud Run (backend hosting)

Required settings when creating the Cloud Run service:

- **Port:** `8080`
- **Min instances:** `1` — prevents cold starts that would drop WebSocket connections
- **Session affinity:** enabled — required for Socket.IO room state

### Secret Variables

These variables must be set in each Doppler project. The `dev` config is used locally; `prd` is used in production (GCP Cloud Run).

**Doppler project: `backend`**

| Variable | Where to get it |
| --- | --- |
| `DATABASE_URL` | Supabase Dashboard → Project Settings → Database → Connection string (pooler) |
| `SUPABASE_JWT_SECRET` | Supabase Dashboard → Project Settings → API → JWT Secret |
| `PORT` | Set to `8080` |

**Doppler project: `native`**

| Variable | Where to get it |
| --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon key |
| `EXPO_PUBLIC_BACKEND_URL` | GCP Cloud Run service URL (`https://...run.app`) |
| `EXPO_PUBLIC_WEBSOCKET_URL` | Same host as above (`wss://...run.app`) |

---

## Available Commands

```bash
pnpm build            # build all packages and apps
pnpm dev:backend      # run NestJS in watch mode
pnpm dev:native       # run Expo (choose platform interactively)
pnpm typecheck        # TypeScript check across all packages
pnpm lint             # lint all packages
pnpm lint:fix         # lint + auto-fix
pnpm format           # format with Prettier
pnpm clean            # clean all build outputs
pnpm tb:clean         # clean Turborepo cache + daemon
```

---

## MVP Scope

| Feature | Status |
| --- | --- |
| 2-player game | ✅ |
| Draw action | ✅ |
| Meld action | ✅ |
| Achieve action | ✅ |
| Real-time sync (Socket.IO) | ✅ |
| iOS + Android + Web | ✅ |
| Dogma card effects | 🔜 Phase 5 |
| Splay mechanic | 🔜 Phase 5 |
| 4-player support | 🔜 Phase 6 |
