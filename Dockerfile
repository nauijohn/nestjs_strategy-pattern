# Stage 1: Dependencies
FROM node:22-alpine AS deps

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Disable Husky inside Docker
ENV HUSKY=0

# Copy lockfile + package.json first for better caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev for build)
RUN pnpm install --frozen-lockfile


# Stage 2: Build
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Disable Husky inside Docker
ENV HUSKY=0

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy the rest of the source
COPY . .

# Build NestJS project
RUN pnpm build


# Stage 3: Production
FROM node:22-alpine AS production

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Disable husky and scripts
ENV HUSKY=0
ENV NPM_CONFIG_IGNORE_SCRIPTS=true

# Copy only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy compiled dist from builder
COPY --from=builder /app/dist ./dist

# Expose NestJS default port
EXPOSE 3000

# Run app
CMD ["node", "dist/main.js"]
