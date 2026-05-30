"use client";

import React, { Suspense } from "react";
import { useQueryState } from "nuqs";
import { CompanyLogo } from "@/components/shared/CompanyLogo";
import dynamic from "next/dynamic";
import { formatCurrency, slugify } from "@/lib/formatters";
import { useSubmissionStore } from "@/lib/hooks/useSubmissionStore";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import {
  LevelLadderSkeleton,
  SalaryTableSkeleton,
  CompanyListSkeleton,
} from "@/components/shared/Skeletons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, Building2, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mergeCompanies } from "@/lib/data/companyStats";

const LevelLadder = dynamic(
  () => import("@/components/charts/LevelLadder").then((m) => m.LevelLadder),
  { loading: () => <LevelLadderSkeleton /> }
);

const SalaryTable = dynamic(
  () => import("@/components/data/SalaryTable").then((m) => m.SalaryTable),
  { loading: () => <SalaryTableSkeleton /> }
);

interface RolePageContentProps {
  slug: string;
  initialCompany: string;
}

export function RolePageContent({
  slug,
  initialCompany,
}: RolePageContentProps) {
  const submissions = useSubmissionStore((s) => s.submissions);
  
  const { allSalaries, allCompanies } = React.useMemo(() => {
    const s = [...submissions, ...MOCK_SALARIES];
    const c = mergeCompanies(submissions);
    return { allSalaries: s, allCompanies: c };
  }, [submissions]);

  const stats = React.useMemo(() => {
    const matchingRoleRecord = allSalaries.find((s) => slugify(s.role) === slug);
    if (!matchingRoleRecord) return null;

    const roleName = matchingRoleRecord.role;
    const records = allSalaries.filter((s) => s.role === roleName);

    const totalRecords = records.length;
    const sortedDates = records.map((r) => new Date(r.reportedAt).getTime()).sort((a, b) => a - b);
    const minYear = new Date(sortedDates[0]).getFullYear();
    const maxYear = new Date(sortedDates[sortedDates.length - 1]).getFullYear();

    const companyMedians = new Map<string, number[]>();
    for (const r of records) {
      if (!companyMedians.has(r.company.slug)) companyMedians.set(r.company.slug, []);
      companyMedians.get(r.company.slug)!.push(r.totalCompensation);
    }

    const topCompanies = Array.from(companyMedians.entries())
      .map(([cSlug, comps]) => {
        const sorted = [...comps].sort((a, b) => a - b);
        const median = sorted[Math.floor(sorted.length / 2)];
        const meta = allCompanies.find((c) => c.slug === cSlug);
        return { meta, median, count: comps.length };
      })
      .filter((c): c is { meta: typeof MOCK_COMPANIES[number]; median: number; count: number } => !!c.meta)
      .sort((a, b) => b.median - a.median)
      .slice(0, 5);

    const overallTopCompany = topCompanies[0]?.meta?.name || "N/A";

    return {
      roleName,
      records,
      totalRecords,
      minYear,
      maxYear,
      topCompanies,
      overallTopCompany,
    };
  }, [slug, allSalaries, allCompanies]);

  const [selectedCompany, setSelectedCompany] = useQueryState("company", {
    defaultValue: initialCompany,
    shallow: true,
  });

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold">Role Not Found</h2>
        <p className="text-muted-foreground mt-2">The role you are looking for does not exist or has no data yet.</p>
      </div>
    );
  }

  const { roleName, records, totalRecords, overallTopCompany, minYear, maxYear, topCompanies } = stats;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <div className="flex items-center gap-3 text-muted-foreground mb-2">
          <Briefcase className="size-5" />
          <span className="text-sm font-medium tracking-wide uppercase select-none">
            Role Insights
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground select-none">
          {roleName}
        </h1>
        <p className="text-muted-foreground select-none">
          Compensation benchmarking and career progression ladder.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Data Points</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified compensation records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Paying Company
            </CardTitle>
            <Building2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallTopCompany}</div>
            <p className="text-xs text-muted-foreground mt-1">Highest median across all levels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Date Range</CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {minYear} - {maxYear}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Dataset recency</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full mt-4">
        <Tabs defaultValue="ladder" className="w-full">
          <TabsList className="flex w-full h-auto overflow-x-auto justify-start gap-1 mb-6 p-1 lg:grid lg:grid-cols-3 lg:overflow-visible">
            <TabsTrigger value="ladder" className="shrink-0">
              Level Ladder
            </TabsTrigger>
            <TabsTrigger value="table" className="shrink-0">
              Salary Table
            </TabsTrigger>
            <TabsTrigger value="companies" className="shrink-0">
              Companies
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="ladder"
            className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm overflow-x-auto"
          >
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold select-none">Career Progression</h2>
                <p className="text-sm text-muted-foreground mt-1 select-none">
                  Median total compensation (INR) by level across the industry.
                </p>
              </div>

              {/* Company filter highlight selector */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground mr-1.5 select-none">
                  Highlight Company:
                </span>
                <Button
                  variant={!selectedCompany ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCompany(null)}
                  className="h-7 text-xs rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  All
                </Button>
                {topCompanies.map((c) => (
                  <Button
                    key={c.meta.slug}
                    variant={selectedCompany === c.meta.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCompany(c.meta.slug)}
                    className="h-7 text-xs rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  >
                    {c.meta.name}
                  </Button>
                ))}
              </div>
            </div>

            <Suspense fallback={<LevelLadderSkeleton />}>
              <LevelLadder records={records} selectedCompanySlug={selectedCompany || undefined} />
            </Suspense>
          </TabsContent>

          <TabsContent value="table">
            <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-sm">
              <div className="mb-6 select-none">
                <h2 className="text-xl font-bold">Raw Data</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  All compensation records for {roleName}.
                </p>
              </div>
              <Suspense fallback={<SalaryTableSkeleton />}>
                <SalaryTable data={records} />
              </Suspense>
            </div>
          </TabsContent>

          <TabsContent value="companies">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="mb-6 select-none">
                <h2 className="text-xl font-bold">Top Companies</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Highest paying companies for this role.
                </p>
              </div>
              <Suspense fallback={<CompanyListSkeleton count={5} />}>
                <div className="space-y-4">
                  {topCompanies.map((c, i) => (
                    <div
                      key={c.meta.slug}
                      onClick={() => setSelectedCompany(c.meta.slug)}
                      className={cn(
                        "flex items-center justify-between p-4 border border-border/50 rounded-lg cursor-pointer transition-all hover:bg-muted/10",
                        selectedCompany === c.meta.slug && "border-brand-primary bg-brand-primary/5"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground font-medium w-4">{i + 1}</span>
                        <CompanyLogo
                          src={c.meta.logo}
                          name={c.meta.name}
                          alt={c.meta.name || "Company"}
                          width={32}
                          height={32}
                          className="size-8 rounded-md object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{c.meta.name}</h4>
                          <p className="text-xs text-muted-foreground">{c.count} records</p>
                        </div>
                      </div>
                      <div className="text-lg font-bold">
                        {formatCurrency(c.median, "INR", true)}
                      </div>
                    </div>
                  ))}
                </div>
              </Suspense>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
