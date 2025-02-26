# Deploying to Cloudflare Pages

This document provides instructions for deploying this Next.js application to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. The repository connected to Cloudflare Pages

## Deployment Steps

1. Log in to your Cloudflare dashboard
2. Navigate to Pages
3. Click "Create a project" or select your existing project
4. Connect your GitHub repository if not already connected

## Build Configuration

Use the following build configuration settings:

- **Framework preset**: Custom
- **Build command**: `cd apps/web && pnpm install && pnpm run build`
- **Build output directory**: `apps/web/.next-deploy`
- **Root directory**: `/` (repository root)
- **Node.js version**: 18 (or higher)
- **Deploy command**: `chmod +x deploy.sh && ./deploy.sh`

> **IMPORTANT**: Cloudflare has a 25 MiB file size limit for KV storage. Our deployment script creates a modified `.next-deploy` directory that excludes large files like webpack cache.

## Environment Variables

Add the following environment variables in the Cloudflare Pages dashboard:

- `NEXT_PUBLIC_API_URL`: Your API URL (e.g., https://api.gurnoor.dev)
- `NODE_VERSION`: 18

## Advanced Settings

### Functions

Enable the Functions feature in your Cloudflare Pages project settings.

### Compatibility Flags

Add the following compatibility flags in the Cloudflare dashboard:

- `nodejs_compat`

## The Deployment Approach

This project uses a specialized approach for deploying Next.js to Cloudflare Pages:

1. The Next.js application is built normally with `next build`
2. Large files (webpack cache, etc.) are excluded from deployment
3. A simple Cloudflare Worker script handles routing without using KV storage
4. Static assets are served directly by Cloudflare Pages
5. API routes are handled by Cloudflare Functions

This approach avoids the 25 MiB file size limit in Cloudflare's KV storage.

## Manual Deployment

If you prefer to deploy manually, you can use the following commands:

```bash
# Navigate to the web app directory
cd apps/web

# Build the application
pnpm run build

# Create a deployment directory without large files
mkdir -p .next-deploy
cp -r .next/* .next-deploy/
rm -rf .next-deploy/cache

# Deploy to Cloudflare
npx wrangler deploy worker.js --no-bundle
```

## Post-Deployment

After deployment, check the following:

1. Verify that all pages load correctly
2. Test API routes if applicable
3. Check that static assets are served correctly

## Troubleshooting

If you encounter issues with the deployment:

1. **"File is too big" errors**:
   - This indicates you're hitting Cloudflare's 25 MiB KV storage limit
   - Make sure the `.cfignore` file and `exclude` settings are properly configured
   - Check that the deploy script is correctly skipping large files

2. **Worker name mismatch**:
   - If you see a warning about Worker name mismatch, update the `name` field in `wrangler.toml` to match what Cloudflare expects (usually "site")

3. **Other issues**:
   - Check the build logs for errors
   - Verify that the build output directory is correct
   - Ensure static assets are being generated correctly

## Additional Resources

- [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare KV storage limits](https://developers.cloudflare.com/workers/platform/limits#kv-limits) 