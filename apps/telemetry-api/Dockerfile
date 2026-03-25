FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages

RUN npm install
RUN npm run build --workspace=@assetops/shared-types
RUN npm run build --workspace=telemetry-api

FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY apps/telemetry-api/package*.json ./apps/telemetry-api/
COPY packages/shared-types/package*.json ./packages/shared-types/

RUN npm install --omit=dev

COPY --from=builder /app/apps/telemetry-api/dist ./apps/telemetry-api/dist
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist

WORKDIR /app/apps/telemetry-api

EXPOSE 3333

CMD ["node", "dist/server.js"]