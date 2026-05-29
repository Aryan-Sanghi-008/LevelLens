"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Global boundary caught error:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center select-none">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-6 shadow-xs">
        <AlertTriangle className="h-8 w-8 animate-bounce" />
      </div>
      
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-3">
        Something went wrong
      </h1>
      
      <p className="max-w-md text-sm text-muted-foreground leading-relaxed mb-8">
        An unexpected error occurred while loading this page. Our team has been notified. Please try reloading the view or navigating home.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          onClick={() => reset()}
          className="w-full sm:w-auto h-10 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-brand-primary-foreground font-semibold text-sm gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </Button>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex h-10 items-center justify-center rounded-xl border border-input bg-background px-4 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all shadow-xs gap-2"
        >
          <Home className="h-4 w-4" />
          Go home
        </Link>
      </div>
    </div>
  );
}
