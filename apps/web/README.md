# Personal Website - Web App

This is the frontend for a personal website built with Next.js, featuring an admin dashboard for content management.

## Features

- **Homepage**: Showcase your profile, thoughts, books, and social links
- **Admin Dashboard**: Secure interface to manage your content
- **Responsive Design**: Optimized for all devices
- **Local Storage**: Content persistence without a backend database

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Dashboard

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin) and use your credentials to log in.

The admin dashboard allows you to:
- Edit your profile information
- Manage your thoughts/blog posts
- Curate your book recommendations
- Update your social media links

## Environment Variables

Create a `.env` file with the following variables:

```
# Authentication (for admin section)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password

# Optional: Analytics
# NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
```

## Deploy on Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect the Next.js application
4. Add your environment variables in the Vercel dashboard

### Important Deployment Notes

- The application uses localStorage for content management
- To persist content across devices, you'll need to manually export/import your data
- The admin section is protected by a simple username/password authentication

## Customization

- Edit the theme in `src/app/globals.css`
- Modify components in `src/components`
- Update page layouts in `src/app`
