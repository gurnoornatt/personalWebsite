# Deploying to Vercel

This guide provides instructions for deploying this Next.js application to Vercel.

## Prerequisites

1. A Vercel account
2. The GitHub repository connected to Vercel
3. Vercel CLI installed (`npm install -g vercel`)

## Deployment Options

### Option 1: Using the Deployment Script (Recommended)

The easiest way to deploy is to use the provided script:

```bash
./deploy-vercel.sh
```

This script will:
1. Install all dependencies
2. Build the Next.js application
3. Deploy to Vercel using the CLI directly from the web app directory

### Option 2: Manual Deployment via Vercel Dashboard

1. Log in to your Vercel account
2. Click "Add New..." and select "Project"
3. Select your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: apps/web
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install --no-frozen-lockfile`

5. Add any environment variables needed for your project in the project settings
6. Click "Deploy"

### Option 3: Manual Deployment via CLI

Run the following commands:

```bash
# Install dependencies
pnpm install --no-frozen-lockfile

# Build the Next.js application and deploy from that directory
cd apps/web
pnpm install --no-frozen-lockfile
pnpm run build
vercel --prod
```

## Environment Variables

Make sure to set the following environment variables in the Vercel dashboard:

- `NEXT_PUBLIC_API_URL`: URL for your API (if applicable)
- `NEXT_PUBLIC_SITE_URL`: URL for your site
- `NEXT_PUBLIC_ADMIN_USERNAME`: Username for admin access
- `NEXT_PUBLIC_ADMIN_PASSWORD`: Password for admin access

## Troubleshooting

If you encounter the error "Warning: Could not identify Next.js version":

1. **Key Fix**: Run the Vercel CLI from the `apps/web` directory where Next.js is installed
2. Make sure you're properly logged into Vercel CLI with `vercel login`
3. Try using the deployment script (`./deploy-vercel.sh`)
4. If deploying via the Vercel dashboard, make sure to specify `apps/web` as the root directory

## Vercel Features

Vercel provides many built-in features that make managing your Next.js application easy:

1. **Preview Deployments**: Every pull request gets its own preview deployment
2. **Easy Rollbacks**: One-click rollback to previous deployments
3. **Environment Variables**: Secure management of environment variables
4. **Analytics**: Built-in analytics for your application
5. **Serverless Functions**: API routes are automatically deployed as serverless functions

## Domains

To add a custom domain:

1. Go to your project settings in Vercel
2. Click on "Domains"
3. Add your domain and follow the instructions to set up DNS records

## Updating Your Deployment

Any push to the main branch will trigger a new deployment automatically. You can also manually trigger a deployment from the Vercel dashboard.

## Local Development

To develop locally, run:

```bash
pnpm run dev
```

This will start the development server and your application will be available at http://localhost:3000. 