"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background border-b relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
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
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Log in
            </Link>
            <Link href="/signup" className={buttonVariants({ size: "sm" })}>
              Sign up
            </Link>
          </div>
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-md p-2 md:hidden",
              "text-muted-foreground hover:text-primary hover:bg-accent",
              "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary",
            )}
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
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[57px] bottom-0 bg-background md:hidden",
          "border-t",
          isMenuOpen ? "block" : "hidden",
        )}
        id="mobile-menu"
        aria-labelledby="mobile-menu-button"
      >
        <div className="flex flex-col p-4 space-y-4">
          <div className="flex flex-col space-y-4">
            <Link href="/signup" className={buttonVariants({ size: "sm", className: "w-full" })}>
              Sign up
            </Link>
            <Link
              href="/login"
              className={buttonVariants({ variant: "ghost", size: "sm", className: "w-full" })}
            >
              Log in
            </Link>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="/about"
              className="text-base font-medium text-muted-foreground hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-base font-medium text-muted-foreground hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
