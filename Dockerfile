# 1. Base stage: Set platform to BUILDPLATFORM so apk/yarn run natively on host architecture
FROM --platform=$BUILDPLATFORM node:24-alpine AS base
RUN apk add --no-cache openssl
WORKDIR /app

# 2. Dependencies stage
FROM base AS dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 3. Builder stage
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn prisma generate
RUN yarn run build

# 4. Final production runtime stage
FROM --platform=$BUILDPLATFORM node:24-alpine AS production
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
