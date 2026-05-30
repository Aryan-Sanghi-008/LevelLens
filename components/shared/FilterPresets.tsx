import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FilterPresetItem {
  label: string;
  href: string;
}

const PRESETS: FilterPresetItem[] = [
  {
    label: "FAANG Senior",
    href: "/?companies=meta,google,amazon&levels=SENIOR,STAFF",
  },
  {
    label: "Bangalore ₹50L+",
    href: "/?location=Bangalore&minComp=5000000&currency=INR",
  },
  {
    label: "Staff+ Engineers",
    href: "/?levels=STAFF,PRINCIPAL,DIRECTOR,VP,EXEC",
  },
  {
    label: "Freshers (0–2 yrs)",
    href: "/?minYoe=0&maxYoe=2",
  },
];

export function FilterPresets({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      <span className="text-xs font-semibold text-muted-foreground mr-1 select-none">
        Quick Presets:
      </span>
      {PRESETS.map((preset) => (
        <Link
          key={preset.label}
          href={preset.href}
          className="inline-flex items-center justify-center rounded-full border border-input bg-background px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-input-hover transition-all shadow-xs select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          {preset.label}
        </Link>
      ))}
    </div>
  );
}
