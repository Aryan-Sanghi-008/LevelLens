"use client";

import React, { useState, useMemo } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { LevelLadder } from "@/components/charts/LevelLadder";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Layers, HelpCircle } from "lucide-react";

export default function LevelLadderToolPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>("ALL");

  // Filter salaries by company slug if selected
  const filteredSalaries = useMemo(() => {
    if (selectedCompany === "ALL") {
      return MOCK_SALARIES;
    }
    return MOCK_SALARIES.filter((s) => s.company.slug === selectedCompany);
  }, [selectedCompany]);

  const activeCompanyMeta = useMemo(() => {
    return MOCK_COMPANIES.find((c) => c.slug === selectedCompany);
  }, [selectedCompany]);

  return (
    <PageShell
      title="Level Ladder Tool"
      description="Compare tech career progression ladders, equivalent levels, and total compensation spreads."
    >
      <div className="space-y-6 mt-2 md:mt-4 max-w-7xl mx-auto w-full">
        
        {/* Info Banner Card */}
        <Card className="border border-border/50 bg-card shadow-xs">
          <CardContent className="pt-5 flex gap-4 select-none">
            <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0 h-10 w-10 flex items-center justify-center">
              <Layers className="size-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                About the Level Ladder
                <HelpCircle className="size-3.5 text-muted-foreground/80" />
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
                The career progression ladder maps diverse engineering levels across top tech firms to a single, 
                standardized matrix (Intern to Executive). Analyze base, stock, and bonus percentiles (25th, 50th, 75th spreads), 
                typical experience ranges, and actual titles held at each rung.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Toolbar with Company Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-card shadow-xs">
          <div className="flex items-center gap-2 select-none">
            <TrendingUp className="size-4.5 text-brand-primary" />
            <span className="text-sm font-semibold text-foreground">
              {selectedCompany === "ALL" 
                ? "Market-wide Normalized Ladder" 
                : `${activeCompanyMeta?.name || ""} Progression Ladder`}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-medium text-muted-foreground shrink-0 select-none">Filter Company:</span>
            <Select value={selectedCompany} onValueChange={(val) => setSelectedCompany(val || "ALL")}>
              <SelectTrigger className="h-8.5 w-full sm:w-[220px] rounded-lg border-border/80 bg-background text-xs focus:ring-1 focus:ring-brand-primary shadow-xs">
                <SelectValue placeholder="All Companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL" className="text-xs">All Companies (Combined)</SelectItem>
                {MOCK_COMPANIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug} className="text-xs">
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Level Ladder Chart */}
        <div className="bg-card border border-border/50 rounded-2xl shadow-xs p-1 md:p-4">
          <LevelLadder 
            records={filteredSalaries} 
            selectedCompanySlug={selectedCompany === "ALL" ? undefined : selectedCompany} 
          />
        </div>
      </div>
    </PageShell>
  );
}
