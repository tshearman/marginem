#!/usr/bin/env bash
# Deploy marginem to the lab's k3s (the lab's docs/site-design.md, "The
# pipeline, from the developer's side"). The lab's site-deployer does the
# rolling: it deploys the newest successful build.yml run on dev to
# marginem-preview and on main to marginem. This script only moves main and
# watches.
#
#   promote   (npm run deploy)        dev -> main, by fast-forward
#   rollback  (npm run rollback)      production back to its previous revision
#   status    (npm run deploy:status) branches, builds, what is served
#
# promote, in five steps:
#   1. refuse unless on dev, the tree is clean (nothing uncommitted or
#      untracked: it never commits for you), dev == origin/dev, and main is an
#      ancestor of dev;
#   2. wait for build.yml on HEAD to succeed, and for the preview to serve it;
#   3. git push origin dev:main (a plain push: fast-forward or refused);
#   4. wait for main's build.yml run, which finds the image already pushed;
#   5. wait until production's /.release is the sha, or the deployer marks the
#      sha failed (sites.lab/failed-sha) and its log lines are printed.
#
# rollback marks the running sha (the pod template's sites.lab/sha, which
# rollout undo reverts with the image) failed, then kubectl rollout undo. The
# deployer leaves a failed sha alone until main moves: fix forward on dev.
#
# Needs git, gh (signed in), curl and kubectl with the lab's kubeconfig
# (`lab kube config` writes ~/.kube/lab.yaml). Bash 3.2-safe.
set -euo pipefail

SITE=marginem
NAMESPACE=site-marginem
REPO=tshearman/marginem
PROD_URL=https://marginem.goblin.farm
PREVIEW_URL=https://marginem-preview.goblin.farm
WORKFLOW=build.yml
export KUBECONFIG=${KUBECONFIG:-$HOME/.kube/lab.yaml}

# Runs are read through the repo-wide runs API, matched on the workflow's
# path: a lookup of build.yml by file name 404s until the file is on main (the
# default branch), and the first promote is what puts it there.
RUN_FILTER="select((.path | split(\"@\")[0]) == \".github/workflows/$WORKFLOW\")"

DEPLOYER_NS=site-system
DEPLOYER=deploy/site-deployer
BUILD_WAIT=1800 # a build run, queued to finished
PREVIEW_WAIT=300 # the deployer's 30 s poll plus a rollout
PROD_WAIT=300    # the design's five minutes
POLL=5

say() { printf '%s\n' "$*"; }
step() { printf '==> %s\n' "$*"; }
die() {
	printf 'deploy: %s\n' "$*" >&2
	exit 1
}
short() { printf '%s' "${1:0:12}"; }
need() {
	local c
	for c in "$@"; do
		command -v "$c" >/dev/null 2>&1 || die "$c is not on PATH"
	done
}
kget() { kubectl --request-timeout=15s -n "$NAMESPACE" get "$@"; }
release_of() {
	curl --fail --silent --show-error --max-time 10 "$1/.release" | tr -d '[:space:]'
}
failed_sha_of() {
	kget deploy "$1" -o jsonpath='{.metadata.annotations.sites\.lab/failed-sha}'
}
# The sha a Deployment runs: its pod template's sites.lab/sha (rollout undo
# reverts it with the image), else the image tag.
running_sha_of() {
	local out sha image
	out=$(kget deploy "$1" -o jsonpath='{.spec.template.metadata.annotations.sites\.lab/sha}{"|"}{.spec.template.spec.containers[?(@.name=="site")].image}') ||
		return 1
	IFS='|' read -r sha image <<<"$out"
	printf '%s' "${sha:-${image##*:}}"
}

# One line per change of state, with the seconds since the wait began.
last=""
progress() {
	[[ $1 == "$last" ]] && return 0
	last=$1
	printf '    [%4ss] %s\n' "$((SECONDS - $2))" "$1"
}

# wait_build <branch> <sha>: until build.yml's push run for sha on branch
# succeeds; dies when it ends any other way.
wait_build() {
	local branch=$1 sha=$2 start=$SECONDS out status conclusion url
	last=""
	while :; do
		if out=$(gh api "repos/$REPO/actions/runs?branch=$branch&event=push&head_sha=$sha&per_page=20" \
			--jq "first(.workflow_runs[] | $RUN_FILTER) | \"\\(.status)|\\(.conclusion)|\\(.html_url)\"" 2>&1); then
			if [[ -z $out ]]; then
				progress "no $WORKFLOW run for $(short "$sha") on $branch yet" "$start"
			else
				IFS='|' read -r status conclusion url <<<"$out"
				if [[ $status == completed ]]; then
					[[ $conclusion == success ]] || die "the $branch build of $(short "$sha") ended '$conclusion': $url"
					progress "$branch build: success" "$start"
					return 0
				fi
				progress "$branch build: $status  $url" "$start"
			fi
		else
			progress "gh: ${out//$'\n'/ }" "$start"
		fi
		((SECONDS - start < BUILD_WAIT)) || die "no finished $branch build of $(short "$sha") after ${BUILD_WAIT}s"
		sleep "$POLL"
	done
}

# wait_deployed <deployment> <url> <sha> <seconds>: until url/.release is sha.
# Exits non-zero when the deployer marks sha failed on the deployment (printing
# its log lines for the sha) or when the time runs out.
wait_deployed() {
	local name=$1 url=$2 sha=$3 limit=$4 start=$SECONDS got
	last=""
	while :; do
		if got=$(release_of "$url" 2>&1); then
			if [[ $got == "$sha" ]]; then
				progress "$url serves $(short "$sha")" "$start"
				return 0
			fi
			progress "$url serves $(short "$got")" "$start"
		else
			progress "$url: ${got//$'\n'/ }" "$start"
		fi
		if [[ $(failed_sha_of "$name" 2>/dev/null || true) == "$sha" ]]; then
			say "deploy: the deployer marked $(short "$sha") failed on $name and rolled it back. Its log:" >&2
			kubectl --request-timeout=15s -n "$DEPLOYER_NS" logs "$DEPLOYER" --since=15m 2>&1 |
				grep -F "${sha:0:7}" >&2 || say "    (no deployer log line in the last 15 min names it)" >&2
			exit 1
		fi
		((SECONDS - start < limit)) || die "$url did not serve $(short "$sha") within ${limit}s and nothing is marked failed; see npm run deploy:status and kubectl -n $DEPLOYER_NS logs $DEPLOYER"
		sleep "$POLL"
	done
}

promote() {
	need git gh curl kubectl
	cd "$(git rev-parse --show-toplevel)"
	local branch dirty sha

	step "1/5 checking dev"
	branch=$(git symbolic-ref --quiet --short HEAD || true)
	[[ $branch == dev ]] || die "promote runs on dev, not ${branch:-a detached HEAD}"
	dirty=$(git status --porcelain --untracked-files=all)
	if [[ -n $dirty ]]; then
		say "deploy: the tree is not clean. Commit, stash or remove these first (deploy never commits for you):" >&2
		printf '%s\n' "$dirty" | sed 's/^/    /' >&2
		exit 1
	fi
	git fetch --quiet origin dev main
	sha=$(git rev-parse HEAD)
	[[ $sha == "$(git rev-parse origin/dev)" ]] ||
		die "dev ($(short "$sha")) is not origin/dev ($(short "$(git rev-parse origin/dev)")): push or pull first"
	git merge-base --is-ancestor origin/main HEAD ||
		die "origin/main is not an ancestor of dev (main has commits dev lacks); bring them onto dev first"
	[[ -f $KUBECONFIG ]] ||
		say "    no kubeconfig at $KUBECONFIG (lab kube config writes it): a failed deploy will show only as a timeout"
	say "    $(git log -1 --format='%h %s' --abbrev=12 HEAD)"

	step "2/5 waiting for $WORKFLOW on dev, then the preview"
	wait_build dev "$sha"
	wait_deployed "$SITE-preview" "$PREVIEW_URL" "$sha" "$PREVIEW_WAIT"

	if [[ $(git rev-parse origin/main) == "$sha" ]]; then
		step "3/5 main is already at $(short "$sha"); nothing to push"
	else
		step "3/5 git push origin dev:main"
		git push origin dev:main
	fi

	step "4/5 waiting for $WORKFLOW on main"
	wait_build main "$sha"

	step "5/5 waiting for production (${PROD_WAIT}s at most)"
	wait_deployed "$SITE" "$PROD_URL" "$sha" "$PROD_WAIT"
	say "deployed $(short "$sha") to $PROD_URL"
}

rollback() {
	need gh kubectl
	local current held desired answer

	current=$(running_sha_of "$SITE") ||
		die "cannot read deploy/$SITE in $NAMESPACE (KUBECONFIG=$KUBECONFIG; lab kube config writes it)"
	[[ -n $current ]] || die "deploy/$SITE names no running sha"
	held=$(failed_sha_of "$SITE")
	desired=$(gh api "repos/$REPO/actions/runs?branch=main&event=push&status=success&per_page=50" \
		--jq "first(.workflow_runs[] | $RUN_FILTER | .head_sha)") ||
		die "cannot read main's builds from GitHub"

	# The deployer already holds main's newest build off production (an earlier
	# rollback, or a failed rollout it undid): another undo would swap back to
	# that build, and overwriting the mark would let the deployer redeploy it.
	if [[ -n $held && $held == "$desired" && $current != "$held" ]]; then
		die "production is already held off main's $(short "$held") and serves $(short "$current"); fix forward on dev, then npm run deploy"
	fi

	say "production ($SITE) serves $(short "$current")"
	[[ -z $desired || $desired == "$current" ]] ||
		say "note: main's newest build is $(short "$desired"), not what is serving"
	read -r -p "Roll $SITE back from $(short "$current") to its previous revision? [y/N] " answer || true
	[[ $answer == [yY] || $answer == [yY][eE][sS] ]] || die "not rolled back"

	step "marking $(short "$current") failed (sites.lab/failed-sha), so the deployer leaves it"
	kubectl -n "$NAMESPACE" annotate --overwrite deploy "$SITE" "sites.lab/failed-sha=$current"
	step "kubectl rollout undo deploy/$SITE"
	kubectl -n "$NAMESPACE" rollout undo deploy "$SITE" ||
		die "rollout undo failed; $(short "$current") stays marked failed (clear it: kubectl -n $NAMESPACE annotate deploy $SITE sites.lab/failed-sha-)"
	kubectl -n "$NAMESPACE" rollout status deploy "$SITE" --timeout=180s

	say "production now serves $(short "$(running_sha_of "$SITE")")"
	say "The deployer leaves it there until main moves past $(short "$current"): fix forward on dev, then npm run deploy."
}

status() {
	need git gh curl kubectl
	cd "$(git rev-parse --show-toplevel)"
	local b u d got out sha image ready want failed

	step "branches (origin)"
	git fetch --quiet origin dev main || say "    (fetch failed; showing the last fetched refs)"
	for b in dev main; do
		git log -1 --abbrev=12 --format="    $b  %h  %s  (%cr)" "origin/$b" || true
	done

	step "latest $WORKFLOW push runs"
	for b in dev main; do
		if out=$(gh api "repos/$REPO/actions/runs?branch=$b&event=push&per_page=30" \
			--jq "[.workflow_runs[] | $RUN_FILTER][0:3][] | \"    $b  \\(.head_sha[0:12])  \\(.status) \\(.conclusion // \"\")  \\(.created_at)  \\(.html_url)\"" 2>&1); then
			say "${out:-    $b  (no runs yet)}"
		else
			say "    $b  ${out//$'\n'/ }"
		fi
	done

	step "served /.release"
	for u in "$PREVIEW_URL" "$PROD_URL"; do
		if got=$(release_of "$u" 2>&1); then
			say "    $u  $got"
		else
			say "    $u  ${got//$'\n'/ }"
		fi
	done

	step "deployments in $NAMESPACE (running sha: the pod template's sites.lab/sha)"
	for d in "$SITE-preview" "$SITE"; do
		if out=$(kget deploy "$d" -o jsonpath='{.spec.template.metadata.annotations.sites\.lab/sha}{"|"}{.spec.template.spec.containers[?(@.name=="site")].image}{"|"}{.status.readyReplicas}{"|"}{.spec.replicas}{"|"}{.metadata.annotations.sites\.lab/failed-sha}' 2>&1); then
			IFS='|' read -r sha image ready want failed <<<"$out"
			say "    $d  running ${sha:-${image##*:}}  ready ${ready:-0}/$want  failed-sha ${failed:-none}"
			say "        image $image"
		else
			say "    $d  ${out//$'\n'/ }"
		fi
	done
}

case ${1:-} in
promote) promote ;;
rollback) rollback ;;
status) status ;;
*)
	say "usage: $0 promote|rollback|status" >&2
	exit 2
	;;
esac
