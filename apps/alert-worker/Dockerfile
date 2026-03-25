FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps ./apps
COPY packages ./packages
COPY tsconfig.base.json ./

RUN npm install
RUN npm run build --workspace=@assetops/shared-types
RUN npm run build --workspace=alert-worker

FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY apps/alert-worker/package*.json ./apps/alert-worker/
COPY packages/shared-types/package*.json ./packages/shared-types/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/alert-worker/dist ./apps/alert-worker/dist
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist

WORKDIR /app/apps/alert-worker

CMD ["node", "dist/worker.js"]