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

## API Subdomain Setup (Important to Fix Error 1042)

To avoid Cloudflare Error 1042 (Worker-to-Worker communication on the same zone), follow these steps to set up an API subdomain:

1. In your Cloudflare dashboard, go to the DNS settings for your domain
2. Add a new DNS record:
   - Type: A
   - Name: api
   - IPv4 address: 192.0.2.1 (This is just a placeholder, Cloudflare will proxy it)
   - Proxy status: Proxied

3. Deploy the API Worker:
   ```bash
   chmod +x deploy-api.sh
   ./deploy-api.sh
   ```

4. Verify the API subdomain is working by visiting `https://api.yourdomain.com/posts`

## Web App Build Configuration

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

- `NEXT_PUBLIC_API_URL`: `https://api.yourdomain.com` (must use the API subdomain)
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
3. A specialized Cloudflare Worker script handles routing with fallbacks for dynamic routes
4. Static assets are served directly by Cloudflare Pages
5. API calls are redirected to a separate subdomain to avoid Error 1042
6. 404 errors for client-side routes are handled by falling back to the index.html

This approach avoids the 25 MiB file size limit in Cloudflare's KV storage and properly handles dynamic routes.

## Manual Deployment

If you prefer to deploy manually, you can use the following commands:

```bash
# Deploy the API Worker first
cd apps/api
npx wrangler deploy worker.js --name=api-worker

# Then deploy the web app
cd ../web
pnpm run build

# Create a deployment directory without large files
mkdir -p .next-deploy
cp -r .next/* .next-deploy/
rm -rf .next-deploy/cache

# Ensure SSR files are properly included
mkdir -p .next-deploy/server/pages
mkdir -p .next-deploy/server/chunks
cp -r .next/server/pages/* .next-deploy/server/pages/ 2>/dev/null || true
cp -r .next/server/chunks/* .next-deploy/server/chunks/ 2>/dev/null || true

# Deploy to Cloudflare
npx wrangler deploy worker.js --no-bundle
```

## Post-Deployment

After deployment, check the following:

1. Verify that all pages load correctly
2. Test dynamic routes specifically (e.g., `/posts/[id]`)
3. Test API routes by confirming they're redirected to the API subdomain
4. Check that static assets are served correctly

## Troubleshooting 404 Errors

If you encounter 404 errors on specific routes:

1. **Dynamic Routes**:
   - Check that the worker.js file is correctly handling 404 responses by falling back to index.html
   - Verify that _routes.json has the correct fallback configuration
   - Test both direct URL access and client-side navigation to the route

2. **API Routes**:
   - Ensure the API subdomain is correctly set up in Cloudflare DNS
   - Verify the API Worker is deployed and responding correctly
   - Check the console logs for any errors in the API redirection

3. **Static Assets**:
   - Make sure static assets are being correctly included in the deployment
   - Verify paths in your application match the expected structure

4. **Server-Side Rendering Issues**:
   - If using getServerSideProps, consider switching to getStaticProps with fallback: true
   - Check that SSR files are being correctly deployed in .next-deploy/server/

## Troubleshooting Error 1042

If you're still encountering Error 1042 (Worker-to-Worker communication error):

1. Verify that your API requests are being redirected to the API subdomain
2. Check that the `NEXT_PUBLIC_API_URL` is set to use the API subdomain
3. Look for any hardcoded API URLs in your code that might be using the main domain
4. Ensure the API Worker is deployed and functioning correctly

## Additional Resources

- [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare KV storage limits](https://developers.cloudflare.com/workers/platform/limits#kv-limits)
- [Next.js Static and Dynamic Routing](https://nextjs.org/docs/routing/introduction) 