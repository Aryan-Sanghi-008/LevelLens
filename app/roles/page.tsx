"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { useSubmissionStore } from "@/lib/hooks/useSubmissionStore";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { slugify, formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, Building2, TrendingUp, ArrowRight } from "lucide-react";
import { mergeCompanies } from "@/lib/data/companyStats";

export default function RolesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const submissions = useSubmissionStore((s) => s.submissions);

  const { allSalaries, allCompanies } = useMemo(() => {
    const s = [...submissions, ...MOCK_SALARIES];
    const c = mergeCompanies(submissions);
    return { allSalaries: s, allCompanies: c };
  }, [submissions]);

  // Aggregate stats per role
  const roleStats = useMemo(() => {
    const statsMap = new Map<string, {
      role: string;
      count: number;
      salaries: number[];
      companies: Map<string, number[]>;
    }>();

    for (const record of allSalaries) {
      if (!statsMap.has(record.role)) {
        statsMap.set(record.role, {
          role: record.role,
          count: 0,
          salaries: [],
          companies: new Map<string, number[]>(),
        });
      }

      const item = statsMap.get(record.role)!;
      item.count += 1;
      item.salaries.push(record.totalCompensation);

      if (!item.companies.has(record.company.slug)) {
        item.companies.set(record.company.slug, []);
      }
      item.companies.get(record.company.slug)!.push(record.totalCompensation);
    }

    return Array.from(statsMap.values()).map((item) => {
      // Median compensation
      const sortedSalaries = [...item.salaries].sort((a, b) => a - b);
      const medianComp = sortedSalaries[Math.floor(sortedSalaries.length / 2)] || 0;

      // Find top paying company
      let topCompanySlug = "";
      let topCompanyMedian = 0;

      for (const [companySlug, comps] of Array.from(item.companies.entries())) {
        const sortedComps = [...comps].sort((a, b) => a - b);
        const compMed = sortedComps[Math.floor(sortedComps.length / 2)] || 0;
        if (compMed > topCompanyMedian) {
          topCompanyMedian = compMed;
          topCompanySlug = companySlug;
        }
      }

      const topCompanyMeta = allCompanies.find((c) => c.slug === topCompanySlug);

      return {
        role: item.role,
        count: item.count,
        medianComp,
        topCompany: topCompanyMeta,
      };
    }).sort((a, b) => b.count - a.count);
  }, [allSalaries, allCompanies]);

  // Filter roles based on search
  const filteredRoles = useMemo(() => {
    return roleStats.filter((r) =>
      r.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [roleStats, searchQuery]);

  // Overall stats
  const overallStats = useMemo(() => {
    const totalReports = allSalaries.length;
    const uniqueRolesCount = roleStats.length;
    const sortedAll = allSalaries.map((s) => s.totalCompensation).sort((a, b) => a - b);
    const overallMedian = sortedAll[Math.floor(sortedAll.length / 2)] || 0;

    return { totalReports, uniqueRolesCount, overallMedian };
  }, [roleStats]);

  return (
    <PageShell
      title="Explore Roles"
      description="Compare tech roles, compensation levels, and top-paying companies across our dataset."
    >
      <div className="space-y-6 mt-2 md:mt-4 max-w-7xl mx-auto w-full">
        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
          <Card className="border border-border/50 shadow-xs bg-card">
            <CardContent className="pt-4 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0">
                <Briefcase className="size-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Unique Roles</p>
                <h4 className="text-2xl font-bold text-foreground mt-0.5">
                  {overallStats.uniqueRolesCount}
                </h4>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 shadow-xs bg-card">
            <CardContent className="pt-4 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <TrendingUp className="size-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Market Median Pay</p>
                <h4 className="text-2xl font-bold text-foreground mt-0.5">
                  {formatCurrency(overallStats.overallMedian, "INR", true)}
                </h4>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/50 shadow-xs bg-card">
            <CardContent className="pt-4 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                <Building2 className="size-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Salary Data</p>
                <h4 className="text-2xl font-bold text-foreground mt-0.5">
                  {overallStats.totalReports.toLocaleString()} reports
                </h4>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Toolbar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search roles (e.g. Frontend Engineer, Product Manager)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/80 bg-card text-sm placeholder:text-muted-foreground/75 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all shadow-xs"
          />
        </div>

        {/* Roles Grid */}
        {filteredRoles.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] border border-border/50 bg-card rounded-2xl p-6 text-center select-none shadow-xs">
            <Briefcase className="size-10 text-muted-foreground/50 mb-3" />
            <h4 className="font-semibold text-base text-foreground">No roles found</h4>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              No roles match &quot;{searchQuery}&quot;. Try adjusting your search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <Card
                key={role.role}
                className="border border-border/50 hover:border-brand-primary/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group bg-card"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base font-bold text-foreground group-hover:text-brand-primary transition-colors line-clamp-1">
                      {role.role}
                    </CardTitle>
                    <span className="shrink-0 text-[10px] font-semibold bg-muted px-2 py-0.5 rounded-full text-muted-foreground select-none">
                      {role.count} reports
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4 border-y border-border/40 py-3 text-xs select-none">
                    <div>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Median Pay</p>
                      <p className="font-bold text-foreground mt-0.5">
                        {formatCurrency(role.medianComp, "INR", true)}
                      </p>
                    </div>
                    {role.topCompany && (
                      <div>
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Top Paying</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="font-semibold text-foreground truncate max-w-[100px]" title={role.topCompany.name}>
                            {role.topCompany.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <Link href={`/roles/${slugify(role.role)}`} className="block w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-1.5 h-8.5 rounded-lg border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/5 text-brand-primary font-semibold text-xs"
                    >
                      View Career Ladder
                      <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
