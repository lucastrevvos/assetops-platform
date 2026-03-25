FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages

RUN npm install
RUN npm run build --workspace=@assetops/shared-types
RUN npm run build --workspace=query-api

FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY apps/query-api/package*.json ./apps/query-api/
COPY packages/shared-types/package*.json ./packages/shared-types/

RUN npm install --omit=dev

COPY --from=builder /app/apps/query-api/dist ./apps/query-api/dist
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist

WORKDIR /app/apps/query-api

EXPOSE 3334

CMD ["node", "dist/server.js"]