# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# ADD THIS - install native build dependencies
RUN apk add --no-cache python3 make g++ linux-headers eudev-dev

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]