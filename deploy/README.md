# Blue/Green deployment with Docker Compose

This stack runs two app containers (`app-blue`, `app-green`) behind an nginx reverse proxy. Traffic goes to the color named in `ACTIVE_COLOR`; the inactive color is used for staging new builds, health checking, and then promotion.

## Files
- `deploy/docker-compose.bluegreen.yml`: blue/green stack + proxy.
- `deploy/config/deploy.env`: configuration (ports, quiet time, health path, build roots, secrets).
- `deploy/nginx/`: proxy config and envsubst template.
- `deploy/builds/blue/dist`, `deploy/builds/green/dist`: drop built artifacts here (one color live, one staged).
- `deploy/scripts/watch-content.mjs`: host-side watcher that rebuilds on content changes and promotes the inactive color without restarting the proxy.

## First-time setup
1) Build the runtime image: `docker build -t blogupdate .` (or push a remote tag and set `SITE_IMAGE`).
2) Copy/update `deploy/config/deploy.env` with your ports and paths. Copy `deploy/config/secrets.env.example` to `deploy/config/secrets.env` and set a strong `VISITOR_COOKIE_SECRET`.
3) Build once for each color so both containers start cleanly:
   ```bash
   npm run build
   rm -rf deploy/builds/blue/dist deploy/builds/green/dist
   mkdir -p deploy/builds/blue/dist deploy/builds/green/dist
   rsync -a dist/ deploy/builds/blue/dist/
   rsync -a dist/ deploy/builds/green/dist/
   ```
4) Start the stack:
   ```bash
   docker compose --env-file deploy/config/deploy.env \
     --env-file deploy/config/secrets.env \
     -f deploy/docker-compose.bluegreen.yml up -d reverse-proxy app-blue app-green
   ```

## Deploying a new site build
Assume `ACTIVE_COLOR` is the currently live color (initially `blue`). To ship a new build:
1) Build the site locally and stage it to the inactive color (if blue is live, stage green):
   ```bash
   npm run build
   rm -rf deploy/builds/green/dist
   mkdir -p deploy/builds/green/dist
   rsync -a dist/ deploy/builds/green/dist/
   docker compose --env-file deploy/config/deploy.env \
     --env-file deploy/config/secrets.env \
     -f deploy/docker-compose.bluegreen.yml up -d app-green
   ```
2) Health check the staged color from inside the proxy container (adjust `PROMOTION_HEALTH_PATH` if you change it):
   ```bash
   docker compose --env-file deploy/config/deploy.env \
     --env-file deploy/config/secrets.env \
     -f deploy/docker-compose.bluegreen.yml exec reverse-proxy \
     wget -qO- http://app-green:${APP_PORT}${PROMOTION_HEALTH_PATH}
   ```
   Expect a 2xx status (wget exits non-zero on failure).
3) Promote by flipping the proxy to the staged color: set `ACTIVE_COLOR=green` in `deploy/config/deploy.env`, then reload the proxy:
   ```bash
   docker compose --env-file deploy/config/deploy.env \
     --env-file deploy/config/secrets.env \
     -f deploy/docker-compose.bluegreen.yml up -d reverse-proxy
   ```
4) Keep the previous color running for quick rollback, or stop it after a soak:
   ```bash
   docker compose --env-file deploy/config/deploy.env \
     --env-file deploy/config/secrets.env \
     -f deploy/docker-compose.bluegreen.yml stop app-blue
   ```
5) Roll back by reverting `ACTIVE_COLOR` and restarting `reverse-proxy`.

## Content automation hooks (quiet time + batching)
The config file holds knobs for an external watcher/automation:
- `CONTENT_WATCH_QUIET_SECONDS`: wait for this idle window after vault/content changes before triggering a build.
- `CONTENT_BUILD_RATE_LIMIT_SECONDS`: minimum gap between automated builds to avoid churn.
- `PROMOTION_HEALTH_PATH`, `PROMOTION_HEALTH_TIMEOUT_SECONDS`, `PROMOTION_HEALTH_RETRIES`: health gating for the staged color before promotion.

A watcher service can use these values to:
1) Watch the staged content tree (e.g., synced Obsidian vault into `content/garden`).
2) After a quiet period, build the site into the inactive color’s `deploy/builds/<color>/dist`.
3) Restart only that color (`docker compose ... up -d app-green`).
4) Health check the staged color.
5) Flip `ACTIVE_COLOR` and reload the proxy (`reverse-proxy`) for an atomic cutover.

### Running the watcher/promotion daemon

- Configure `CONTENT_STAGING_DIR`, `CONTENT_WATCH_QUIET_SECONDS`, and `CONTENT_BUILD_RATE_LIMIT_SECONDS` in `deploy/config/deploy.env`.
- From the repo root, run:
  ```bash
  node deploy/scripts/watch-content.mjs
  ```
- The script:
  - Watches `CONTENT_STAGING_DIR` for changes (debounced).
  - Runs `npm run build`.
  - Copies `dist/` into the inactive color’s `deploy/builds/<color>/dist`.
  - Restarts only the inactive app container.
  - Health checks it via the proxy container.
  - Rewrites nginx config with the new `ACTIVE_COLOR` and reloads nginx (no proxy container restart).
  - Updates `deploy/config/deploy.env` with the new `ACTIVE_COLOR` for persistence.

### Docker builds and VISITOR_COOKIE_SECRET

`VISITOR_COOKIE_SECRET` is required at build time for prerendering. The Dockerfile supports BuildKit secrets so the value never lands in the image layers:
```bash
docker build \
  --secret id=visitor_cookie_secret,src=deploy/config/secrets.env \
  -t blogupdate .
```
If the secret is not provided, a placeholder is used and build will succeed, but the runtime container still needs the real secret from `deploy/config/secrets.env` (or your secrets manager) via `env_file`.

### One-shot promote script (manual blue/green flip)

`deploy/scripts/promote.sh` builds the site, stages it to the inactive color, health checks it via the proxy, reloads nginx, and updates `ACTIVE_COLOR`:
```bash
ENV_FILE=deploy/config/deploy.env \
SECRETS_FILE=deploy/config/secrets.env \
bash deploy/scripts/promote.sh
```
Defaults:
- Reads `ACTIVE_COLOR` from `deploy/config/deploy.env` and targets the other color.
- Runs `npm test -- --runInBand` before building; aborts on failure.
- Uses `PROMOTION_HEALTH_PATH`, `PROMOTION_HEALTH_TIMEOUT_SECONDS`, and `APP_PORT` from the env file.
- Stages to `deploy/builds/<target>/dist` and runs `docker compose ... up -d app-<target>`.
- Reloads nginx in-place (no proxy restart) and writes the new `ACTIVE_COLOR` back to `deploy/config/deploy.env`.

## Code / versioned releases
- Build a tagged image (e.g., `blogupdate:2024-09-15`) and set `SITE_IMAGE` in `deploy/config/deploy.env`.
- Stage the tagged image on the inactive color (`docker compose ... pull` if remote, then `up -d app-<color>`).
- Health check, flip `ACTIVE_COLOR`, reload `reverse-proxy`, and keep the prior color for rollback.
