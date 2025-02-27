#!/bin/bash
# This script deploys the API Worker to Cloudflare

# Navigate to the API directory
cd apps/api || exit 1

echo "Deploying API Worker to Cloudflare..."

# Deploy using Wrangler
npx wrangler deploy worker.js --name=api-worker

# Exit with the status of the wrangler command
exit $? 