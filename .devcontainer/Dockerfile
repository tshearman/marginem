FROM mcr.microsoft.com/devcontainers/javascript-node:22-bookworm

# Native toolchain + SQLite headers for better-sqlite3 and GHC for Haskell snippets.
RUN apt-get update && \
	apt-get install -y --no-install-recommends build-essential python3 python3-numpy pkg-config libsqlite3-dev ghc sbcl && \
	rm -rf /var/lib/apt/lists/*
