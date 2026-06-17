# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base

ENV HUSKY=0
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

FROM base AS pruner

WORKDIR /repo

COPY . .

RUN pnpm dlx turbo@2.9.16 prune docs --docker --out-dir /repo/out

FROM base AS installer

WORKDIR /app

COPY --from=pruner /repo/out/json/ .

RUN pnpm install --frozen-lockfile

COPY --from=pruner /repo/out/full/ .

RUN pnpm --filter docs build

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3001

COPY --from=installer /app/apps/docs/.next/standalone ./
COPY --from=installer /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=installer /app/apps/docs/public ./apps/docs/public

EXPOSE 3001

USER node

CMD ["node", "apps/docs/server.js"]