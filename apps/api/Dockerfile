# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS base

ENV HUSKY=0
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

FROM base AS pruner

WORKDIR /repo

COPY . .

RUN pnpm dlx turbo@2.9.16 prune api --docker --out-dir /repo/out

FROM base AS installer

WORKDIR /app

COPY --from=pruner /repo/out/json/ .

RUN pnpm install --frozen-lockfile

COPY --from=pruner /repo/out/full/ .

RUN pnpm --filter api build

FROM installer AS deploy

RUN pnpm --filter api --prod deploy /prod/api

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=deploy /prod/api/package.json ./package.json
COPY --from=deploy /prod/api/node_modules ./node_modules
COPY --from=installer /app/apps/api/dist ./dist

EXPOSE 4000

USER node

CMD ["node", "dist/index.js"]