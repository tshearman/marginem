#!/usr/bin/env bash
set -euo pipefail

# Resolve branch (Cloudflare sets CF_PAGES_BRANCH / CF_PAGES_COMMIT_BRANCH; fall back to CI vars or git)
BRANCH="${CF_PAGES_BRANCH:-${CF_PAGES_COMMIT_BRANCH:-${BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '')}}}"

if [[ -z "$BRANCH" ]]; then
	echo "Branch is unknown; defaulting to main for deploy."
	BRANCH="main"
fi

case "$BRANCH" in
	main|dev)
		echo "Deploying branch: $BRANCH"
		npx wrangler pages deploy ../dist --project-name marginem --branch "$BRANCH" --cwd src
		;;
	*)
		echo "Skipping deploy for branch '$BRANCH' (only main/dev deploy)."
		;;
esac
