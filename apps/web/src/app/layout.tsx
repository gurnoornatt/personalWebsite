import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { VercelAnalytics } from "@/lib/analytics/vercel";
import { geistMono, geistSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Webapp Starter Template",
  description: "A monorepo template for building webapps - optimized for ai.",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>{/* <GoogleAnalytics gaId="G-2L23D2FV55" /> */}</head>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          geistMono.variable,
          geistSans.variable,
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
          <TailwindIndicator />
          <Toaster />
        </Providers>
        <VercelAnalytics />
      </body>
    </html>
  );
}
