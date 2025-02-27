# Deploying to Vercel

This guide provides instructions for deploying this Next.js application to Vercel.

## Prerequisites

1. A Vercel account
2. The GitHub repository connected to Vercel

## Deployment Steps

1. Log in to your Vercel account
2. Click "Add New..." and select "Project"
3. Select your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: (leave blank to use repository root)
   - **Build Command**: `pnpm run build` (should be auto-detected)
   - **Output Directory**: `apps/web/.next` (should be auto-detected from vercel.json)
   - **Install Command**: `pnpm install` (should be auto-detected)

5. Add any environment variables needed for your project in the project settings
6. Click "Deploy"

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

## Troubleshooting

If you encounter any issues with your deployment:

1. Check the build logs in the Vercel dashboard
2. Verify your environment variables are set correctly
3. Make sure your repository has the correct configuration in vercel.json

## Local Development

To develop locally, run:

```bash
pnpm run dev
```

This will start the development server and your application will be available at http://localhost:3000. 