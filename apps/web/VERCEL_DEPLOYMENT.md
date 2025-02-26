# Deploying to Vercel

This document provides instructions for deploying the Next.js application to Vercel.

## Prerequisites

- A Vercel account
- Access to the GitHub repository

## Deployment Steps

1. **Log in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in to your account.

2. **Create a New Project**:
   - Click on "Add New..." and select "Project".
   - Import your GitHub repository.

3. **Configure Project**:
   - **Framework Preset**: Select "Next.js".
   - **Root Directory**: Set to `apps/web`.
   - **Build Command**: Leave as default (`next build`).
   - **Output Directory**: Leave as default (`.next`).
   - **Install Command**: Set to `npm install`.

4. **Environment Variables**:
   - Add any necessary environment variables from your `.env.local` file.
   - Make sure to add `NEXT_PUBLIC_API_URL` pointing to your API endpoint.

5. **Deploy**:
   - Click "Deploy".

## Troubleshooting

If you encounter issues with the deployment:

1. **Check Logs**: Review the build logs for any errors.
2. **Workspace Dependencies**: If you see errors related to workspace dependencies, you may need to modify your package.json to use published versions instead of workspace references.
3. **Build Errors**: If you see build errors, try setting the following in your project settings:
   - **Install Command**: `npm install --legacy-peer-deps`
   - **Build Command**: `npm run build`

## Updating the Deployment

After making changes to your code:

1. Push your changes to GitHub.
2. Vercel will automatically deploy the new version.

## Manual Deployment

If you prefer to deploy manually:

1. Install the Vercel CLI: `npm install -g vercel`.
2. Navigate to the `apps/web` directory.
3. Run `vercel` to deploy to a preview environment.
4. Run `vercel --prod` to deploy to production. 