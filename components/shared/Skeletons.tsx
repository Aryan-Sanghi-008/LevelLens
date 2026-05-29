import React from "react";
import { cn } from "@/lib/utils";

/** Fixed row height for salary table — keep in sync with SalaryTable */
export const SALARY_TABLE_ROW_HEIGHT = 56;

const SALARY_TABLE_COLUMN_SIZES = [
  40, 180, 200, 120, 100, 100, 90, 120, 70, 110, 100, 80,
] as const;

/** Per-column cell shimmer widths for realistic table skeleton */
const SALARY_TABLE_CELL_WIDTHS = [
  ["w-4"],
  ["w-24", "w-16"],
  ["w-28", "w-14"],
  ["w-16"],
  ["w-14"],
  ["w-12"],
  ["w-10"],
  ["w-16"],
  ["w-8"],
  ["w-14"],
  ["w-12"],
  ["w-8"],
] as const;

export function ShimmerBlock({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("shimmer rounded-md", className)}
      style={style}
      aria-hidden
      {...props}
    />
  );
}

export function SalaryTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="h-10 bg-muted/40 border-b border-border" />
      <div className="overflow-x-auto">
        <table
          className="w-full min-w-[860px] border-collapse"
          style={{ tableLayout: "fixed" }}
        >
          <colgroup>
            {SALARY_TABLE_COLUMN_SIZES.map((size, i) => (
              <col key={i} style={{ width: size }} />
            ))}
          </colgroup>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-border/50"
                style={{ height: SALARY_TABLE_ROW_HEIGHT }}
              >
                {SALARY_TABLE_CELL_WIDTHS.map((widths, colIdx) => (
                  <td key={colIdx} className="px-3 align-middle">
                    <div className="flex flex-col gap-1.5 justify-center">
                      {widths.map((w, i) => (
                        <ShimmerBlock key={i} className={cn("h-3.5", w)} />
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CompanyCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm flex flex-col h-full overflow-hidden",
        className
      )}
    >
      <div className="flex flex-row items-start justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <ShimmerBlock className="size-10 shrink-0 rounded-lg" />
          <div className="space-y-2">
            <ShimmerBlock className="h-4 w-28" />
            <ShimmerBlock className="h-3 w-16" />
          </div>
        </div>
        <ShimmerBlock className="h-5 w-16 rounded-full" />
      </div>
      <div className="px-6 pb-2 flex-1 space-y-4">
        <div className="space-y-1.5">
          <ShimmerBlock className="h-3 w-24" />
          <ShimmerBlock className="h-8 w-36" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <ShimmerBlock className="h-2.5 w-14" />
            <ShimmerBlock className="h-2.5 w-14" />
          </div>
          <ShimmerBlock className="h-1.5 w-full rounded-full" />
        </div>
      </div>
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <ShimmerBlock className="h-3 w-32" />
      </div>
    </div>
  );
}

export function CompanyListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <ShimmerBlock className="h-4 w-4" />
            <ShimmerBlock className="size-8 rounded-md" />
            <div className="space-y-1.5">
              <ShimmerBlock className="h-4 w-28" />
              <ShimmerBlock className="h-3 w-16" />
            </div>
          </div>
          <ShimmerBlock className="h-6 w-24" />
        </div>
      ))}
    </div>
  );
}

export function CompensationBreakdownSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <ShimmerBlock className="h-4 w-32" />
          <ShimmerBlock className="h-10 w-40" />
        </div>
        <ShimmerBlock className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="flex h-4 w-full overflow-hidden rounded-full">
          <ShimmerBlock className="h-full w-[45%] rounded-none rounded-l-full" />
          <ShimmerBlock className="h-full w-[30%] rounded-none opacity-80" />
          <ShimmerBlock className="h-full flex-1 rounded-none rounded-r-full opacity-60" />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-1.5 border-l-2 border-muted pl-3">
              <ShimmerBlock className="h-3 w-10" />
              <ShimmerBlock className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 pt-4 border-t border-border/50">
        <ShimmerBlock className="h-3 w-40" />
        <ShimmerBlock className="h-6 w-full rounded-full" />
      </div>
    </div>
  );
}

const LADDER_RUNG_WIDTHS = ["45%", "62%", "38%", "70%", "55%"] as const;

export function LevelLadderSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-full flex flex-col items-center py-8", className)}>
      <div className="w-full max-w-4xl space-y-12">
        {LADDER_RUNG_WIDTHS.map((bandWidth, i) => (
          <div key={i} className="flex gap-6 items-center">
            <div className="w-1/3 flex flex-col gap-2 shrink-0 border-r-2 border-border/50 pr-6">
              <div className="flex items-center justify-between">
                <ShimmerBlock className="h-5 w-16 rounded-full" />
                <ShimmerBlock className="h-3 w-8" />
              </div>
              <ShimmerBlock className="h-8 w-24" />
              <ShimmerBlock className="h-3 w-32" />
              <div className="flex gap-1 mt-1">
                <ShimmerBlock className="h-4 w-16 rounded-sm" />
                <ShimmerBlock className="h-4 w-20 rounded-sm" />
              </div>
            </div>
            <div className="flex-1 relative h-16 bg-muted/10 rounded-lg border border-border/50">
              <ShimmerBlock
                className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full"
                style={{ left: "10%", width: bandWidth }}
              />
              <ShimmerBlock className="absolute top-1/2 -translate-y-1/2 h-4 w-0.5 left-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompanyProfileSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {/* Hero */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-border pb-8">
        <ShimmerBlock className="size-24 shrink-0 rounded-2xl" />
        <div className="flex-1 space-y-3 w-full">
          <div className="flex items-center gap-3">
            <ShimmerBlock className="h-9 w-48" />
            <ShimmerBlock className="h-6 w-20 rounded-full" />
          </div>
          <ShimmerBlock className="h-4 w-full max-w-2xl" />
          <ShimmerBlock className="h-4 w-3/4 max-w-xl" />
          <div className="flex flex-wrap gap-4 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <ShimmerBlock key={i} className="h-4 w-24" />
            ))}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-6 space-y-3"
          >
            <ShimmerBlock className="h-4 w-28" />
            <ShimmerBlock className="h-8 w-32" />
            <ShimmerBlock className="h-3 w-36" />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="grid w-full max-w-2xl grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <ShimmerBlock key={i} className="h-9 rounded-md" />
          ))}
        </div>
        <ShimmerBlock className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function ChartSkeleton({
  className,
  height = 280,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <div
      className={cn("w-full relative py-6 px-4 rounded-xl border border-border/50", className)}
      style={{ height }}
    >
      <div className="absolute inset-0 flex flex-col justify-between py-10 px-4 opacity-30">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-full h-px bg-muted-foreground" />
        ))}
      </div>
      <div className="absolute bottom-12 left-4 right-4 flex items-end justify-between gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <ShimmerBlock
            key={i}
            className="w-2 h-2 rounded-full shrink-0"
            style={{ marginBottom: `${(i % 4) * 12 + 8}px` }}
          />
        ))}
      </div>
      <svg
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <path
          d="M0,75 Q20,30 40,55 T80,35 T100,45"
          fill="none"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
      </svg>
      <ShimmerBlock className="absolute bottom-8 left-1/2 -translate-x-1/2 h-1 w-3/4 rounded-full opacity-50" />
    </div>
  );
}

/** Ergonomic namespace for company profile page fallbacks */
export const CompanyProfile = {
  Skeleton: CompanyProfileSkeleton,
};
