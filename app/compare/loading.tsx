import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ShimmerBlock } from "@/components/shared/Skeletons";

export default function Loading() {
  return (
    <PageShell
      title="Compare Compensation"
      description="Compare up to three company / level / role combinations side by side."
    >
      <div className="space-y-6 mt-4">
        {/* Desktop Skeleton Table */}
        <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-4 text-left w-36">
                  <ShimmerBlock className="h-4 w-20" />
                </th>
                {Array.from({ length: 3 }).map((_, i) => (
                  <th key={i} className="px-4 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <ShimmerBlock className="size-7 rounded-md" />
                      <div className="space-y-1.5 flex-1">
                        <ShimmerBlock className="h-3.5 w-24" />
                        <ShimmerBlock className="h-2.5 w-16" />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Array.from({ length: 5 }).map((_, rIdx) => (
                <tr key={rIdx}>
                  <td className="px-4 py-4">
                    <ShimmerBlock className="h-3 w-16" />
                  </td>
                  {Array.from({ length: 3 }).map((_, cIdx) => (
                    <td key={cIdx} className="px-4 py-4">
                      <ShimmerBlock className="h-4 w-28" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Skeleton Cards */}
        <div className="md:hidden space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <ShimmerBlock className="size-10 rounded-lg" />
                  <div className="space-y-1.5">
                    <ShimmerBlock className="h-4 w-24" />
                    <ShimmerBlock className="h-3 w-16" />
                    <ShimmerBlock className="h-4 w-12 rounded-full" />
                  </div>
                </div>
              </div>
              <ShimmerBlock className="h-7 w-28" />
              <div className="space-y-2 text-sm pt-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex justify-between">
                    <ShimmerBlock className="h-3 w-16" />
                    <ShimmerBlock className="h-3 w-20" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
