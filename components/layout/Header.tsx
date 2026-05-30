"use client";

import Link from "next/link";
import { Search, BarChart3, Moon, Sun, GitCompare, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useComparisonStore } from "@/lib/hooks/useComparisonStore";
import { useSearchStore } from "@/lib/hooks/useSearchStore";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const { setTheme, theme } = useTheme();
  const comparisonCount = useComparisonStore((state) => state.slots.length);
  const setOpen = useSearchStore((state) => state.setOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-background/95 px-3 sm:px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 md:w-[260px]">
        <Link href="/" className="flex items-center gap-2 font-semibold text-brand-primary">
          <BarChart3 className="h-5 w-5 shrink-0" />
          <span className="hidden text-lg tracking-tight md:inline-block text-foreground">
            LevelLens
          </span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-2 md:px-8">
        <div className="relative w-full max-w-md hidden md:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search role, company, or level..."
            className="h-9 w-full rounded-md bg-muted/50 pl-9 pr-12 focus-visible:bg-background cursor-pointer"
            onClick={() => setOpen(true)}
            readOnly
          />
          <div className="absolute right-1.5 flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Search"
        >
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:w-[260px] justify-end">
        {/* Desktop compare */}
        <Link
          href="/compare"
          className="hidden sm:inline-flex h-8 items-center rounded-md border border-border bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          Compare ({comparisonCount})
        </Link>

        {/* Mobile compare — icon + badge */}
        <Link
          href="/compare"
          className={cn(
            "relative flex sm:hidden h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
          )}
          aria-label={`Compare${comparisonCount > 0 ? `, ${comparisonCount} items` : ""}`}
        >
          <GitCompare className="h-4 w-4" />
          {comparisonCount > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[9px] font-bold bg-brand-primary text-brand-primary-foreground"
            >
              {comparisonCount}
            </Badge>
          )}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8 rounded-md hover:bg-accent inline-flex items-center justify-center outline-none">
            {mounted && theme === "dark" && <Moon className="h-4 w-4 text-muted-foreground hover:text-foreground" />}
            {mounted && theme === "light" && <Sun className="h-4 w-4 text-muted-foreground hover:text-foreground" />}
            {mounted && theme === "system" && <Laptop className="h-4 w-4 text-muted-foreground hover:text-foreground" />}
            {!mounted && <Sun className="h-4 w-4 text-muted-foreground hover:text-foreground" />}
            <span className="sr-only">Toggle theme</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[120px] bg-popover text-popover-foreground border border-border p-1 rounded-md shadow-md">
            <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2 cursor-pointer flex items-center px-2 py-1.5 text-sm rounded hover:bg-accent">
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2 cursor-pointer flex items-center px-2 py-1.5 text-sm rounded hover:bg-accent">
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2 cursor-pointer flex items-center px-2 py-1.5 text-sm rounded hover:bg-accent">
              <Laptop className="h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
