#!/bin/bash
# This script is used as the Cloudflare Pages deploy command

# Navigate to the web app directory
cd apps/web || exit 1

# Deploy using Wrangler with the explicit path to the worker script
npx wrangler deploy worker.js

# Exit with the status of the wrangler command
exit $? 