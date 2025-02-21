# Full Stack Monorepo

A modern full-stack application built with TurboRepo, featuring a Bun API backend and Next.js frontend.


### API (Backend)
- [Bun](https://bun.sh/) 
- [Drizzle ORM](https://orm.drizzle.team/)
- [Supabase](https://supabase.com/)

### Web (Frontend)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) 
- [Shadcn/ui](https://ui.shadcn.com/) 
- [Clerk](https://clerk.com/) 

### Deployment
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

### Misc
- [Ngrok](https://ngrok.com/)


## 📦 Project Structure

.
├── apps/
│   ├── api/         # Bun API backend
│   └── web/         # Next.js frontend
└── packages/        # Shared packages, main DB


## 🛠️ Setup & Installation

1. **Clone the repository**

git clone <your-repo-url>
cd <your-repo-name>

2. **Install dependencies**

pnpm install

3. **Environment Setup**

Create .env files in both apps/api and apps/web:

For apps/api/.env:

DATABASE_URL=your_database_url
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

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
- Run `pnpm db:push` to initialize the database and mess around

5. **Clerk Setup**
- Create a new application on [Clerk](https://clerk.com)
- Copy your API keys to the .env file
- Configure your OAuth providers if needed

#### Webhooks
There is a webhook setup in clerk for the api to handle user creation and authentication. 
Use this to setup a sync between clerk and the user database. Further details can be found api readme.

## Development

Run the development server:

turbo dev

This will start both the API and web applications in development mode:
- API: http://localhost:3004
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

##  Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📝 License

[MIT](LICENSE)