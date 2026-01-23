#!/usr/bin/env bash
set -euo pipefail

BRANCH="${CF_PAGES_BRANCH:-}"

if [[ -z "$BRANCH" ]]; then
	echo "CF_PAGES_BRANCH is not set; skipping build."
	exit 0
fi

case "$BRANCH" in
	main|dev)
		echo "Building branch: $BRANCH"
		PAGES_FUNCTIONS=true RUN_CODE_SNIPPETS=false astro build
		;;
	*)
		echo "Skipping build for branch '$BRANCH' (only main/dev deploy)."
		;;
esac
