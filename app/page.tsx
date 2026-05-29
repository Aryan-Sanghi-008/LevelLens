"use client";

import React, { useState, Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { SalaryTable } from "@/components/data/SalaryTable";
import { FilterPanel } from "@/components/data/FilterPanel";
import { useFilteredSalaries } from "@/lib/hooks/useFilteredSalaries";
import { SortState, FilterState } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, SlidersHorizontal } from "lucide-react";
import { useQueryStates } from "nuqs";
import { filterParsers } from "@/lib/searchParams";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function HomeContent() {
  const [filters] = useQueryStates(filterParsers);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState<SortState>({ field: "totalCompensation", direction: "desc" });

  const { data } = useFilteredSalaries(filters as Partial<FilterState>, sort);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.levels && filters.levels.length > 0) count += filters.levels.length;
    if (filters.roles && filters.roles.length > 0) count += filters.roles.length;
    if (filters.companies && filters.companies.length > 0) count += filters.companies.length;
    if (filters.locations && filters.locations.length > 0) count += filters.locations.length;
    if (filters.minComp !== null && filters.minComp !== undefined) count += 1;
    if (filters.maxComp !== null && filters.maxComp !== undefined) count += 1;
    if (filters.minYoe !== null && filters.minYoe !== undefined) count += 1;
    if (filters.maxYoe !== null && filters.maxYoe !== undefined) count += 1;
    if (filters.verified) count += 1;
    if (filters.currency && filters.currency !== "USD") count += 1;
    return count;
  };

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
        {/* Mobile Filter & Utility Header */}
        <div className="flex items-center justify-between md:hidden gap-3 w-full mb-2">
          <Dialog>
            <DialogTrigger render={
              <Button variant="outline" className="relative flex items-center justify-center gap-2 flex-1 sm:flex-initial shadow-xs rounded-xl h-10 px-4" />
            }>
              <SlidersHorizontal className="h-4 w-4 text-brand-primary" />
              <span className="font-semibold text-sm">Filters</span>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="default" className="bg-brand-primary text-brand-primary-foreground h-5 min-w-5 rounded-full px-1 flex items-center justify-center font-bold text-[10px]">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </DialogTrigger>
            <DialogContent className="max-w-[calc(100%-2rem)] w-full max-h-[85vh] overflow-y-auto rounded-2xl p-6 bg-background border border-border shadow-2xl">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-lg font-bold flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-brand-primary" />
                  <span>Salary Filters</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground/90">
                  Narrow down results using levels, roles, locations, and compensation ranges.
                </DialogDescription>
              </DialogHeader>
              <div className="py-2">
                <FilterPanel />
              </div>
              <DialogFooter className="mt-6 pt-4 border-t border-border">
                <DialogClose render={
                  <Button className="w-full h-10 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-brand-primary-foreground font-semibold text-sm" />
                }>
                  Apply Filters
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" className="sm:hidden flex items-center gap-2 h-10 px-4 rounded-xl shadow-xs">
            <Download className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-sm">Export</span>
          </Button>
        </div>

        {/* Filter Sidebar (Desktop) */}
        <div className="hidden md:block w-[280px] shrink-0">
          <FilterPanel />
        </div>

        {/* Main Table Area */}
        <div className="flex-1 min-w-0">
          <SalaryTable data={data} isLoading={false} />
        </div>
      </div>
    </PageShell>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
