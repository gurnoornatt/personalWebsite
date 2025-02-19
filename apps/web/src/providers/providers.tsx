"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/query-provider";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <QueryProvider>
        <TooltipProvider delayDuration={320}>{children}</TooltipProvider>
      </QueryProvider>
    </NextThemesProvider>
  );
}
