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
HEALTH_PATH="${PROMOTION_HEALTH_PATH:-/health}"
HEALTH_TIMEOUT="${PROMOTION_HEALTH_TIMEOUT_SECONDS:-5}"
HEALTH_RETRIES="${PROMOTION_HEALTH_RETRIES:-3}"
HEALTH_SLEEP="${PROMOTION_HEALTH_SLEEP_SECONDS:-3}"
HEALTH_INITIAL_SLEEP="${PROMOTION_HEALTH_INITIAL_SLEEP_SECONDS:-2}"

BUILD_DEST="deploy/builds/$TARGET_COLOR/dist"
if [[ "$TARGET_COLOR" == "green" && -n "${GREEN_BUILD_DIR:-}" ]]; then
	BUILD_DEST="${GREEN_BUILD_DIR}"
elif [[ "$TARGET_COLOR" == "blue" && -n "${BLUE_BUILD_DIR:-}" ]]; then
	BUILD_DEST="${BLUE_BUILD_DIR}"
fi

# Resolve relative paths against repo root for safety.
if [[ "$BUILD_DEST" != /* ]]; then
	BUILD_DEST="$ROOT_DIR/$BUILD_DEST"
fi

echo "Active color: $ACTIVE_COLOR_LOWER"
echo "Target color: $TARGET_COLOR"

echo "Running test suite..."
npm test

echo "Building site..."
npm run clean:build 2>/dev/null || rm -rf dist .astro
npm run build

echo "Building container image $SITE_IMAGE..."
docker build -t "$SITE_IMAGE" .

echo "Staging dist/ to $BUILD_DEST"
rm -rf "$BUILD_DEST"
mkdir -p "$BUILD_DEST"
rsync -a dist/ "$BUILD_DEST"/

echo "Starting app-$TARGET_COLOR with new build..."
docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
	-f "$COMPOSE_FILE" up -d "app-$TARGET_COLOR"

echo "Compose status for app-$TARGET_COLOR:"
docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
	-f "$COMPOSE_FILE" ps "app-$TARGET_COLOR"

# Ensure the running container sees the new dist (in case of stale or empty mounts).
if ! docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
	-f "$COMPOSE_FILE" exec "app-$TARGET_COLOR" sh -c '[ -d /app/dist ] && [ "$(ls -A /app/dist | wc -l)" -gt 0 ]'; then
	echo "Container dist is missing or empty; copying build into app-$TARGET_COLOR..."
	docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
		-f "$COMPOSE_FILE" cp dist/. "app-$TARGET_COLOR:/app/dist/"
	echo "Restarting app-$TARGET_COLOR to remount dist..."
	docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
		-f "$COMPOSE_FILE" restart "app-$TARGET_COLOR"
	echo "Compose status after restart:"
	docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
		-f "$COMPOSE_FILE" ps "app-$TARGET_COLOR"
fi

echo "Health checking app-$TARGET_COLOR at $HEALTH_PATH (retries=$HEALTH_RETRIES, timeout=$HEALTH_TIMEOUT, sleep=$HEALTH_SLEEP, initial_delay=$HEALTH_INITIAL_SLEEP)..."
sleep "$HEALTH_INITIAL_SLEEP"
health_ok=0
for attempt in $(seq 1 "$HEALTH_RETRIES"); do
	if docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
		-f "$COMPOSE_FILE" exec reverse-proxy \
		sh -c "wget -q --timeout=$HEALTH_TIMEOUT --spider http://app-$TARGET_COLOR:$APP_PORT$HEALTH_PATH"; then
		echo "Health check passed on attempt $attempt."
		health_ok=1
		break
	fi
	echo "Health check attempt $attempt failed; waiting $HEALTH_SLEEP seconds before retry..."
	sleep "$HEALTH_SLEEP"
done

if [[ "$health_ok" -ne 1 ]]; then
	echo "Health check failed after $HEALTH_RETRIES attempts."
	exit 1
fi

echo "Health check passed. Promoting $TARGET_COLOR..."
docker compose --env-file "$ENV_FILE" --env-file "$SECRETS_FILE" \
	-f "$COMPOSE_FILE" exec \
		-e ACTIVE_COLOR="$TARGET_COLOR" \
		-e APP_PORT="$APP_PORT" \
		-e PROMOTION_HEALTH_PATH="$HEALTH_PATH" \
		reverse-proxy \
	sh -c "envsubst '\$ACTIVE_COLOR \$APP_PORT \$PROMOTION_HEALTH_PATH' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -s reload"

tmp_env="$(mktemp)"
awk -v color="$TARGET_COLOR" '
	BEGIN { updated=0 }
	/^ACTIVE_COLOR=/ { print "ACTIVE_COLOR=" color; updated=1; next }
	{ print }
	END { if (updated==0) print "ACTIVE_COLOR=" color }
' "$ENV_FILE" > "$tmp_env"
mv "$tmp_env" "$ENV_FILE"

echo "Promotion complete. ACTIVE_COLOR is now $TARGET_COLOR."
