"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp appearance={{ baseTheme: theme === "dark" ? dark : undefined }} />
    </div>
  );
}
