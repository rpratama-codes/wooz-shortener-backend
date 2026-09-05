# 1. Base stage: Install dependencies & OpenSSL for Alpine
FROM node:24-alpine AS base
RUN apk add --no-cache openssl
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2. Builder stage: Generate Prisma client and build application
FROM base AS builder
WORKDIR /app
COPY . .
# Generate Prisma client with the correct binary engine for Alpine
RUN yarn prisma generate
RUN yarn run build

# 3. Production stage: Minimal runtime image
FROM node:24-alpine AS production
# OpenSSL is required at runtime by Prisma's query engine
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
