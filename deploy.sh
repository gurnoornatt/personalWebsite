#!/bin/bash
# This script is used as the Cloudflare Pages deploy command

# Navigate to the web app directory
cd apps/web || exit 1

# Create a modified .next directory without large files
echo "Preparing deployment files..."
mkdir -p .next-deploy
cp -r .next/* .next-deploy/ 2>/dev/null || true
rm -rf .next-deploy/cache

# Ensure SSR files are properly included
echo "Ensuring SSR files are properly included..."
mkdir -p .next-deploy/server/pages
mkdir -p .next-deploy/server/chunks
cp -r .next/server/pages/* .next-deploy/server/pages/ 2>/dev/null || true
cp -r .next/server/chunks/* .next-deploy/server/chunks/ 2>/dev/null || true

# Deploy using Wrangler with the explicit path to the worker script
# But don't use Workers Sites (which has the file size limits)
echo "Deploying worker script..."
npx wrangler deploy worker.js --no-bundle

# Exit with the status of the wrangler command
exit $? 