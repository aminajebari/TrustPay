# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:25-bookworm AS builder

# Environment setup
ENV DEBIAN_FRONTEND=noninteractive \
    RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:$PATH

# 1. Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential pkg-config libssl-dev libudev-dev libclang-dev \
    protobuf-compiler curl git wget ca-certificates bzip2 \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Rust 1.91.1 (exact match with your Mac)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \
    --default-toolchain 1.91.1 \
    --profile minimal \
    --component rust-src \
    --no-modify-path

RUN rustc --version && cargo --version

# 3. Install Solana CLI — exact same version as your local machine (Agave 3.0.10)
RUN sh -c "$(curl -sSfL https://release.anza.xyz/v3.0.10/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

RUN solana --version

# 4. Install Anchor CLI v0.32.1
RUN cargo install --git https://github.com/coral-xyz/anchor --tag v0.32.1 anchor-cli --locked --force
RUN anchor --version

# 5. Set up app directory
WORKDIR /app

# 6. Install root dependencies (supports both yarn and npm)
COPY package.json yarn.lock* package-lock.json* ./
RUN if [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile --network-timeout 600000; \
    elif [ -f package-lock.json ]; then \
        npm ci; \
    else \
        npm install; \
    fi

# 7. Install Anchor program dependencies
COPY anchor/package.json anchor/yarn.lock* anchor/package-lock.json* ./anchor/
WORKDIR /app/anchor
RUN if [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile --network-timeout 600000; \
    elif [ -f package-lock.json ]; then \
        npm ci; \
    else \
        npm install; \
    fi

# 8. Copy source code
WORKDIR /app
COPY . .

# Remove any conflicting toolchain files
RUN rm -f rust-toolchain rust-toolchain.toml anchor/rust-toolchain anchor/rust-toolchain.toml

# 9. Generate Solana keypair + configure devnet
RUN mkdir -p /root/.config/solana && \
    solana-keygen new --no-bip39-passphrase --force --silent -o /root/.config/solana/id.json && \
    solana config set --url devnet

# 10. Build Anchor program
WORKDIR /app/anchor
RUN anchor build

# 11. Build Next.js app
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production
RUN if [ -f yarn.lock ]; then yarn build; else npm run build; fi


# ==========================================
# Stage 2: Runtime (slim)
# ==========================================
FROM node:25-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production PORT=3000 NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates dumb-init && rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs

# Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static   ./.next/static
COPY --from=builder                     /app/public          ./public

# Anchor – only what the frontend imports
COPY --from=builder --chown=nextjs:nodejs /app/anchor/target/idl   ./anchor/target/idl
COPY --from=builder --chown=nextjs:nodejs /app/anchor/target/types ./anchor/target/types

USER nextjs
EXPOSE 3000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]