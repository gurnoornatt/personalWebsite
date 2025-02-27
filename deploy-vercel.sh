#!/bin/bash
# Script to deploy the application to Vercel

# Exit on error
set -e

echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "Building application..."
cd apps/web
pnpm install --no-frozen-lockfile
pnpm run build

echo "Deploying to Vercel..."
# Run vercel directly from the web app directory where Next.js is installed
vercel --prod

echo "Deployment completed!" 