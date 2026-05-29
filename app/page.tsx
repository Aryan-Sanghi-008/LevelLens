"use client";

import React, { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SalaryTable } from "@/components/data/SalaryTable";
import { useFilteredSalaries } from "@/lib/hooks/useFilteredSalaries";
import { FilterState, SortState } from "@/types";
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState<Partial<FilterState>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState<SortState>({ field: "totalCompensation", direction: "desc" });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, totalCount, filteredCount, isFiltered } = useFilteredSalaries(filters, sort);

  return (
    <PageShell
      title="Tech Compensation Data"
      description="Explore detailed compensation data across top tech companies, mapped to normalized levels."
      actions={
        <>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button size="sm">
            Add Salary
          </Button>
        </>
      }
    >
      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Hardcoded Filter Sidebar Placeholder */}
        <div className="w-full md:w-[240px] shrink-0 space-y-6">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 font-medium border-b border-border pb-3 mb-4">
              <Filter className="h-4 w-4" />
              Filters
            </div>
            
            <div className="space-y-4">
              {/* Dummy filter sections */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</label>
                <div className="h-8 rounded bg-muted/50 w-full animate-pulse" />
                <div className="h-8 rounded bg-muted/50 w-full animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</label>
                <div className="h-8 rounded bg-muted/50 w-full animate-pulse" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Level</label>
                <div className="h-8 rounded bg-muted/50 w-full animate-pulse" />
                <div className="h-8 rounded bg-muted/50 w-3/4 animate-pulse" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</label>
                <div className="h-8 rounded bg-muted/50 w-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="flex-1 min-w-0">
          <SalaryTable data={data} isLoading={false} />
        </div>
      </div>
    </PageShell>
  );
}
