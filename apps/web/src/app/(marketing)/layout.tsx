import { cn } from "@/lib/utils";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className={cn("relative flex min-h-screen flex-col")}>
      <main className="flex-1">{children}</main>
    </div>
  );
}
