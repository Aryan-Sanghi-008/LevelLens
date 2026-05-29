import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SalaryTableSkeleton, ShimmerBlock } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <PageShell
      title="Tech Compensation Data"
      description="Explore detailed compensation data across top tech companies, mapped to normalized levels."
    >
      <div className="flex flex-col md:flex-row gap-6 mt-2 md:mt-4">
        {/* Left Side: Filter sidebar skeleton */}
        <div className="hidden md:block w-[320px] shrink-0 space-y-4">
          <div className="rounded-xl border border-border bg-card p-4 space-y-6">
            <div className="space-y-2">
              <ShimmerBlock className="h-4 w-20" />
              <ShimmerBlock className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <ShimmerBlock className="h-4 w-28" />
              <div className="grid grid-cols-2 gap-2">
                <ShimmerBlock className="h-8 w-full" />
                <ShimmerBlock className="h-8 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <ShimmerBlock className="h-4 w-32" />
              <ShimmerBlock className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <ShimmerBlock className="h-4 w-24" />
              <ShimmerBlock className="h-9 w-full" />
            </div>
          </div>
        </div>

        {/* Right Side: Table skeletons */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Presets shell */}
          <div className="flex items-center justify-between bg-card border rounded-lg p-3.5 px-4 shadow-sm">
            <div className="flex gap-2 flex-wrap flex-1">
              <ShimmerBlock className="h-7 w-24 rounded-full" />
              <ShimmerBlock className="h-7 w-32 rounded-full" />
              <ShimmerBlock className="h-7 w-28 rounded-full" />
            </div>
            <ShimmerBlock className="h-8 w-20" />
          </div>

          {/* Counts bar */}
          <div className="flex items-center justify-between bg-card border rounded-lg p-3 px-4 shadow-sm">
            <ShimmerBlock className="h-4 w-48" />
          </div>

          {/* Salary Table Skeleton */}
          <SalaryTableSkeleton rows={8} />
        </div>
      </div>
    </PageShell>
  );
}
