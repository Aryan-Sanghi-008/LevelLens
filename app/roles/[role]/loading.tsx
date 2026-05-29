import React from "react";
import { LevelLadderSkeleton, ShimmerBlock } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Hero */}
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <ShimmerBlock className="h-4 w-28" />
        <ShimmerBlock className="h-10 w-64" />
        <ShimmerBlock className="h-4 w-96 mt-2" />
      </div>

      {/* Grid: 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6 space-y-3">
            <ShimmerBlock className="h-4 w-24" />
            <ShimmerBlock className="h-8 w-32" />
            <ShimmerBlock className="h-3 w-40" />
          </div>
        ))}
      </div>

      {/* Main split content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mt-4">
        <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <ShimmerBlock className="h-6 w-48" />
              <ShimmerBlock className="h-4 w-72" />
            </div>
            <div className="flex gap-2">
              <ShimmerBlock className="h-8 w-16 rounded-full" />
              <ShimmerBlock className="h-8 w-20 rounded-full" />
              <ShimmerBlock className="h-8 w-20 rounded-full" />
            </div>
          </div>
          
          {/* Level Ladder Skeleton inside the tab content */}
          <LevelLadderSkeleton className="py-2" />
        </div>

        {/* Right card */}
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <ShimmerBlock className="h-5 w-24" />
          <ShimmerBlock className="h-3 w-48" />
          <div className="space-y-4 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <ShimmerBlock className="size-6 rounded-md" />
                <div className="space-y-1.5 flex-1">
                  <ShimmerBlock className="h-3 w-20" />
                  <ShimmerBlock className="h-2 w-12" />
                </div>
                <ShimmerBlock className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
