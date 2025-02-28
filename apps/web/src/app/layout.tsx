import type { Metadata, Viewport } from "next";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { VercelAnalytics } from "@/lib/analytics/vercel";
import { geistMono, geistSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Gurnoor Natt",
  description: "Personal website of Gurnoor Natt",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistMono.variable,
          geistSans.variable,
        )}
      >
        <Providers attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
          <TailwindIndicator />
          <Toaster />
        </Providers>
        <VercelAnalytics />
      </body>
    </html>
  );
}
