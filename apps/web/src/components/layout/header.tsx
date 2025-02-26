"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://placehold.co/40x40"
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl">Logo</span>
            </Link>
          </div>
          <nav className="hidden space-x-4 md:flex">
            <Link
              href="/thoughts"
              className="font-medium text-muted-foreground text-sm hover:text-primary"
            >
              Thoughts
            </Link>
            <Link
              href="/books"
              className="font-medium text-muted-foreground text-sm hover:text-primary"
            >
              Books
            </Link>
          </nav>
          <div className="hidden items-center space-x-4 md:flex">
            <Link href="/admin/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Admin
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open menu</span>
            {isMenuOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[68px] bottom-0 bg-background md:hidden",
          "border-t",
          isMenuOpen ? "block" : "hidden",
        )}
        id="mobile-menu"
        aria-labelledby="mobile-menu-button"
      >
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex flex-col space-y-2">
            <Link href="/admin/login" className={buttonVariants({ size: "sm", className: "w-full" })}>
              Admin
            </Link>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="/thoughts"
              className="font-medium text-base text-muted-foreground hover:text-primary"
            >
              Thoughts
            </Link>
            <Link
              href="/books"
              className="font-medium text-base text-muted-foreground hover:text-primary"
            >
              Books
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
