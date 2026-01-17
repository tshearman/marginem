# syntax=docker/dockerfile:1.5
# Build and run the Astro app with the Node adapter in a minimal runtime image.
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NODE_ENV=production

# Install deps (native build tools required for better-sqlite3 + Haskell snippets).
FROM base AS deps
RUN apt-get update && \
	apt-get install -y --no-install-recommends python3 python3-numpy build-essential pkg-config libsqlite3-dev ghc sbcl && \
	rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

# Build the Astro site.
FROM deps AS build
COPY . .
RUN --mount=type=secret,id=visitor_cookie_secret \
	sh -c '\
		VISITOR_COOKIE_SECRET=$(if [ -f /run/secrets/visitor_cookie_secret ]; then \
			grep "^VISITOR_COOKIE_SECRET=" /run/secrets/visitor_cookie_secret | head -n1 | cut -d= -f2-; \
		fi); \
		export VISITOR_COOKIE_SECRET=${VISITOR_COOKIE_SECRET:-build-placeholder}; \
		npm run build; \
	'

# Production image with only runtime bits.
FROM base AS runner
RUN apt-get update && \
	apt-get install -y --no-install-recommends libsqlite3-0 && \
	rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV HOST=0.0.0.0 PORT=4321
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
RUN chown -R node:node /app
USER node

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
