"use client";

import Link from "next/link";
import { Search, BarChart3, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useComparisonStore } from "@/lib/hooks/useComparisonStore";
import { useEffect, useState } from "react";

export function Header() {
  const { setTheme, theme } = useTheme();
  const comparisonCount = useComparisonStore((state) => state.slots.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 md:w-[260px]">
        <Link href="/" className="flex items-center gap-2 font-semibold text-brand-primary">
          <BarChart3 className="h-5 w-5" />
          <span className="hidden text-lg tracking-tight md:inline-block text-foreground">
            LevelLens
          </span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 md:px-8">
        <div className="relative w-full max-w-md hidden md:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search role, company, or level..."
            className="h-9 w-full rounded-md bg-muted/50 pl-9 pr-12 focus-visible:bg-background"
          />
          <div className="absolute right-1.5 flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </div>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden flex ml-auto">
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex items-center gap-2 md:w-[260px] justify-end">
        <Select defaultValue="USD">
          <SelectTrigger className="h-8 w-[65px] border-none bg-transparent shadow-none hover:bg-muted/50 focus:ring-0">
            <SelectValue placeholder="Cur" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">$</SelectItem>
            <SelectItem value="INR">₹</SelectItem>
            <SelectItem value="GBP">£</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="hidden sm:flex h-8 px-3 rounded-md border-border">
          Compare ({comparisonCount})
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}
