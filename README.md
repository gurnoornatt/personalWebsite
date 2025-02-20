# Full Stack Monorepo

A modern full-stack application built with TurboRepo, featuring a Bun API backend and Next.js frontend.

## 🚀 Tech Stack

### API (Backend)
- [Bun](https://bun.sh/) - JavaScript runtime & toolkit
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Supabase](https://supabase.com/) - PostgreSQL Database

### Web (Frontend)
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn/ui](https://ui.shadcn.com/) - UI Component Library
- [Clerk](https://clerk.com/) - Authentication & User Management

## 📦 Project Structure

.
├── apps/
│   ├── api/         # Bun API backend
│   └── web/         # Next.js frontend
└── packages/        # Shared packages

## 🛠️ Setup & Installation

1. **Clone the repository**

git clone <your-repo-url>
cd <your-repo-name>

2. **Install dependencies**

pnpm install

3. **Environment Setup**

Create .env files in both apps/api and apps/web:

For apps/api/.env:

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

For apps/web/.env:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

4. **Supabase Setup**
- Create a new project on [Supabase](https://supabase.com)
- Copy your project URL and API keys to the .env file
- Run database migrations (if any) using Drizzle

5. **Clerk Setup**
- Create a new application on [Clerk](https://clerk.com)
- Copy your API keys to the .env file
- Configure your OAuth providers if needed

## 🚀 Development

Run the development server:

pnpm dev

This will start both the API and web applications in development mode:
- API: http://localhost:3001
- Web: http://localhost:3000

## 📤 Deployment

### Web (Next.js) on Vercel

1. Connect your repository to [Vercel](https://vercel.com)
2. Select the web directory as your project root
3. Add your environment variables
4. Deploy!

### API (Bun) on Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your repository
3. Configure the service:
   - Build Command: cd ../.. && pnpm install && pnpm run build
   - Start Command: bun run start
   - Root Directory: apps/api
4. Add your environment variables
5. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📝 License

[MIT](LICENSE)