FROM node:22-alpine AS builder
WORKDIR /app

# Copy workspace config
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/ ./packages/
COPY apps/backend/ ./apps/backend/

RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm --filter @inno/constants build
RUN pnpm --filter @inno/utils build
RUN pnpm --filter @inno/backend build

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080
CMD ["node", "dist/main"]
