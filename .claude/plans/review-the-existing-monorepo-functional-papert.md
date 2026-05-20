# Innovation Card Game — Rewrite Plan

## Context

Digital implementation of the Innovation card game (Carl Chudyk / Asmadi Games). Fresh start on the current branch: clear existing app/package source, build the correct architecture from scratch using the existing code as reference. Card data (105 cards) is seeded in the existing MongoDB and will be migrated to PostgreSQL.

**MVP scope:** 2-player only. Draw + Meld + Achieve actions. Full real-time sync. Dogma/Splay/4-player as a later phase.

---

## Finalized Tech Stack

| Layer | New |
|---|---|
| Package manager | pnpm |
| Monorepo orchestration | Turborepo |
| Backend framework | NestJS (latest) |
| Database | PostgreSQL via Supabase |
| ORM | Drizzle ORM + postgres.js |
| API style | REST via ts-rest (type-safe contracts) |
| Real-time | Socket.IO v4 |
| Auth | Supabase Auth (NestJS validates JWTs) |
| Frontend | Expo (latest SDK) + react-native-web |
| UI components | Tamagui |
| State management | React Query + Context |
| Deployment | GCP Cloud Run |

---

## Division of Work

**I will build:**
- Repo structure, workspace config, package scaffolds
- All package and app source code
- Supabase migration SQL files and seed scripts (local dev tooling)
- Drizzle schema definitions
- ts-rest API contracts
- NestJS modules, services, gateways
- Expo app screens and components
- Dockerfile and GitHub Actions CI workflow

**You will configure (external services — not touched by code):**
- Supabase remote project (create project, copy connection string + JWT secret + anon key)
- Supabase Auth settings (enable email auth, configure JWT expiry)
- GCP project + Cloud Run service (min-instances=1, session affinity, port 8080)
- Environment variable values in `.env.local` (backend) and `.env` (native)

---

## Repository Structure

```
innovation/
├── package.json                    (pnpm workspace root)
├── pnpm-workspace.yaml
├── turbo.json
├── .nvmrc
├── apps/
│   ├── backend/                    (@inno/backend — NestJS REST + Socket.IO)
│   └── native/                     (@inno/native — Expo + react-native-web)
└── packages/
    ├── constants/                  (@inno/constants — game enums + socket events)
    ├── db/                         (@inno/db — Supabase CLI, migrations, seeds)
    ├── db-schema/                  (@inno/db-schema — Drizzle schema definitions)
    ├── api-contracts/              (@inno/api-contracts — ts-rest contract definitions)
    ├── ui/                         (@inno/ui — shared Tamagui components)
    ├── utils/                      (@inno/utils — shared utility functions)
    ├── tsconfig/                   (tsconfig — shared TS configs)
    └── eslint-custom/              (@inno/eslint-custom — shared ESLint config)
```

---

## DB Package Design (mirrors bff-db pattern)

Two packages handle the database:

**`@inno/db`** — migration management (not imported by apps; used by devs locally)
```
packages/db/
├── supabase/
│   ├── config.toml               (local Supabase dev config)
│   ├── migrations/
│   │   └── TIMESTAMP_initial_schema.sql
│   └── seeds/
│       ├── seed.core.sql         (auth setup, committed)
│       └── seed.cards.sql        (105 card records, committed)
├── scripts/
│   └── db-seed-reset.mjs         (interactive seed picker + supabase db reset)
├── package.json
├── tsconfig.json
└── README.md
```

**`@inno/db-schema`** — Drizzle schema (imported by backend)
```
packages/db-schema/
├── src/
│   ├── schema.ts                 (Drizzle table definitions)
│   └── index.ts                  (re-exports)
├── package.json
└── tsconfig.json
```

---

## Drizzle Schema (`packages/db-schema/src/schema.ts`)

```typescript
import {
  pgTable, text, timestamp, boolean, integer,
  jsonb, uuid, unique, primaryKey
} from 'drizzle-orm/pg-core';

// User profile — id matches Supabase auth.users.id
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  username: text('username').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  hostId: uuid('host_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  availableToJoin: boolean('available_to_join').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const roomMembers = pgTable('room_members', {
  roomId: uuid('room_id').notNull().references(() => rooms.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
}, (t) => [primaryKey({ columns: [t.roomId, t.userId] })]);

export const games = pgTable('games', {
  id: uuid('id').primaryKey().defaultRandom(),
  roomId: uuid('room_id').notNull().unique().references(() => rooms.id, { onDelete: 'cascade' }),
  stage: text('stage').notNull().default('SETUP'),
  currentPlayerId: uuid('current_player_id').notNull().references(() => users.id),
  currentActionNumber: integer('current_action_number').notNull().default(1),
  winnerId: uuid('winner_id').references(() => users.id),
  deck: jsonb('deck').notNull().default({}),
  ageAchievements: jsonb('age_achievements').notNull().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const playerGameDetails = pgTable('player_game_details', {
  id: uuid('id').primaryKey().defaultRandom(),
  gameId: uuid('game_id').notNull().references(() => games.id, { onDelete: 'cascade' }),
  playerId: uuid('player_id').notNull().references(() => users.id),
  board: jsonb('board').notNull().default({}),
  hand: text('hand').array().notNull().default([]),
  scorePile: text('score_pile').array().notNull().default([]),
  ageAchievements: text('age_achievements').array().notNull().default([]),
  specialAchievements: text('special_achievements').array().notNull().default([]),
}, (t) => [unique().on(t.gameId, t.playerId)]);

export const cards = pgTable('cards', {
  id: uuid('id').primaryKey().defaultRandom(),
  cardId: text('card_id').notNull().unique(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  color: text('color').notNull(),
  dogmaResource: text('dogma_resource').notNull(),
  resourceTotals: jsonb('resource_totals').notNull().default({}),
  resourceSpaces: jsonb('resource_spaces').notNull().default({}),
  dogmaEffects: jsonb('dogma_effects').notNull().default([]),
});
```

---

## GCP Cloud Run — What I Build vs. What You Configure

**I build:**
- `apps/backend/Dockerfile`
- `apps/backend/.dockerignore`
- `.github/workflows/deploy-backend.yml` (build image → push to Artifact Registry → deploy to Cloud Run)

**You configure in GCP Console / gcloud CLI:**
- Create GCP project, enable Cloud Run API + Artifact Registry API
- Create Artifact Registry repository
- Set Cloud Run service settings:
  - Port: `8080`
  - Min instances: `1` (required to keep WebSocket connections alive)
  - Session affinity: enabled (required for Socket.IO room state)
  - Environment variables: `DATABASE_URL`, `SUPABASE_JWT_SECRET`, `PORT=8080`
- Create a service account and add to GitHub Actions secrets

---

## Auth Flow

1. Frontend: `supabase.auth.signUp({ email, password })` → Supabase issues JWT + refresh token
2. Frontend: on successful signup, POST `{username}` to `/users/profile` with JWT in Authorization header → NestJS creates the user row in PostgreSQL
3. Frontend: stores session in AsyncStorage (via `@supabase/auth-js` with Expo adapter)
4. All NestJS API requests: include `Authorization: Bearer <jwt>` header
5. NestJS `SupabaseAuthGuard`: verifies JWT using `SUPABASE_JWT_SECRET`, extracts `sub` (UUID), attaches to request
6. All Socket.IO connections: pass JWT in `socket.auth.token` → `WsAuthGuard` verifies same way

**Environment variables I'll read; you supply the values:**
```
# apps/backend/.env.local
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
SUPABASE_JWT_SECRET=<from Supabase Dashboard → Settings → API → JWT Secret>
PORT=8080

# apps/native/.env
EXPO_PUBLIC_SUPABASE_URL=https://[ref].supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<from Supabase Dashboard → Settings → API → anon key>
EXPO_PUBLIC_BACKEND_URL=https://[service].[region].run.app
EXPO_PUBLIC_WEBSOCKET_URL=wss://[service].[region].run.app
```

---

## Phase 0 — Repo Setup

**Goal:** Clean repo with correct workspace config, shared tooling, and all package scaffolds.

### Step 0.1 — Clear existing source
- Delete `apps/backend/src/`, `apps/native/src/`, `apps/native/app/`
- Delete `packages/constants/src/`, `packages/gql/`, `packages/ui/src/`, `packages/utils/src/`, `packages/mocks/`
- Keep: root config files, `.nvmrc`, `turbo.json`, `.gitignore`
- Keep: old code accessible in git history on prior commits

### Step 0.2 — Root workspace config
**Create/update files:**
- `pnpm-workspace.yaml`: declare `apps/*` and `packages/*`
- `package.json` (root): remove yarn workspaces, add `"packageManager": "pnpm@..."`, root dev scripts
- `turbo.json`: define pipelines — `build` (depends on upstream builds), `dev` (persistent), `lint`, `test`, `typecheck`
- `.nvmrc`: pin Node version (22)

### Step 0.3 — Shared packages: tsconfig
**Package:** `packages/tsconfig/`
- `package.json`: name `tsconfig`, no main entry
- `base.json`: strict TypeScript, ES2023, bundler module resolution
- `nestjs.json`: extends base, adds decorator metadata settings for NestJS
- `expo.json`: extends base, adds JSX settings for React Native

### Step 0.4 — Shared packages: eslint-custom
**Package:** `packages/eslint-custom/`
- `package.json`: `@inno/eslint-custom`
- `index.js`: flat ESLint config with TypeScript, React Hooks, Prettier, Turbo plugins

### Step 0.5 — Shared packages: constants
**Package:** `packages/constants/`
- Port existing `src/cards.ts`, `src/games.ts`, `src/sockets.ts`, `src/rooms.ts`, `src/players.ts` directly — these are correct
- Update `package.json`: change from yarn to pnpm-compatible, update build script
- **Add `src/dogma.ts`** — new constants file for effect types and special achievements confirmed by the card data:
  ```typescript
  export enum EffectType {
    ACHIEVE = 'achieve', DRAW = 'draw', END = 'end',
    EXCHANGE = 'exchange', EXECUTE = 'execute', MELD = 'meld',
    REARRANGE = 'rearrange', REMOVE = 'remove', RETURN = 'return',
    REVEAL = 'reveal', SCORE = 'score', SPLAY = 'splay',
    TRANSFER = 'transfer', TUCK = 'tuck', UNSPLAY = 'unsplay',
  }
  export enum SpecialAchievement {
    EMPIRE = 'Empire', MONUMENT = 'Monument', UNIVERSE = 'Universe',
    WONDER = 'Wonder', WORLD = 'World',
  }
  export type SplayDirection = 'left' | 'right' | 'up';
  export interface DogmaEffect {
    description: string;
    effectTypes: EffectType[];
    isDemand: boolean;
    isOptional: boolean;
    repeat: boolean;
    specialAchievement: SpecialAchievement | null;
  }
  ```
- Update `src/index.ts` to re-export `src/dogma.ts`

### Step 0.6 — Shared packages: db
**Package:** `packages/db/`
- `package.json`: `@inno/db`, scripts: `start`/`stop`/`db:reset:seeds`/`db:reset:ci`
- `supabase/config.toml`: local Supabase dev config (PostgreSQL port 54322, Studio port 54323, API port 54321)
- `supabase/migrations/20260517000001_initial_schema.sql`: full schema SQL (all tables, RLS policies, triggers)
- `supabase/seeds/seed.core.sql`: dev auth user + placeholder
- `supabase/seeds/seed.cards.sql`: all 105 cards exported from MongoDB (generated during card migration step)
- `scripts/db-seed-reset.mjs`: interactive seed picker (mirrors bff-db pattern)
- `README.md`: local dev setup instructions

**Migration SQL structure:**
- `CREATE TABLE public.users (id UUID PRIMARY KEY REFERENCES auth.users(id), username TEXT UNIQUE NOT NULL, ...)`
- `CREATE TABLE public.rooms (...)`
- `CREATE TABLE public.room_members (...)`
- `CREATE TABLE public.games (...)`
- `CREATE TABLE public.player_game_details (...)`
- `CREATE TABLE public.cards (...)`
- `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` on all tables
- `CREATE OR REPLACE FUNCTION public.backend_service() RETURNS TEXT` — reads from `request.jwt.claims`
- RLS policies: `FOR ALL USING (backend_service() = 'inno-backend')` on each table

### Step 0.7 — Shared packages: db-schema
**Package:** `packages/db-schema/`
- `package.json`: `@inno/db-schema`, exports `"."` → `./src/index.ts`, dep on `drizzle-orm`
- `src/schema.ts`: Drizzle table definitions (as above in schema section)
- `src/types.ts`: TypeScript types derived from the schema, plus typed wrappers for JSONB columns:
  ```typescript
  import type { DogmaEffect, SplayDirection } from '@inno/constants';
  // Typed wrappers for jsonb columns stored as unknown by Drizzle
  export type CardResourceSpaces = { resourceSpace1: string | null; resourceSpace2: string | null; resourceSpace3: string | null; resourceSpace4: string | null; };
  export type CardResourceTotals = { castles: number; crowns: number; leaves: number; lightbulbs: number; factories: number; timepieces: number; };
  export type ColorPile = { cards: string[]; splay: SplayDirection | null; }; // cards = cardId[]
  export type Board = Record<'blue' | 'green' | 'purple' | 'red' | 'yellow', ColorPile>;
  export type Deck = Record<string, string[]>; // age string → cardId[]
  export type AgeAchievements = Record<string, string | null>; // age string → cardId or null if claimed
  // Typed card row (jsonb fields cast)
  export type TypedCard = Omit<typeof schema.cards.$inferSelect, 'resourceTotals' | 'resourceSpaces' | 'dogmaEffects'> & { resourceTotals: CardResourceTotals; resourceSpaces: CardResourceSpaces; dogmaEffects: DogmaEffect[]; };
  ```
- `src/index.ts`: re-exports all tables and types

### Step 0.8 — Shared packages: api-contracts
**Package:** `packages/api-contracts/`
- `package.json`: `@inno/api-contracts`, dep on `@ts-rest/core`
- `src/contracts/users.contract.ts`: POST `/users/profile`, GET `/users/me`
- `src/contracts/rooms.contract.ts`: CRUD room endpoints
- `src/contracts/cards.contract.ts`: GET `/cards`, GET `/cards/:cardId`
- `src/contracts/gameplay.contract.ts`: POST `/games`, POST `/games/:gameId/draw`, POST `/games/:gameId/meld`, POST `/games/:gameId/achieve`
- `src/contracts/index.ts`: combined router contract
- `src/index.ts`: re-exports

### Step 0.9 — Shared packages: ui (scaffold)
**Package:** `packages/ui/`
- `package.json`: `@inno/ui`, peer deps on Tamagui packages
- `src/index.ts`: empty exports (populated in Phase 4)

### Step 0.10 — Shared packages: utils
**Package:** `packages/utils/`
- `package.json`: `@inno/utils`
- `src/game.utils.ts`: helper functions (shuffle array for deck, etc.)
- `src/index.ts`: re-exports

### Step 0.11 — App scaffolds
- Create `apps/backend/` directory structure (NestJS — detailed in Phase 1)
- Create `apps/native/` directory structure (Expo — detailed in Phase 4)

---

## Phase 1 — Backend Foundation

**Goal:** Running NestJS server with DB connection, auth guard, user profile endpoint, card seeding, and Socket.IO gateway scaffolded.

### Step 1.1 — Backend dependencies
**Install in `apps/backend/`:**
```
# Core NestJS
@nestjs/common @nestjs/core @nestjs/platform-express @nestjs/config
@nestjs/websockets @nestjs/platform-socket.io

# DB
drizzle-orm postgres
@inno/db-schema (workspace)

# Auth
jsonwebtoken
@types/jsonwebtoken

# API contracts
@ts-rest/core @ts-rest/nest
@inno/api-contracts (workspace)

# Shared
@inno/constants (workspace)

# Validation
class-validator class-transformer zod

# Dev only
drizzle-kit
@types/node typescript ts-node @nestjs/cli
```

**Key `package.json` scripts:**
```json
{
  "start:dev": "nest start --watch",
  "build": "nest build",
  "start:prod": "node dist/main",
  "db:introspect": "drizzle-kit introspect",
  "db:generate": "drizzle-kit generate"
}
```

### Step 1.2 — NestJS app structure
```
apps/backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── db/
│   │   ├── db.module.ts           (provides Drizzle client)
│   │   ├── db.service.ts          (wraps drizzle connection + withInnoRole())
│   │   └── db.constants.ts        (DB injection token)
│   ├── auth/
│   │   ├── guards/
│   │   │   ├── supabase-auth.guard.ts   (HTTP JWT guard)
│   │   │   └── ws-auth.guard.ts         (Socket.IO JWT guard)
│   │   ├── decorators/
│   │   │   └── current-user.decorator.ts
│   │   └── auth.module.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── users.controller.ts
│   ├── cards/
│   │   ├── cards.module.ts
│   │   ├── cards.service.ts
│   │   └── cards.controller.ts
│   ├── rooms/
│   │   ├── rooms.module.ts
│   │   ├── rooms.service.ts
│   │   └── rooms.controller.ts
│   ├── games/
│   │   ├── games.module.ts
│   │   └── games.service.ts
│   ├── gameplay/
│   │   ├── gameplay.module.ts
│   │   ├── gameplay.controller.ts
│   │   └── services/
│   │       ├── new-game.service.ts
│   │       ├── player-actions.service.ts
│   │       ├── resources.service.ts
│   │       ├── validation.service.ts
│   │       └── winner.service.ts
│   └── socket/
│       ├── socket.module.ts
│       ├── socket.gateway.ts
│       └── services/
│           ├── socket-base.service.ts
│           ├── socket-users.service.ts
│           ├── socket-room.service.ts
│           └── socket-game.service.ts
├── drizzle.config.ts
├── Dockerfile
├── .dockerignore
├── .env.example
├── nest-cli.json
├── tsconfig.json
└── tsconfig.build.json
```

### Step 1.3 — `main.ts`
- Bootstrap NestJS with Express adapter
- Enable CORS (allow all origins in dev, configure for Cloud Run URL in prod)
- Listen on `process.env.PORT ?? 8080`
- Enable `ValidationPipe` globally

### Step 1.4 — `db/db.module.ts` + `db/db.service.ts`
- `DbModule`: global module, provides `DB_TOKEN`
- `DbService`:
  - On module init: create `postgres(process.env.DATABASE_URL!)` connection
  - Expose `db`: `PostgresJsDatabase<typeof schema>` from drizzle-orm
  - Expose `withInnoRole<T>(fn)`: wraps query in `SET LOCAL request.jwt.claims = '{"backend_service":"inno-backend"}'` transaction for RLS

**Pattern:**
```typescript
async withInnoRole<T>(fn: (db: PostgresJsDatabase<typeof schema>) => Promise<T>): Promise<T> {
  return this.db.transaction(async (tx) => {
    await tx.execute(sql`SELECT set_config('request.jwt.claims', '{"backend_service":"inno-backend"}', true)`);
    return fn(tx as any);
  });
}
```

### Step 1.5 — Auth guards
**`supabase-auth.guard.ts`:**
- Extract Bearer token from `Authorization` header
- Verify with `jwt.verify(token, process.env.SUPABASE_JWT_SECRET!)` (symmetric HS256)
- Attach `{ userId: payload.sub, email: payload.email }` to `request.user`
- Throw `UnauthorizedException` on failure

**`ws-auth.guard.ts`:**
- Extract token from `client.handshake.auth.token`
- Same JWT verification
- Attach user to `client.data.user`

**`current-user.decorator.ts`:**
- `@CurrentUser()` param decorator — extracts `request.user` from HTTP context

### Step 1.6 — `users/users.service.ts`
Key methods:
- `createProfile(supabaseUserId: string, username: string): Promise<User>` — INSERT into users table, throw conflict if username taken
- `findById(id: string): Promise<User | null>`
- `findByUsername(username: string): Promise<User | null>`

### Step 1.7 — `users/users.controller.ts` (ts-rest)
- `POST /users/profile` — `@UseGuards(SupabaseAuthGuard)` — creates user record, returns profile
- `GET /users/me` — `@UseGuards(SupabaseAuthGuard)` — returns current user profile

### Step 1.8 — Card seed generation script
- Write `packages/db/scripts/generate-cards-seed.mjs`
- Reads `../../docs/innovation_db.cards.json` (already in repo — no MongoDB connection needed)
- Strips `_id` (MongoDB ObjectId) and `__v` (Mongoose version) fields
- Maps camelCase fields to snake_case column names; serializes JSON fields
- Writes `packages/db/supabase/seeds/seed.cards.sql` as INSERT statements with `ON CONFLICT (card_id) DO NOTHING`
- Run once: `node packages/db/scripts/generate-cards-seed.mjs`, commit the resulting SQL file

### Step 1.9 — `cards/cards.service.ts`
Key methods:
- `findAll(): Promise<Card[]>`
- `findById(cardId: string): Promise<Card | null>`
- `findByIds(cardIds: string[]): Promise<Card[]>`
- `findByAge(age: number): Promise<Card[]>`

### Step 1.10 — Socket.IO gateway scaffold
- `socket.gateway.ts`: `@WebSocketGateway({ cors: { origin: '*' } })`
- Implements `OnGatewayInit`, `OnGatewayConnection`, `OnGatewayDisconnect`
- On connection: verify JWT from `client.handshake.auth.token`, disconnect on failure
- `MAP_USER_TO_SOCKET` handler: store userId → socketId mapping in `SocketUsersService`

### Step 1.11 — Dockerfile
```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm turbo build --filter=@inno/backend

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json .
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/main"]
```

### Step 1.12 — GitHub Actions workflow (`.github/workflows/deploy-backend.yml`)
```yaml
# Triggers on push to main
# Steps: checkout → auth to GCP → build & push to Artifact Registry → deploy to Cloud Run
# Secrets needed (set by user in GitHub): GCP_PROJECT_ID, GCP_SA_KEY, GCP_REGION, GCP_ARTIFACT_REPO
```

### Step 1.13 — `drizzle.config.ts` (in `apps/backend/`)
- Points to `../../packages/db-schema/src/schema.ts`
- Uses `DATABASE_URL` env var
- Used for `pnpm db:introspect` to update schema from remote DB

**Phase 1 verification:**
- `pnpm --filter @inno/backend start:dev` starts without errors
- `GET /health` returns 200
- `POST /users/profile` with valid Supabase JWT creates user row in local Supabase DB

---

## Phase 2 — Rooms + Socket Events

**Goal:** Full room lifecycle via REST + real-time socket events for room membership.

### Step 2.1 — API contracts for rooms (`packages/api-contracts/src/contracts/rooms.contract.ts`)
```typescript
const roomsContract = c.router({
  createRoom:          { method: 'POST',   path: '/rooms',                   ... },
  getRoomsForPlayer:   { method: 'GET',    path: '/rooms',                   ... },
  getRoom:             { method: 'GET',    path: '/rooms/:roomId',            ... },
  addPlayerToRoom:     { method: 'POST',   path: '/rooms/:roomId/join',       ... },
  updateRoomAvailability: { method: 'PATCH', path: '/rooms/:roomId/availability', ... },
  closeRoom:           { method: 'DELETE', path: '/rooms/:roomId',            ... },
});
```
All endpoints require auth. Define request/response Zod schemas in the contract.

### Step 2.2 — `rooms/rooms.service.ts`
Key methods (all use `dbService.withInnoRole()`):
- `create(hostId, name): Promise<Room>` — INSERT room + INSERT room_member for host
- `findById(roomId): Promise<Room & { members: User[] }>` — JOIN with room_members + users
- `findForPlayer(playerId): Promise<Room[]>` — rooms where user is a member
- `addPlayer(roomId, userId): Promise<void>` — INSERT room_member, enforce max 2 players
- `updateAvailability(roomId, available): Promise<Room>`
- `close(roomId): Promise<void>` — DELETE room (cascade deletes members)

### Step 2.3 — `rooms/rooms.controller.ts`
- Wire all ts-rest contract endpoints to service methods
- All routes protected by `SupabaseAuthGuard`
- `closeRoom` validates that the caller is the host

### Step 2.4 — Socket events for rooms (in `socket/`)
**`socket-users.service.ts`:**
- `mapUserToSocket(userId, socketId)` — in-memory Map
- `getSocketIdForUser(userId): string | undefined`
- `removeSocket(socketId)`

**`socket-room.service.ts`:**
- `joinRoom(client, roomId)` — `client.join(roomId)` — socket joins Socket.IO room
- `leaveRoom(client, roomId)` — `client.leave(roomId)`
- `broadcastToRoom(server, roomId, event, data)`
- `getRoomMetadata(roomId): Promise<RoomMetadata>` — delegates to RoomsService

**Socket event handlers in `socket.gateway.ts`:**
- `JOIN_ROOM`: client joins socket room, broadcasts `USER_JOINED_ROOM` to room
- `GET_ROOM_METADATA`: returns current room state to requesting client
- `CLOSE_ROOM`: validates host, closes room, broadcasts `USER_LEFT_ROOM` to all in room
- On disconnect: remove user→socket mapping, broadcast `USER_LEFT_ROOM` to any rooms the socket was in

**Phase 2 verification:**
- Two test clients can connect, join the same room, and both receive `USER_JOINED_ROOM`
- Closing room broadcasts `USER_LEFT_ROOM` to both
- REST room CRUD endpoints return correct data

---

## Phase 3 — Game Actions

**Goal:** Full game loop — new game, Draw, Meld, Achieve — with real-time sync to both players.

### Step 3.1 — API contracts for gameplay (`packages/api-contracts/src/contracts/gameplay.contract.ts`)
```typescript
const gameplayContract = c.router({
  newGame:  { method: 'POST', path: '/rooms/:roomId/games',           ... },
  getGame:  { method: 'GET',  path: '/games/:gameId',                 ... },
  draw:     { method: 'POST', path: '/games/:gameId/draw',            ... },
  meld:     { method: 'POST', path: '/games/:gameId/meld',
              body: z.object({ cardId: z.string() }),                  ... },
  achieve:  { method: 'POST', path: '/games/:gameId/achieve',
              body: z.object({ achievementAge: z.number() }),          ... },
});
```

### Step 3.2 — `games/games.service.ts`
Key methods:
- `findById(gameId): Promise<FullGameState>` — game + playerGameDetails for both players
- `findByRoom(roomId): Promise<Game | null>`

**`FullGameState` type:**
```typescript
type FullGameState = {
  game: Game;
  playerDetails: Array<PlayerGameDetails & { player: User }>;
  // filtered to only what the requesting player should see (hand is private)
}
```

### Step 3.3 — `gameplay/services/validation.service.ts`
Port from `apps/backend/src/gameplay/services/validation.service.ts`:
- `validateGameExists(gameId)` — throws NotFoundException
- `validateIsCurrentPlayer(game, userId)` — throws ForbiddenException
- `validateGameStage(game, expectedStage)` — throws BadRequestException
- `validateCardInHand(playerDetails, cardId)` — throws BadRequestException
- `validateAchievementEligibility(game, playerDetails, achievementAge)` — score threshold + top card check

### Step 3.4 — `gameplay/services/resources.service.ts`
Port from existing `resources.service.ts`:
- `countResourcesOnBoard(board): ResourceTotals` — sums resource icons from all visible card slots
- `getHighestBoardAge(board): number` — finds highest age among top cards per color

### Step 3.5 — `gameplay/services/new-game.service.ts`
Port from existing `new-game.service.ts`, adapt for Drizzle:
- `initializeDeck(allCards): Deck` — group card IDs by age, shuffle each age pile
- `selectAgeAchievements(deck): AgeAchievements` — randomly set aside one card per age 1-9
- `dealStarterHands(deck, playerIds): { deck, hands }` — deal 2 cards per player from age 1
- `createGame(roomId, playerIds): Promise<FullGameState>`
  1. Fetch all cards via `CardsService.findAll()`
  2. `dbService.withInnoRole()` transaction:
     - INSERT into `games` with initialized deck + age achievements
     - INSERT into `player_game_details` for each player with starter hand
  3. Return `FullGameState`

### Step 3.6 — `gameplay/services/player-actions.service.ts`
Port from existing service, adapt for Drizzle:

**`draw(gameId, playerId): Promise<FullGameState>`:**
1. `validationService.validateIsCurrentPlayer()`
2. Determine draw age: `resourcesService.getHighestBoardAge(board)`, skip empty piles
3. `dbService.withInnoRole()` transaction:
   - Pop top card from deck[age], handle empty pile (try next higher age, end game if age > 10)
   - Append cardId to player's hand
   - UPDATE `games.deck`
   - UPDATE `player_game_details.hand`
   - Advance action number: call `advanceAction()`
4. Return updated `FullGameState`

**`meld(gameId, playerId, cardId): Promise<FullGameState>`:**
1. Validate card in hand
2. Get card details from `CardsService.findById(cardId)`
3. `dbService.withInnoRole()` transaction:
   - Remove cardId from hand
   - Add card to top of `board[color].cards`
   - UPDATE `player_game_details`
   - Advance action: call `advanceAction()`
4. Return updated `FullGameState`

**`achieve(gameId, playerId, achievementAge): Promise<FullGameState>`:**
1. `validationService.validateAchievementEligibility()`:
   - score >= 5 × achievementAge
   - player has a top card of value >= achievementAge
2. `dbService.withInnoRole()` transaction:
   - Add `achievementAge` to `player_game_details.age_achievements`
   - Set `games.age_achievements[achievementAge]` = null (claimed)
   - Check win condition: if `age_achievements.length >= 6`, set `games.stage = COMPLETE`, `games.winner_id = playerId`
   - Advance action: call `advanceAction()`
3. Return updated `FullGameState`

**`advanceAction(game, tx): Promise<Game>`:**
- If `currentActionNumber === 1`: set `currentActionNumber = 2`
- If `currentActionNumber === 2`: set `currentActionNumber = 1`, advance `currentPlayerId` to next player
- UPDATE `games`

### Step 3.7 — `gameplay/services/winner.service.ts`
Port from existing `winner.helpers.ts`:
- `checkAchievementWin(playerDetails, playerCount): string | null` — returns winnerId if achieved enough
- `checkScoreWin(gameId): string | null` — returns player with highest score if game ends by time
- These are called when: achievements reach threshold OR deck exhaustion

### Step 3.8 — `gameplay/gameplay.controller.ts`
- Wire ts-rest contract to service methods
- All routes: `@UseGuards(SupabaseAuthGuard)`
- `newGame`: validates user is room host, calls `NewGameService.createGame()`
- `draw` / `meld` / `achieve`: call respective `PlayerActionsService` methods
- After each action: emit `GAME_UPDATED` socket event to room via `SocketGameService`

### Step 3.9 — `socket/services/socket-game.service.ts`
- `broadcastGameStarted(server, roomId, gameState)`: emit `GAME_STARTED` to room
- `broadcastGameUpdated(server, roomId, gameState)`: emit `GAME_UPDATED` to room
- Note: game state is filtered per player (each player only sees their own hand); broadcast two different payloads to the two socket IDs in the room

**Phase 3 verification:**
- `POST /rooms/:roomId/games` initializes game, both players receive `GAME_STARTED`
- Draw action: deck shrinks, hand grows, `GAME_UPDATED` received by both
- Meld action: card moves from hand to board color pile
- Achieve action: achievement added, game ends if threshold met
- Turn advances correctly (action 1 → 2 → next player's turn)

---

## Phase 4 — Frontend (Expo + react-native-web)

**Goal:** Working Expo app for iOS, Android, and web with auth, rooms, and game board.

### Step 4.1 — Expo app dependencies
**Install in `apps/native/`:**
```
# Expo core
expo expo-router react-native react react-dom

# Web support
react-native-web @expo/metro-runtime

# Tamagui
tamagui @tamagui/core @tamagui/config @tamagui/font-inter
@tamagui/vite-plugin (web) babel-plugin-transform-tamagui

# Supabase Auth
@supabase/supabase-js
expo-secure-store (for token storage)

# Networking
@ts-rest/react-query @tanstack/react-query
socket.io-client

# Forms
react-hook-form zod @hookform/resolvers

# Shared packages
@inno/constants @inno/api-contracts @inno/ui @inno/utils (workspace)

# Dev
typescript @types/react @types/react-native
```

### Step 4.2 — Expo configuration
- `app.config.ts` (dynamic): expose env vars via `extra` field
- `metro.config.js`: add `resolver.sourceExts` for web, configure monorepo symlinks
- `babel.config.js`: add `babel-plugin-transform-tamagui` + Expo presets
- `tailwind.config.js`: Tamagui doesn't use Tailwind, but configure NativeWind if desired (optional)
- `tsconfig.json`: extends `tsconfig/expo.json`, path aliases for `@/`

### Step 4.3 — Expo Router structure
```
apps/native/
├── app/
│   ├── _layout.tsx                 (root: TamaguiProvider → SupabaseProvider → QueryClientProvider)
│   ├── index.tsx                   (redirect to /auth or /(app) based on session)
│   ├── auth/
│   │   ├── _layout.tsx
│   │   ├── index.tsx               (login/signup toggle)
│   │   ├── login.tsx
│   │   └── signup.tsx
│   └── (app)/
│       ├── _layout.tsx             (auth guard: redirect to /auth if no session)
│       ├── (home)/
│       │   └── index.tsx           (room list + create room CTA)
│       └── rooms/
│           └── [roomId]/
│               ├── index.tsx       (room lobby: members, start game)
│               └── game/
│                   └── [gameId]/
│                       └── index.tsx  (active game board)
└── src/
    ├── supabase/
    │   ├── client.ts               (createClient with Expo SecureStore adapter)
    │   └── SupabaseProvider.tsx    (session context, auto-refresh)
    ├── api/
    │   ├── client.ts               (ts-rest React Query client)
    │   └── queryClient.ts
    ├── websockets/
    │   └── SocketProvider.tsx      (Socket.IO client context, port from existing)
    ├── auth/
    │   ├── useSession.ts
    │   ├── LoginForm.tsx
    │   └── SignupForm.tsx
    ├── rooms/
    │   ├── useRooms.ts             (React Query hooks for rooms API)
    │   ├── RoomList.tsx
    │   ├── CreateRoomForm.tsx
    │   └── RoomLobby.tsx
    ├── games/
    │   ├── useGame.ts              (React Query + socket state for active game)
    │   ├── GameBoard.tsx
    │   ├── PlayerBoard.tsx         (5 color piles)
    │   ├── HandDisplay.tsx
    │   ├── ScorePile.tsx
    │   └── ActionButtons.tsx       (Draw / Meld / Achieve)
    ├── cards/
    │   ├── CardFront.tsx
    │   ├── CardBack.tsx
    │   └── CardSlot.tsx
    └── shared/
        └── components/             (Tamagui-based shared primitives)
```

### Step 4.4 — Supabase client + SupabaseProvider
`src/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { storage: ExpoSecureStoreAdapter, autoRefreshToken: true, persistSession: true } }
);
```

`src/supabase/SupabaseProvider.tsx`:
- Listens to `supabase.auth.onAuthStateChange`
- Exposes `session`, `user`, `signOut` via context
- On signup success: calls `POST /users/profile` to create username record

### Step 4.5 — ts-rest API client
`src/api/client.ts`:
- Uses `@ts-rest/react-query` to create typed hooks from `@inno/api-contracts`
- Injects `Authorization: Bearer <session.access_token>` header automatically
- Base URL from `process.env.EXPO_PUBLIC_BACKEND_URL`

### Step 4.6 — SocketProvider (port from existing)
`src/websockets/SocketProvider.tsx`:
- Creates `io(EXPO_PUBLIC_WEBSOCKET_URL, { auth: { token: session.access_token } })`
- Reconnects when session changes
- Exposes socket instance via context
- Listens for `GAME_UPDATED`, `GAME_STARTED`, `USER_JOINED_ROOM`, `USER_LEFT_ROOM`

### Step 4.7 — Auth screens
`app/auth/login.tsx`:
- React Hook Form + Zod: email + password fields
- On submit: `supabase.auth.signInWithPassword({ email, password })`
- On success: router navigates to `/(app)`

`app/auth/signup.tsx`:
- React Hook Form + Zod: email + password + username fields
- On submit:
  1. `supabase.auth.signUp({ email, password })`
  2. `POST /users/profile` with `{ username }`
- On success: router navigates to `/(app)`

### Step 4.8 — Room screens
`app/(app)/(home)/index.tsx`:
- List rooms via `useRoomsQuery()` (ts-rest React Query hook)
- Create room form (name input)
- Join room button — calls `addPlayerToRoom`, then navigate to `/rooms/:roomId`

`app/(app)/rooms/[roomId]/index.tsx`:
- Fetch room via `useRoomQuery(roomId)`
- Socket: join room channel on mount, leave on unmount
- Show members list
- Start game button (host only) — calls `POST /rooms/:roomId/games`
- On `GAME_STARTED` socket event: navigate to `/rooms/:roomId/game/:gameId`

### Step 4.9 — Game board screens
`app/(app)/rooms/[roomId]/game/[gameId]/index.tsx`:
- `useGame(gameId)` hook: initial fetch via React Query + live updates via Socket.IO
- On `GAME_UPDATED`: merge updated game state into local state
- Renders `<GameBoard game={game} playerId={userId} />`

`src/games/GameBoard.tsx`:
- Opponent's board (face-down cards, resource counts)
- Score pile counts
- Age achievements display
- Current player indicator + action number
- Own board: `<PlayerBoard board={myDetails.board} />`
- `<HandDisplay hand={myDetails.hand} onCardSelect={setSelectedCard} />`
- `<ActionButtons onDraw={handleDraw} onMeld={handleMeld} onAchieve={handleAchieve} />`

`src/games/PlayerBoard.tsx`:
- 5 color columns (Blue, Red, Green, Purple, Yellow)
- Each column: stack of cards, top card fully visible
- Shows resource icons (MVP: show count badges per resource type)

`src/cards/CardFront.tsx`:
- Displays card name, age, color, 4 resource icon slots
- Tamagui-based layout (replaces GlueStack CardFrontWithDetails)

**Phase 4 verification:**
- `npx expo start` runs on iOS, Android, and web without errors
- Signup → username registration → logged in state works end-to-end
- Can create room, join room, see member list update in real-time
- Game starts, both clients see the board
- Draw/Meld/Achieve actions work and both clients receive `GAME_UPDATED`

---

## Phase 5 — Dogma (Future Phase)

Dogma is the core mechanic of the game and the largest engineering effort. It requires all of the infrastructure from Phases 1–4 to be working first.

### What the Dogma action requires

**New turn action:** Player selects one of their top cards to activate. The backend must:
1. Count the featured icon (the `dogmaResource` of the chosen card) on the active player's board
2. For each other player: if they have ≥ active player's count → they are "eligible to share"
3. Execute each `dogmaEffect` in sequence:
   - **Demand effects** (`isDemand: true`): ineligible opponents (count < active player) must execute the demand first, clockwise
   - **Non-demand effects**: eligible opponents execute first (clockwise), then active player
   - If any opponent actually changed state while sharing, active player gets a free Draw after all effects complete
4. Update game state, broadcast GAME_UPDATED

**New API endpoint:**
```
POST /games/:gameId/dogma   body: { cardId: string }
```

### Splay mechanic (prerequisite for accurate icon counts)

The `board[color]` type gains a `splay` field, already modeled in `ColorPile` type.

**Icon visibility rules:**

Each card has exactly one null `resourceSpace` (the card image — its position varies per card). When counting resources, always skip null values regardless of space number.

The physical card layout places icons at 4 corners. The splay direction determines which corners of covered cards peek out from under the top card. Based on the physical Innovation card:

| Card position | Unsplayed | Splay left | Splay right | Splay up |
|---|---|---|---|---|
| Top card | all non-null spaces | all non-null spaces | all non-null spaces | all non-null spaces |
| Covered card | none | space4 if non-null | spaces 3+4 (non-null only) | spaces 2+3+4 (non-null only) |

**Important:** The exact mapping of space1–4 to visual positions (top-left, top-right, bottom-left, bottom-right) must be verified against the physical card before implementing `ResourcesService`. The mapping above (space4=bottom-left visible for left splay, etc.) should be confirmed against the Innovation rulebook diagrams or a physical card. Hardcode the mapping as a constant in `ResourcesService` so it can be corrected in one place if needed.

**`ResourcesService.countVisibleResources(board, cards)`:** For each color pile, iterate from top to bottom; apply visibility rule based on splay direction; sum icons from visible spaces, **skipping any null space** (the card image). Replace the simplified MVP version (which uses `resourceTotals`) with this per-space version.

### Effect engine (one handler per `EffectType`)

Each of the 15 effect types confirmed in the card data needs an implementation. The `description` text on each effect is the display label; the `effectTypes[]` array drives logic dispatch.

| EffectType | What it does |
|---|---|
| `draw` | Draw card(s) of specified age into hand |
| `score` | Move card(s) to score pile (face-down) |
| `meld` | Place card(s) from hand onto board |
| `tuck` | Place card on bottom of a color pile |
| `return` | Place card at bottom of its supply pile |
| `splay` | Set `board[color].splay` = direction |
| `unsplay` | Set `board[color].splay` = null |
| `transfer` | Move card(s) from one player's location to another's |
| `exchange` | Swap entire locations between two players |
| `achieve` | Claim a special achievement (checked via `specialAchievement` field) |
| `reveal` | Show card(s) from hand to all players (no zone change) |
| `rearrange` | Reorder cards within a color pile (Publication card) |
| `remove` | Remove cards from the game entirely (Fission card) |
| `end` | End the game immediately; trigger score-based winner check |
| `execute` | Execute effects from a different card's dogma (rare) |

**Optional effects** (`isOptional: true`): require a player choice prompt via UI before execution. Frontend must show a confirmation/skip UI and emit the player's decision back to the server before the effect resolves.

**Repeat effects** (`repeat: true`): the effect loops until the condition is no longer met. The backend must execute these in a loop with a guard against infinite cycles.

### Special achievements (auto-claim on condition)

Five special achievements can be auto-claimed mid-dogma:

| Achievement | Trigger (from card `specialAchievement` field + rules) |
|---|---|
| Monument | Meld 4+ Castle-bearing cards in one dogma (Masonry) |
| Empire | Have 10+ of any single resource on board |
| Wonder | Have top cards of ages 6, 7, 8, 9, 10 simultaneously |
| World | Have 12+ cards in score pile |
| Universe | Have top cards covering all 5 colors, each age 6+ |

After any state change in a dogma action, the backend must check whether any unclaimed special achievement is now satisfied and auto-award it.

### Phase 5 new dependencies

Backend:
- No new packages required — all effect logic is service code using existing Drizzle queries

Frontend:
- Optional-effect prompt UI: a bottom sheet or modal per effect that requires player choice
- Splay visualization: expand `PlayerBoard` to show partially-visible covered cards per splay direction

---

## Critical Files to Reference (existing code — read-only reference)

| File | Reference for |
|---|---|
| `apps/backend/src/gameplay/services/new-game.service.ts` | Game init logic: deck building, hand dealing |
| `apps/backend/src/gameplay/services/player-actions.service.ts` | Draw/meld/turn logic |
| `apps/backend/src/gameplay/services/resources.service.ts` | Resource counting, highest board age |
| `apps/backend/src/gameplay/helpers/winner.helpers.ts` | Win condition checks |
| `apps/backend/src/gameplay/services/validation.service.ts` | Game state validation patterns |
| `packages/constants/src/` | Port directly — enums are correct |
| `packages/constants/src/sockets.ts` | Socket event names + response/error types |
| `apps/native/src/websockets/SocketProvider.tsx` | Socket client context pattern |
| `/Users/sbarli/dev/repos/game1/Game1_main_monorepo/packages/bff-db/` | db package structure |
| `/Users/sbarli/dev/repos/game1/Game1_main_monorepo/packages/bff-db-schema/src/schema.ts` | Drizzle schema patterns |
| `/Users/sbarli/dev/repos/game1/Game1_main_monorepo/apps/bff-services/src/bff-db/bff-db.service.ts` | `withRole()` pattern |

---

## Card Data Migration

The full card dataset (105 cards) is already exported to `docs/innovation_db.cards.json` in the repo. No MongoDB connection is needed.

**Script: `packages/db/scripts/generate-cards-seed.mjs`**

Reads `../../docs/innovation_db.cards.json` → writes `supabase/seeds/seed.cards.sql`. Run once and commit the SQL output.

**Field transformations:**
- `_id` → **omit** (MongoDB ObjectId; new UUID PK auto-generated by Supabase)
- `__v` → **omit** (Mongoose version key)
- `cardId` → `card_id` (kept as-is, e.g., `"MAPMAKING"` — this is the domain identifier used throughout game state)
- `dogmaResource` → `dogma_resource`
- `resourceTotals` → `resource_totals` (JSON object, all 6 resources)
- `resourceSpaces` → `resource_spaces` (JSON object: `resourceSpace1–4`; exactly one space per card is `null` — this is the decorative card image position, which contributes no resource; the other three spaces hold resource icons)
- `dogmaEffects` → `dogma_effects` (JSON array, each element has `description`, `effectTypes`, `isDemand`, `isOptional`, `repeat`, `specialAchievement`)

**Card data facts to keep in mind:**
- 105 cards total: 15 at age 1, 10 per age for ages 2–10
- All 105 cards have dogma effects (none are empty)
- Max 3 dogma effects per card
- 15 distinct `effectTypes` across all cards (see `EffectType` enum in constants)
- 5 special achievements referenced: Empire, Monument, Universe, Wonder, World
- **Every card has exactly 1 null space** (the card image position). Its location varies per card: space1 on 52 cards, space4 on 30, space3 on 15, space2 on 8. Do not assume space1 is always the image — always filter by `!= null` when counting resources

**Generated SQL format:**
```sql
INSERT INTO public.cards (card_id, name, age, color, dogma_resource, resource_totals, resource_spaces, dogma_effects)
VALUES
  ('MAPMAKING', 'Mapmaking', 2, 'green', 'crowns',
   '{"castles":1,"crowns":2,"leaves":0,"lightbulbs":0,"factories":0,"timepieces":0}',
   '{"resourceSpace1":null,"resourceSpace2":"crowns","resourceSpace3":"crowns","resourceSpace4":"castles"}',
   '[{"description":"I DEMAND...","effectTypes":["transfer","score"],"isDemand":true,"isOptional":false,"repeat":false,"specialAchievement":null}]'
  ),
  ...
ON CONFLICT (card_id) DO NOTHING;
```

---

## Verification Checklist

**Repo setup:**
- [ ] `pnpm install` at root completes without errors
- [ ] `pnpm turbo build` builds all packages and apps

**Backend:**
- [ ] `pnpm --filter @inno/backend start:dev` starts on port 8080
- [ ] `GET /health` returns 200
- [ ] `POST /users/profile` with valid Supabase JWT creates user row
- [ ] `GET /users/me` returns profile
- [ ] Card seed SQL populates 105 cards in local Supabase

**Rooms:**
- [ ] Can create a room, list rooms, join a room (REST)
- [ ] Two WebSocket clients connect and join the same room
- [ ] Both receive `USER_JOINED_ROOM` broadcast

**Game loop:**
- [ ] `POST /rooms/:roomId/games` initializes game; both clients receive `GAME_STARTED`
- [ ] Draw: deck shrinks by 1, hand grows by 1, `GAME_UPDATED` broadcast
- [ ] Meld: card leaves hand, appears on board color pile
- [ ] Achieve: score threshold validated, achievement claimed, `GAME_UPDATED` broadcast
- [ ] Turn advances (action 1 → 2 → opponent's turn)
- [ ] Win condition: 6 achievements → `stage = COMPLETE`

**Frontend:**
- [ ] Expo starts on iOS simulator
- [ ] Expo starts on Android emulator
- [ ] `expo start --web` renders correctly in browser
- [ ] Signup + username registration works
- [ ] Login restores session
- [ ] Room list shows rooms; create + join work
- [ ] Game board displays cards, hand, score pile
- [ ] Actions (Draw/Meld/Achieve) trigger correctly; both clients see updates

**Deployment (GCP):**
- [ ] Docker image builds locally: `docker build -f apps/backend/Dockerfile .`
- [ ] GitHub Actions workflow authenticates to GCP and deploys on push to main

---

## Full Game Completion — What Changes for Dogma, Splay, and 4-Player

This section describes all the code changes required on top of the MVP to reach a fully rules-complete implementation of Innovation.

### 1. Splay Mechanic

**What changes:**

`packages/db-schema/src/types.ts` — `ColorPile` type already has `splay: SplayDirection | null`. No schema migration needed; `board` is already `jsonb`.

`apps/backend/src/gameplay/services/resources.service.ts` — Replace the simplified `countResourcesOnBoard` with a splay-aware version:
- For the top card of each color pile: count all non-null spaces (all four positions, excluding whichever is null — the image — regardless of which space number it is)
- For each covered card, count based on `board[color].splay`:
  - `null` (unsplayed): 0 icons visible
  - `'left'`: `resourceSpace4` if non-null
  - `'right'`: non-null values among `resourceSpace3` + `resourceSpace4`
  - `'up'`: non-null values among `resourceSpace2` + `resourceSpace3` + `resourceSpace4`
- Card data pre-computes `resourceTotals` as the sum of all non-null spaces; do **not** use this for splay-aware counting — always use the per-space data since covered cards only expose a subset of spaces
- The splay-to-space mapping must be verified against the physical card layout and stored as a hardcoded constant

`apps/backend/src/gameplay/services/player-actions.service.ts` — Add `tuckCard()`:
- Inserts a card at the bottom of `board[color].cards`
- Preserves existing splay direction

**New socket event:** `GAME_SPLAY_UPDATED` (or include splay state in the existing `GAME_UPDATED` broadcast — simpler)

`apps/native/src/games/PlayerBoard.tsx` — Expand card stack rendering to show partially-visible covered cards per splay direction. MVP shows stacks as a count badge; full version renders offset card edges revealing the visible icon slots.

---

### 2. Dogma Action — Backend

**New API endpoint:**
```
POST /games/:gameId/dogma    body: { cardId: string }
```

**`apps/backend/src/gameplay/gameplay.controller.ts`** — Add `dogma` endpoint, wire to `DogmaService`.

**New service: `apps/backend/src/gameplay/services/dogma.service.ts`**

This is the largest single service in the codebase. Responsibilities:

```
executeDogmaAction(gameId, activePlayerId, cardId):
  1. Load game state + all player details
  2. validationService.validateIsCurrentPlayer()
  3. Verify cardId is a top card on active player's board
  4. Load card from CardsService
  5. Count active player's featured icon (card.dogmaResource) using splay-aware resourcesService
  6. For each other player: determine if eligible-to-share (count >= active player's)
  7. sharingOccurred = false
  8. For each dogmaEffect in card.dogmaEffects (in order):
       a. If isDemand: execute demand for each ineligible opponent clockwise
       b. Else: for each eligible opponent clockwise → execute effect; if state changed → sharingOccurred = true
       c. Execute effect for active player
  9. If sharingOccurred: active player draws 1 card (free draw)
  10. advanceAction()
  11. Check special achievements
  12. Return updated FullGameState
```

**New service: `apps/backend/src/gameplay/services/effect-executor.service.ts`**

One method per `EffectType`. Each method takes `(executingPlayerId, gameState, effectParams)` and returns updated game state. Runs inside the same Drizzle transaction as the full dogma action.

Key implementations by complexity:

| Effect | Complexity | Notes |
|---|---|---|
| `draw` | Low | Same as Draw action; parse age from description |
| `score` | Low | Move card from hand/board to score pile |
| `meld` | Low | Same as Meld action; parse conditions from description |
| `tuck` | Low | Insert at bottom of color pile |
| `return` | Low | Remove from hand/score/board, insert at bottom of supply |
| `splay` | Low | Set `board[color].splay`; parse direction from description |
| `unsplay` | Low | Set `board[color].splay = null` |
| `reveal` | Low | No zone change; broadcast revealed card to all players |
| `transfer` | Medium | Move card between two players' zones |
| `exchange` | Medium | Swap two zone arrays atomically |
| `achieve` | Medium | `specialAchievement` field names the target; check conditions |
| `rearrange` | Medium | Reorder `board[color].cards`; retain splay direction |
| `end` | Medium | Trigger immediate game end + winner check |
| `execute` | High | Load a different card's effects and run them (recursive call guard needed) |
| `remove` | High | Fission card: remove all hands, score piles, board cards from game; only achievements remain |

**Effect parameter parsing:** Each effect's `description` text contains the parameters (e.g., "draw a 3", "splay your blue cards right"). For MVP Dogma, parse these with targeted string matching per card. A full parser/DSL is an optional refactor. The `effectTypes[]` array tells you what kind of operation to expect; the description gives the specific parameters.

**`isOptional: true` effects:** The server must pause execution, emit a `DOGMA_REQUIRES_CHOICE` socket event to the executing player with the effect description, wait for a `DOGMA_CHOICE_RESPONSE` event, then resume. This requires either:
- A short-lived promise stored in-memory keyed to `gameId + playerId` (simpler), or
- A persistent `pending_dogma_choice` column on the game row (more robust for reconnects)

**`repeat: true` effects:** Wrap the effect call in a `while (conditionStillMet())` loop. Guard with a max-iterations limit (e.g., 50) to prevent infinite loops.

---

### 3. Dogma Action — Frontend

**New action button:** Add Dogma to `ActionButtons.tsx`. On press, show a card picker from the player's top cards.

**New flow: card picker → effect execution → optional choice prompts:**

```
User taps "Dogma"
  → Show top card picker (1 card per color on board)
  → User selects card
  → POST /games/:gameId/dogma { cardId }
  → Server may emit DOGMA_REQUIRES_CHOICE for optional effects
  → If choice required: show prompt (e.g., "Do you want to splay your purple cards left?")
  → User confirms/skips → emit DOGMA_CHOICE_RESPONSE
  → Server completes effect, broadcasts GAME_UPDATED
```

New socket events needed:
- `DOGMA_REQUIRES_CHOICE` → server → active player: `{ effectDescription, effectType, choiceType }`
- `DOGMA_CHOICE_RESPONSE` → client → server: `{ choice: boolean | string }`

**Board updates:** After a dogma involving splay, the `PlayerBoard` needs to re-render with the new splay visual.

---

### 4. Special Achievements

The 5 special achievements auto-claim when conditions are met. Check after every state-changing action (dogma effects, but also standard Draw/Meld/Achieve in edge cases).

**`apps/backend/src/gameplay/services/winner.service.ts`** — Add `checkSpecialAchievements(gameState)`:

| Achievement | Condition |
|---|---|
| Monument | Triggered only by the Masonry dogma effect (`specialAchievement: "Monument"` field) — not auto-checked globally |
| Empire | Any player has ≥ 10 icons of a single resource type across their visible board |
| Wonder | A player has top cards at ages 6, 7, 8, 9, and 10 simultaneously |
| World | A player has ≥ 12 cards in their score pile |
| Universe | A player has top cards on all 5 colors, each with value ≥ 6 |

Check after every `GAME_UPDATED` state change. The first player to satisfy a condition (tie broken by turn order clockwise) claims it immediately. Claimed special achievements move to `player_game_details.special_achievements`.

---

### 5. 4-Player Support

**What changes across the codebase:**

`packages/constants/src/rooms.ts`:
- `MAX_USERS_PER_ROOM`: change from `2` to `4`
- Add `ACHIEVEMENT_THRESHOLDS`: `{ 2: 6, 3: 5, 4: 4 }` (also applies to 2-player teams = 6)

`apps/backend/src/rooms/rooms.service.ts`:
- `addPlayer()`: enforce max based on room's intended player count (2, 3, or 4)
- Consider adding a `playerCount: 2 | 3 | 4` field to the `rooms` table (new migration)

`apps/backend/src/gameplay/services/new-game.service.ts`:
- `createGame()`: handle 3 or 4 players; deal 2 cards to each
- `advanceAction()`: turn order wraps around up to 4 player indices

`apps/backend/src/gameplay/services/winner.service.ts`:
- `checkAchievementWin()`: look up threshold from `ACHIEVEMENT_THRESHOLDS[playerCount]`

`apps/backend/src/gameplay/services/dogma.service.ts`:
- Sharing / demand logic already iterates over all other players — works for 3–4 players
- Team game (optional): add `teams: [[p1, p3], [p2, p4]]` field to game; skip teammate demands; skip teammate sharing for free-draw trigger

**New migration** (`TIMESTAMP_add_player_count.sql`):
```sql
ALTER TABLE public.rooms ADD COLUMN player_count INTEGER NOT NULL DEFAULT 2;
```

`apps/native` — Update lobby UI to show player count selector (2, 3, or 4) when creating a room.

---

### Summary: Sequencing for Full Game

```
Phase 5a: Splay mechanic (board visual + resource counting rewrite)
           → prerequisite for accurate Dogma icon counting

Phase 5b: Dogma action — non-demand, non-optional effects only
           → get sharing + free-draw working for simple draw/score/meld/tuck/return effects

Phase 5c: Demand effects + eligible-to-share logic
           → requires multi-player game state handling to be solid

Phase 5d: Optional effects (isOptional: true)
           → requires DOGMA_REQUIRES_CHOICE socket round-trip

Phase 5e: Repeat effects, complex effects (exchange, execute, remove, rearrange)
           → edge cases, guard against loops

Phase 5f: Special achievements (Empire, Wonder, World, Universe)
           + Monument (already handled in effect executor)

Phase 6:  4-player support (room player count, turn order, achievement thresholds)
           → can be done in parallel with Phase 5 since it's mostly additive
```
