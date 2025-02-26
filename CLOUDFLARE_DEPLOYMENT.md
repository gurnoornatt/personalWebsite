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

- **Framework preset**: Next.js
- **Build command**: `cd apps/web && pnpm install && pnpm run build`
- **Build output directory**: `apps/web/.next`
- **Root directory**: `/` (repository root)
- **Node.js version**: 18 (or higher)
- **Deploy command**: `chmod +x deploy.sh && ./deploy.sh`

> **IMPORTANT**: The deploy command must explicitly specify the path to the entry point file. Using just `npx wrangler deploy` without arguments will result in a "Missing entry-point" error.

## Environment Variables

Add the following environment variables in the Cloudflare Pages dashboard:

- `NEXT_PUBLIC_API_URL`: Your API URL (e.g., https://api.gurnoor.dev)
- `NODE_VERSION`: 18

## Advanced Settings

### Functions

If you're using API routes or server components, enable the Functions feature in your Cloudflare Pages project settings.

### Compatibility Flags

Add the following compatibility flags:

- `nodejs_compat`

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
npx wrangler deploy deploy.js
```

## Post-Deployment

After deployment, check the following:

1. Verify that all pages load correctly
2. Test API routes if applicable
3. Check that static assets are served correctly

## Troubleshooting

If you encounter issues with the deployment:

1. **"Missing entry-point" error**:
   - Make sure your deploy command is `chmod +x deploy.sh && ./deploy.sh` or explicitly includes the path to the entry point
   - Do NOT use just `npx wrangler deploy` without arguments
   - Check that the `deploy.sh` script is executable and properly accessing the entry point file

2. **File not found errors**:
   - Verify that `apps/web/deploy.js` exists and is properly formatted
   - Check that the build completed successfully before deployment

3. **Other issues**:
   - Check the build logs for errors
   - Verify that the build output directory is correct
   - Ensure all dependencies are installed correctly
   - Check that environment variables are set properly

## Additional Resources

- [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/)
- [Wrangler CLI documentation](https://developers.cloudflare.com/workers/wrangler/) 