#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="${ENV_FILE:-deploy/config/deploy.env}"
SECRETS_FILE="${SECRETS_FILE:-deploy/config/secrets.env}"
COMPOSE_FILE="deploy/docker-compose.bluegreen.yml"

if [[ ! -f "$ENV_FILE" ]]; then
	echo "Missing env file: $ENV_FILE" >&2
	exit 1
fi
if [[ ! -f "$SECRETS_FILE" ]]; then
	echo "Missing secrets file: $SECRETS_FILE" >&2
	exit 1
fi

set -a
source "$ENV_FILE"
set +a

ACTIVE_COLOR_LOWER=$(echo "${ACTIVE_COLOR:-blue}" | tr '[:upper:]' '[:lower:]')
if [[ "$ACTIVE_COLOR_LOWER" == "blue" ]]; then
	TARGET_COLOR="green"
else
	TARGET_COLOR="blue"
fi

APP_PORT="${APP_PORT:-4321}"
PREVIEW_PORT="${PREVIEW_PORT:-4322}"

BUILD_DEST="deploy/builds/$TARGET_COLOR/dist"
if [[ "$TARGET_COLOR" == "green" && -n "${GREEN_BUILD_DIR:-}" ]]; then
	BUILD_DEST="${GREEN_BUILD_DIR}"
elif [[ "$TARGET_COLOR" == "blue" && -n "${BLUE_BUILD_DIR:-}" ]]; then
	BUILD_DEST="${BLUE_BUILD_DIR}"
fi

if [[ "$BUILD_DEST" != /* ]]; then
	BUILD_DEST="$ROOT_DIR/$BUILD_DEST"
fi

echo "Active color: $ACTIVE_COLOR_LOWER"
echo "Previewing inactive color: $TARGET_COLOR"

echo "Building site..."
npm run clean:build 2>/dev/null || rm -rf dist .astro
npm run build

echo "Building container image ${SITE_IMAGE:-blogupdate:latest}..."
docker build -t "${SITE_IMAGE:-blogupdate:latest}" .

echo "Staging dist/ to $BUILD_DEST"
rm -rf "$BUILD_DEST"
mkdir -p "$BUILD_DEST"
rsync -a dist/ "$BUILD_DEST"/

echo "Starting app-$TARGET_COLOR with new build..."
docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
	-f "$COMPOSE_FILE" up -d "app-$TARGET_COLOR"

tmp_override="$(mktemp)"
cat > "$tmp_override" <<EOF
services:
  app-blue:
    ports:
      - "${PREVIEW_PORT}:${APP_PORT}"
  app-green:
    ports:
      - "${PREVIEW_PORT}:${APP_PORT}"
EOF

docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
	-f "$COMPOSE_FILE" -f "$tmp_override" up -d "app-$TARGET_COLOR"

rm -f "$tmp_override"

echo "Preview ready: http://localhost:$PREVIEW_PORT"
