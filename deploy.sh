#!/usr/bin/env bash
set -euo pipefail

# Prefer the v2 plugin; fall back to standalone v1 binary
if docker compose version &>/dev/null; then
  DC="docker compose"
elif command -v docker-compose &>/dev/null; then
  DC="docker-compose"
else
  echo "Error: neither 'docker compose' nor 'docker-compose' found" >&2
  exit 1
fi

echo "→ Using: $DC"

# Use git short hash as build version; fall back to timestamp if not in a git repo
VERSION=$(git rev-parse --short HEAD 2>/dev/null || date +%Y%m%d%H%M%S)

echo "→ Building image with version: $VERSION"
$DC build --no-cache --build-arg BUILD_VERSION="$VERSION"

echo "→ Restarting container"
$DC up -d --force-recreate

echo "✓ Deployed version $VERSION"
echo "  CSS/JS cache keys: ?v=$VERSION"
