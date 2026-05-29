import React from "react";
import Link from "next/link";
import { Compass, Search, Building2, GitCompare, BarChart3 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center select-none">
      {/* Brand logo container */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-brand-primary-foreground shadow-sm">
          <BarChart3 className="h-5 w-5" />
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-primary-hover bg-clip-text text-transparent">
          LevelLens
        </span>
      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-6 shadow-xs border">
        <Compass className="h-8 w-8 animate-pulse text-brand-primary" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-3">
        Page not found
      </h1>

      <p className="max-w-md text-sm text-muted-foreground leading-relaxed mb-8">
        The page you are looking for does not exist or has been moved. Explore one of our main sections below to find what you need.
      </p>

      {/* Helpful shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg w-full">
        <Link
          href="/"
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card shadow-xs hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all text-sm font-semibold text-foreground gap-2"
        >
          <Search className="h-5 w-5 text-brand-primary" />
          <span>Salary Table</span>
        </Link>
        <Link
          href="/companies"
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card shadow-xs hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all text-sm font-semibold text-foreground gap-2"
        >
          <Building2 className="h-5 w-5 text-brand-primary" />
          <span>Top Companies</span>
        </Link>
        <Link
          href="/compare"
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card shadow-xs hover:border-brand-primary/50 hover:bg-brand-primary/5 transition-all text-sm font-semibold text-foreground gap-2"
        >
          <GitCompare className="h-5 w-5 text-brand-primary" />
          <span>Compare Roles</span>
        </Link>
      </div>
    </div>
  );
}
