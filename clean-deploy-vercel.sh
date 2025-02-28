#!/bin/bash
# Script to perform a clean deployment to Vercel

# Exit on error
set -e

echo "Cleaning up previous build artifacts..."
cd apps/web
rm -rf .next
rm -rf .vercel/output
rm -rf node_modules/.cache

echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "Building application..."
pnpm run build

echo "Deploying to Vercel..."
# Optional: Add --force to ensure a completely fresh deployment
vercel --prod --force

echo "Deployment completed!" 