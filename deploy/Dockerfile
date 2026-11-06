# The site image: the static build (dist/) baked into an unprivileged nginx.
# Built and pushed by .github/workflows/build.yml as
# ghcr.io/tshearman/marginem:<commit sha>; run by deploy/k8s.yaml.
#
# build.yml runs `npm run build` and writes dist/.release (the sha) first, so
# there is nothing to run here: two COPYs onto the base. The context is the
# repo root, trimmed to deploy/nginx.conf and dist/ by .dockerignore.
#
# Base: nginxinc/nginx-unprivileged 1.30.6-alpine (the stable line; the same
# index as stable-alpine on 2026-11-06), pinned by its multi-arch index digest.
# It runs as uid/gid 101 on :8080 and keeps pid and temp files under /tmp.
# To bump: pick the newest <stable>-alpine tag
#   nix run nixpkgs#skopeo -- list-tags docker://docker.io/nginxinc/nginx-unprivileged
# then take its index digest
#   nix run nixpkgs#skopeo -- inspect --raw docker://docker.io/nginxinc/nginx-unprivileged:<tag> | shasum -a 256
# and check its etc/nginx/nginx.conf still keeps pid and temp paths in /tmp
# (deploy/k8s.yaml mounts the root filesystem read-only).
FROM docker.io/nginxinc/nginx-unprivileged:1.30.6-alpine@sha256:f5116ed4606f3eb015dd4a8e28cb9b351476dc0ad4bc6e9f93b19cec130cdf03

LABEL org.opencontainers.image.source="https://github.com/tshearman/marginem" \
      org.opencontainers.image.description="marginem.io, the static site"

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
