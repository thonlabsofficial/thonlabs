# syntax = docker/dockerfile:1

#######################
### PROD DOCKERFILE ###
#######################

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.17.0

FROM node:20.17-slim as base

WORKDIR /app

ARG PROJECT

LABEL fly_launch_runtime="NodeJS"

RUN npm i -g turbo

COPY . .

RUN turbo prune --scope=${PROJECT} --docker

# -------------------------------------------------- #
FROM base as builder

WORKDIR /app

ARG PROJECT

ENV NODE_ENV=production

COPY --from=pruner /app/out/pnpm-lock.json ./pnpm-lock.json
COPY --from=pruner /app/out/json/ .

RUN pnpm install

COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=${PROJECT}

RUN pnpm prune --prod && \
  pnpm store prune

RUN rm -rf ./**/*/src

# -------------------------------------------------- #
# Final stage for app image
FROM base AS runner

WORKDIR /app

ARG PROJECT

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 thonlabs
USER thonlabs

COPY --from=builder --chown=thonlabs:nodejs /app .

WORKDIR /app/apps/${PROJECT}

CMD ["node", "dist/index.js"]