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
		PAGES_FUNCTIONS=true RUN_CODE_SNIPPETS=false astro build
		;;
	*)
		echo "Skipping build for branch '$BRANCH' (only main/dev build)."
		;;
esac
