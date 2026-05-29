"use client";

import React, { useMemo } from "react";
import { CompensationRecord, NormalizedLevel } from "@/types";
import Image from "next/image";
import { formatCurrency, getPercentileBand, getLevelBadgeVariant, getLevelColor, formatYoE } from "@/lib/formatters";
import { MOCK_COMPANIES } from "@/lib/data/mock/companies";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

interface LevelLadderProps {
  records: CompensationRecord[];
}

export function LevelLadder({ records }: LevelLadderProps) {
  const ladderData = useMemo(() => {
    // Standard order of levels
    const levelOrder = [
      NormalizedLevel.INTERN,
      NormalizedLevel.JUNIOR,
      NormalizedLevel.MID,
      NormalizedLevel.SENIOR,
      NormalizedLevel.STAFF,
      NormalizedLevel.PRINCIPAL,
      NormalizedLevel.DIRECTOR,
      NormalizedLevel.VP,
      NormalizedLevel.EXEC,
    ];

    const dataByLevel = new Map<NormalizedLevel, CompensationRecord[]>();
    for (const r of records) {
      if (!dataByLevel.has(r.normalizedLevel)) {
        dataByLevel.set(r.normalizedLevel, []);
      }
      dataByLevel.get(r.normalizedLevel)!.push(r);
    }

    const result = [];
    for (const level of levelOrder) {
      const levelRecords = dataByLevel.get(level);
      if (!levelRecords || levelRecords.length === 0) continue;

      const totalComps = levelRecords.map(r => r.totalCompensation);
      const { p25, p50, p75 } = getPercentileBand(0, totalComps);
      const yoeArray = levelRecords.map(r => r.yearsOfExperience).sort((a, b) => a - b);
      const minYoe = yoeArray[0];
      const maxYoe = yoeArray[yoeArray.length - 1];

      // Extract unique titles
      const titlesMap = new Map<string, number>();
      for (const r of levelRecords) {
        titlesMap.set(r.rawTitle, (titlesMap.get(r.rawTitle) || 0) + 1);
      }
      const topTitles = Array.from(titlesMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(entry => entry[0]);

      // Calculate company medians
      const companyRecords = new Map<string, number[]>();
      for (const r of levelRecords) {
        if (!companyRecords.has(r.company.slug)) companyRecords.set(r.company.slug, []);
        companyRecords.get(r.company.slug)!.push(r.totalCompensation);
      }
      
      const companyMedians = [];
      for (const [slug, comps] of Array.from(companyRecords.entries())) {
        const companyMeta = MOCK_COMPANIES.find(c => c.slug === slug);
        if (!companyMeta) continue;
        const compMed = getPercentileBand(0, comps).p50;
        companyMedians.push({
          company: companyMeta,
          median: compMed,
        });
      }

      result.push({
        level,
        p25,
        p50,
        p75,
        minYoe,
        maxYoe,
        count: levelRecords.length,
        titles: topTitles,
        companies: companyMedians,
      });
    }

    // Determine min and max across all for scaling
    const overallMin = Math.min(...result.map(r => Math.min(r.p25, ...r.companies.map(c => c.median))));
    const overallMax = Math.max(...result.map(r => Math.max(r.p75, ...r.companies.map(c => c.median))));

    return { rungs: result, overallMin, overallMax };
  }, [records]);

  if (ladderData.rungs.length === 0) {
    return <div className="text-muted-foreground p-8 text-center">No data available for this role.</div>;
  }

  const { rungs, overallMin, overallMax } = ladderData;
  const range = Math.max(overallMax - overallMin, 1);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-full max-w-4xl space-y-12 relative">
        {rungs.map((rung, i) => {
          const prevRung = i > 0 ? rungs[i - 1] : null;
          let percentJump = 0;
          if (prevRung && prevRung.p50 > 0) {
            percentJump = Math.round(((rung.p50 - prevRung.p50) / prevRung.p50) * 100);
          }

          const getLeftPct = (val: number) => {
            const pct = ((val - overallMin) / range) * 100;
            return Math.max(0, Math.min(100, pct));
          };

          const p25Pct = getLeftPct(rung.p25);
          const p75Pct = getLeftPct(rung.p75);
          const widthPct = Math.max(p75Pct - p25Pct, 0.5);

          return (
            <div key={rung.level} className="relative">
              {/* Jump Indicator */}
              {i > 0 && (
                <div className="absolute -top-8 left-12 flex flex-col items-center justify-center text-muted-foreground">
                  <div className="w-px h-6 bg-border" />
                  <div className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-full z-10 absolute -translate-y-1/2 top-1/2 bg-background border border-border">
                    <ArrowUp className="size-3" />
                    {percentJump}%
                  </div>
                </div>
              )}

              <div className="flex gap-6 items-center">
                {/* Level Details (Left side) */}
                <div className="w-1/3 flex flex-col gap-2 shrink-0 border-r-2 border-border/50 pr-6 relative">
                  <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-border" />
                  <div className="flex items-center justify-between">
                    <Badge variant={getLevelBadgeVariant(rung.level)} className={cn(getLevelColor(rung.level))}>
                      {rung.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground">n={rung.count}</span>
                  </div>
                  
                  <div className="text-3xl font-bold tracking-tight">
                    {formatCurrency(rung.p50, "INR", true)}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>{formatYoE(rung.minYoe)} – {formatYoE(rung.maxYoe)} typical</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {rung.titles.map(t => (
                      <span key={t} className="text-[10px] bg-muted px-1.5 py-0.5 rounded-sm truncate max-w-[140px]" title={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Chart & Dots (Right side) */}
                <div className="flex-1 relative h-16 bg-muted/10 rounded-lg border border-border/50">
                  <TooltipProvider>
                    {/* Band p25-p75 */}
                    <Tooltip>
                      <TooltipTrigger render={
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50 transition-colors cursor-pointer"
                          style={{ left: `${p25Pct}%`, width: `${widthPct}%` }}
                        />
                      } />
                      <TooltipContent>
                        <div className="text-xs space-y-1">
                          <p className="font-semibold text-muted-foreground">Market Range</p>
                          <p>25th: {formatCurrency(rung.p25, "INR", true)}</p>
                          <p>75th: {formatCurrency(rung.p75, "INR", true)}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>

                    {/* Median Tick */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-4 w-0.5 bg-foreground"
                      style={{ left: `${getLeftPct(rung.p50)}%` }}
                    />

                    {/* Company Dots */}
                    {rung.companies.map(c => {
                      const posPct = getLeftPct(c.median);
                      return (
                        <Tooltip key={c.company.slug}>
                          <TooltipTrigger render={
                            <div 
                              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-5 rounded-full bg-background border-2 border-border overflow-hidden hover:scale-125 hover:z-10 transition-transform cursor-pointer shadow-sm"
                              style={{ left: `${posPct}%` }}
                            >
                              <Image src={c.company.logo || "https://ui-avatars.com/api/?name=Company"} alt={c.company.name || "Company"} width={24} height={24} className="size-full object-cover" />
                            </div>
                          } />
                          <TooltipContent>
                            <div className="text-xs">
                              <p className="font-semibold">{c.company.name} {rung.level}</p>
                              <p>{formatCurrency(c.median, "INR", true)} median</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
