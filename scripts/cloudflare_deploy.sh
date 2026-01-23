#!/usr/bin/env bash
set -euo pipefail

BRANCH="${CF_PAGES_BRANCH:-}"

if [[ -z "$BRANCH" ]]; then
	echo "CF_PAGES_BRANCH is not set; skipping deploy."
	exit 0
fi

case "$BRANCH" in
	main|dev)
		echo "Deploying branch: $BRANCH"
		PAGES_FUNCTIONS=true npx wrangler pages deploy dist --project-name marginem --branch "$BRANCH"
		;;
	*)
		echo "Skipping deploy for branch '$BRANCH' (only main/dev deploy)."
		;;
esac
