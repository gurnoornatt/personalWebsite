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
  description: "Personal website of Gurnoor Natt - Building AI-powered speech therapy for neurodivergent children",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Version: NEW SITE VERSION - Feb 27, 2024 */}
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistMono.variable,
          geistSans.variable,
        )}
      >
        <Providers attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <TailwindIndicator />
          <Toaster />
        </Providers>
        <VercelAnalytics />
      </body>
    </html>
  );
}
