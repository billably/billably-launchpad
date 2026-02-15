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

echo "Starting billably-launchpad on http://localhost:8080"
npm run dev
