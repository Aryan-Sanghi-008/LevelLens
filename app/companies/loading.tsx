import React from "react";
import { CompanyCardSkeleton, ShimmerBlock } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 border-b border-border pb-6">
        <div className="space-y-2">
          <ShimmerBlock className="h-9 w-48" />
          <ShimmerBlock className="h-4 w-72" />
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <ShimmerBlock className="h-9 w-full sm:w-[280px]" />
          <ShimmerBlock className="h-9 w-[180px]" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <ShimmerBlock className="h-4 w-16" />
          {Array.from({ length: 5 }).map((_, i) => (
            <ShimmerBlock key={i} className="h-7 w-20 rounded-full" />
          ))}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <ShimmerBlock className="h-4 w-20" />
          {Array.from({ length: 6 }).map((_, i) => (
            <ShimmerBlock key={i} className="h-7 w-16 rounded-full" />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CompanyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
