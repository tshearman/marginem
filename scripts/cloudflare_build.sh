#!/usr/bin/env bash
set -euo pipefail

# Resolve branch (Cloudflare sets CF_PAGES_BRANCH / CF_PAGES_COMMIT_BRANCH; fall back to CI vars or git)
BRANCH="${CF_PAGES_BRANCH:-${CF_PAGES_COMMIT_BRANCH:-${BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')}}}"

if [[ -z "$BRANCH" ]]; then
	echo "Branch is unknown; defaulting to main for build."
	BRANCH="main"
fi

case "$BRANCH" in
	main|dev)
		echo "Building branch: $BRANCH"
		echo "Config status (secrets show set/missing only):"
		printf '  RESEND_API_KEY: %s\n' "${RESEND_API_KEY:+set}"
		printf '  SUBSCRIBE_HMAC_SECRET: %s\n' "${SUBSCRIBE_HMAC_SECRET:+set}"
		printf '  RESEND_AUDIENCE_ID: %s\n' "${RESEND_AUDIENCE_ID:-missing}"
		printf '  RESEND_FROM_EMAIL: %s\n' "${RESEND_FROM_EMAIL:-missing}"
		printf '  RESEND_FROM_NAME: %s\n' "${RESEND_FROM_NAME:-missing}"
		printf '  NEWSLETTER_SITE_URL: %s\n' "${NEWSLETTER_SITE_URL:-missing}"
		PAGES_FUNCTIONS=true RUN_CODE_SNIPPETS=false astro build
		;;
	*)
		echo "Skipping build for branch '$BRANCH' (only main/dev build)."
		;;
esac
