import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ChartSkeleton, ShimmerBlock } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <PageShell
      title="Compensation Insights"
      description="Deep dive analysis of tech pay scales, salary vs. equity ratios, and progression trends."
    >
      <div className="space-y-10 mt-4">
        {/* Top Section: Heatmap skeleton */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <ShimmerBlock className="h-6 w-48" />
            <ShimmerBlock className="h-4 w-96" />
          </div>
          <ChartSkeleton height={400} />
        </div>

        {/* Middle Section: Split charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <ShimmerBlock className="h-5 w-40" />
              <ShimmerBlock className="h-3.5 w-72" />
            </div>
            <ChartSkeleton height={300} />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <ShimmerBlock className="h-5 w-40" />
              <ShimmerBlock className="h-3.5 w-72" />
            </div>
            <ChartSkeleton height={300} />
          </div>
        </div>

        {/* Bottom Section: Insights Grid */}
        <div className="space-y-4 pt-6 border-t">
          <div className="flex items-center gap-2 mb-2">
            <ShimmerBlock className="h-6 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 flex gap-4">
                <ShimmerBlock className="size-10 shrink-0 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <ShimmerBlock className="h-4 w-32" />
                  <ShimmerBlock className="h-3 w-full" />
                  <ShimmerBlock className="h-3 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
