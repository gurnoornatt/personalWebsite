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
- **Build output directory**: `apps/web/.next`
- **Root directory**: `/` (repository root)
- **Node.js version**: 18 (or higher)
- **Deploy command**: `chmod +x deploy.sh && ./deploy.sh`

> **IMPORTANT**: Cloudflare Workers does not support Node.js built-in modules. Our deployment uses a simple Worker script compatible with Cloudflare's environment.

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

This project uses a simplified approach for deploying Next.js to Cloudflare Pages:

1. The Next.js application is built normally with `next build`
2. A simple Cloudflare Worker script (`worker.js`) handles routing
3. Static assets are served directly by Cloudflare Pages
4. API routes are handled by Cloudflare Functions

This approach avoids issues with Node.js dependencies that aren't supported in the Cloudflare Workers environment.

## Manual Deployment

If you prefer to deploy manually, you can use the following commands:

```bash
# Navigate to the web app directory
cd apps/web

# Build the application
pnpm run build

# Deploy to Cloudflare
pnpm run deploy
# OR directly with Wrangler
npx wrangler deploy worker.js
```

## Post-Deployment

After deployment, check the following:

1. Verify that all pages load correctly
2. Test API routes if applicable
3. Check that static assets are served correctly

## Troubleshooting

If you encounter issues with the deployment:

1. **"No such module" errors**:
   - This indicates your script is using Node.js modules that aren't supported in Cloudflare Workers
   - Remove any imports that use the `node:` prefix (e.g., `node:http`, `node:fs`, etc.)
   - Use only Web API features available in the Cloudflare Workers runtime

2. **Worker name mismatch**:
   - If you see a warning about Worker name mismatch, update the `name` field in `wrangler.toml` to match what Cloudflare expects (usually "site")

3. **Other issues**:
   - Check the build logs for errors
   - Verify that the build output directory is correct
   - Ensure static assets are being generated correctly

## Additional Resources

- [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare Workers runtime API](https://developers.cloudflare.com/workers/runtime-apis/) 