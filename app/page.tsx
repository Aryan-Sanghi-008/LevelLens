"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import type { SortingState } from "@tanstack/react-table";
import { PageShell } from "@/components/layout/PageShell";
import { SalaryTable } from "@/components/data/SalaryTable";
import { SalaryTableMobileBar } from "@/components/data/SalaryTableMobileBar";
import { FilterPanel } from "@/components/data/FilterPanel";
import { FilterSheet } from "@/components/data/FilterSheet";
import { LocationAdjuster } from "@/components/data/LocationAdjuster";
import { LocationHeatmap } from "@/components/charts/LocationHeatmap";
import { PercentileChart } from "@/components/charts/PercentileChart";
import { useFilteredSalaries } from "@/lib/hooks/useFilteredSalaries";
import { formatCurrency } from "@/lib/formatters";
import { SortState, FilterState, CompensationRecord } from "@/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useQueryStates } from "nuqs";
import { filterParsers } from "@/lib/searchParams";
import { countActiveFilters } from "@/lib/filters/countActiveFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShareButton } from "@/components/shared/ShareButton";
import { FilterPresets } from "@/components/shared/FilterPresets";

const sortMapUrlToTable: Record<string, keyof CompensationRecord> = {
  totalComp: "totalCompensation",
  base: "baseSalary",
  stock: "stockPerYear",
  reported: "reportedAt",
};

const sortMapTableToUrl: Record<string, string> = {
  totalCompensation: "totalComp",
  baseSalary: "base",
  stockPerYear: "stock",
  reportedAt: "reported",
};

function HomeContent() {
  const [filters, setFilters] = useQueryStates(filterParsers);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const sortField = sortMapUrlToTable[filters.sort] || "totalCompensation";
  const sortDirection = (filters.order === "asc" || filters.order === "desc") ? filters.order : "desc";

  const derivedSortState = React.useMemo<SortState>(() => ({
    field: sortField,
    direction: sortDirection,
  }), [sortField, sortDirection]);

  const tableSorting = React.useMemo<SortingState>(() => [
    { id: String(sortField), desc: sortDirection === "desc" }
  ], [sortField, sortDirection]);

  const handleSortingChange = React.useCallback(
    (updaterOrValue: SortingState | ((old: SortingState) => SortingState)) => {
      const nextSorting = typeof updaterOrValue === "function" ? updaterOrValue(tableSorting) : updaterOrValue;
      if (nextSorting.length > 0) {
        const { id, desc } = nextSorting[0];
        const sortVal = sortMapTableToUrl[id] || "totalComp";
        const orderVal = desc ? "desc" : "asc";
        setFilters({ sort: sortVal, order: orderVal, page: 1 });
      } else {
        setFilters({ sort: null, order: null, page: 1 });
      }
    },
    [tableSorting, setFilters]
  );

  const { data, isPending } = useFilteredSalaries(filters as Partial<FilterState>, derivedSortState);
  const activeFilterCount = countActiveFilters(filters as Partial<FilterState>);

  const filteredMedian = React.useMemo(() => {
    if (!data || data.length === 0) return 0;
    const sorted = [...data].sort((a, b) => a.totalCompensation - b.totalCompensation);
    return sorted[Math.floor(sorted.length / 2)].totalCompensation;
  }, [data]);

  const handleExportCSV = React.useCallback(() => {
    if (!data || data.length === 0) return;

    const headers = [
      "Company",
      "Industry",
      "Role",
      "Title",
      "Level",
      "City",
      "Country",
      "Base Salary",
      "Stock Per Year",
      "Bonus",
      "Total Compensation",
      "Experience (YoE)",
      "Reported At",
      "Verified"
    ];
    
    const csvRows = [headers.join(",")];

    for (const row of data) {
      const values = [
        `"${row.company.name.replace(/"/g, '""')}"`,
        `"${(row.company.industry || "").replace(/"/g, '""')}"`,
        `"${row.role.replace(/"/g, '""')}"`,
        `"${(row.rawTitle || "").replace(/"/g, '""')}"`,
        `"${row.normalizedLevel}"`,
        `"${row.location.city.replace(/"/g, '""')}"`,
        `"${row.location.country.replace(/"/g, '""')}"`,
        row.baseSalary,
        row.stockPerYear,
        row.bonus,
        row.totalCompensation,
        row.yearsOfExperience,
        row.reportedAt,
        row.verified
      ];
      csvRows.push(values.join(","));
    }

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `levellens_salaries_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [data]);

  const filterTabs = (
    <Tabs defaultValue="filters" className="w-full">
      <TabsList className="w-full grid grid-cols-2 mb-4 sticky top-0 z-30 bg-muted/95 backdrop-blur-xs shadow-sm border border-border/40">
        <TabsTrigger value="filters">Filters</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
      </TabsList>
      <TabsContent value="filters" className="m-0 mt-2">
        <FilterPanel />
      </TabsContent>
      <TabsContent value="location" className="m-0 mt-2 space-y-6">
        <LocationAdjuster />
        <LocationHeatmap data={data} />
      </TabsContent>
    </Tabs>
  );

  return (
    <PageShell
      title="Tech Compensation Data"
      description="Explore detailed compensation data across top tech companies, mapped to normalized levels."
      actions={
        <>
          <Button variant="outline" size="sm" className="hidden sm:flex" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Link href="/submit">
            <Button size="sm" className="hidden sm:inline-flex">
              Add Salary
            </Button>
          </Link>
        </>
      }
    >
      <SalaryTableMobileBar
        activeFilterCount={activeFilterCount}
        onOpenFilters={() => setFilterSheetOpen(true)}
        sorting={tableSorting}
        onSortingChange={handleSortingChange}
      />

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={setFilterSheetOpen}
        activeFilterCount={activeFilterCount}
        footer={
          <Button
            className="w-full h-10 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-brand-primary-foreground font-semibold text-sm"
            onClick={() => setFilterSheetOpen(false)}
          >
            Apply Filters
          </Button>
        }
      >
        {filterTabs}
      </FilterSheet>

      <div className="flex flex-col md:flex-row gap-6 mt-2 md:mt-4">
        <div className="hidden md:block w-[320px] shrink-0">{filterTabs}</div>

        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border rounded-lg p-3.5 px-4 shadow-sm">
            <FilterPresets className="flex-1" />
            <div className="flex items-center gap-2 shrink-0">
              <ShareButton />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between bg-card border rounded-lg p-3 px-4 shadow-sm gap-2">
            <div className="text-sm font-medium text-muted-foreground flex flex-wrap items-center gap-2">
              <span className="font-bold text-foreground">{data.length}</span> data points
              <span className="hidden sm:inline">&middot;</span>
              <span className="sm:hidden block w-full" />
              Median{" "}
              <span className="font-bold text-foreground">
                {formatCurrency(filteredMedian, (filters.currency as string) || "USD", true)}
              </span>
              <span className="hidden sm:inline">&middot;</span>
              <span className="hidden sm:inline">Updated 3 days ago</span>
            </div>
          </div>

          {data.length > 5 && (
            <Accordion className="w-full">
              <AccordionItem
                value="distribution"
                className="border rounded-lg bg-card shadow-sm px-4 data-[state=open]:pb-4"
              >
                <AccordionTrigger className="hover:no-underline py-3 text-sm font-semibold">
                  Distribution Shape
                </AccordionTrigger>
                <AccordionContent>
                  <PercentileChart data={data} activeCurrency={(filters.currency as string) || "USD"} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          <Suspense fallback={<SalaryTable.Skeleton />}>
            <SalaryTable
              data={data}
              isLoading={false}
              isPending={isPending}
              sorting={tableSorting}
              onSortingChange={handleSortingChange}
            />
          </Suspense>
        </div>
      </div>
    </PageShell>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
