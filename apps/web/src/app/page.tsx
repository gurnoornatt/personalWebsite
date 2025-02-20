import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Full-Stack Monorepo Template</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with Bun, Hono, Next.js, and shadcn/ui
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Backend with Bun & Hono</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Lightning-fast API routes powered by Bun runtime and Hono framework for efficient
                routing.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/posts">
                <Button variant="link" className="p-0 h-auto font-medium">
                  View Demo API
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next.js Frontend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Modern React with App Router, Server Components, and full TypeScript support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monorepo Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Organized with Turborepo for efficient builds and shared packages.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Frontend Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" /> Next.js 14 with App Router
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" /> React Query for data fetching
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" /> shadcn/ui components
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" /> Tailwind CSS for styling
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backend Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" /> Bun runtime for TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" /> Hono for API routing
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" /> Type-safe API endpoints
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" /> Shared types across stack
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-x-4">
          <Button asChild>
            <Link href="/posts">View Demo</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">
            © 2024 Full-Stack Template. Built with Bun and Next.js.
          </p>
        </div>
      </footer>
    </div>
  );
}
