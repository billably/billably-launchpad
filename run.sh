#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

# Check for Node.js
if ! command -v node &> /dev/null; then
  echo "Error: Node.js is not installed."
  echo "Install it from https://nodejs.org or run: brew install node"
  exit 1
fi

# Install dependencies if node_modules is missing or package.json changed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Watch package.json for changes and auto-install dependencies
watch_deps() {
  local last_hash
  last_hash=$(md5 -q package.json)
  while true; do
    sleep 2
    local current_hash
    current_hash=$(md5 -q package.json)
    if [ "$current_hash" != "$last_hash" ]; then
      echo ""
      echo "[run.sh] package.json changed — reinstalling dependencies..."
      npm install
      last_hash="$current_hash"
      echo "[run.sh] Dependencies updated. Vite will pick up the changes."
    fi
  done
}

watch_deps &
WATCH_PID=$!

# Stop the watcher when the script exits
trap "kill $WATCH_PID 2>/dev/null" EXIT

echo "Starting billably-launchpad on http://localhost:8080"
echo "(Watching package.json for dependency changes)"
npm run dev
