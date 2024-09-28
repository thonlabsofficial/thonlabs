# syntax = docker/dockerfile:1

#######################
### PROD DOCKERFILE ###
#######################
FROM node:20.17-slim AS builder

WORKDIR /app

ARG PROJECT

RUN npm i -g turbo pnpm

COPY . ./source

WORKDIR /app/source
RUN turbo prune --scope=${PROJECT} --docker

WORKDIR /app
RUN mv /app/source/out/pnpm-lock.yaml /app/pnpm-lock.yaml && \
    mv /app/source/out/full/* /app/ && \
    rm -rf /app/source

RUN pnpm install

ENV NODE_ENV=production

RUN turbo build --filter=${PROJECT}

RUN pnpm prune --prod && \
  pnpm store prune
# -------------------------------------------------- #
FROM node:20.17-slim AS runner

WORKDIR /app

ARG PROJECT

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 thonlabs
USER thonlabs

COPY --from=builder --chown=thonlabs:nodejs /app .

WORKDIR /app/apps/${PROJECT}

CMD ["npm", "start"]