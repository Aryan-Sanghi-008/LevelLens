"use client";

import React, { useMemo } from "react";
import { CompensationRecord } from "@/types";
import { formatCurrency, getPercentileBand } from "@/lib/formatters";
import { MOCK_SALARIES } from "@/lib/data/mock/salaries";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CompensationBreakdownSkeleton } from "@/components/shared/Skeletons";

interface CompensationBreakdownProps {
  record: CompensationRecord;
  className?: string;
}

export function CompensationBreakdown({ record, className }: CompensationBreakdownProps) {
  // Compute percentages for the stacked bar
  const total = record.totalCompensation;
  const basePct = total > 0 ? (record.baseSalary / total) * 100 : 0;
  const stockPct = total > 0 ? (record.stockPerYear / total) * 100 : 0;
  const bonusPct = total > 0 ? (record.bonus / total) * 100 : 0;

  // Calculate percentiles against MOCK_SALARIES for the same role and level
  const { p25, p50, p75, userPercentile } = useMemo(() => {
    const dataset = MOCK_SALARIES
      .filter(s => s.role === record.role && s.normalizedLevel === record.normalizedLevel)
      .map(s => s.totalCompensation);
    
    return getPercentileBand(record.totalCompensation, dataset);
  }, [record.role, record.normalizedLevel, record.totalCompensation]);

  // Percentile Badge styling
  let badgeText = "Below Median";
  let badgeVariant: "default" | "secondary" | "outline" = "outline";
  let badgeColor = "text-muted-foreground border-border";

  if (userPercentile >= 75) {
    badgeText = `Top ${100 - userPercentile}%`;
    badgeVariant = "default";
    badgeColor = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  } else if (userPercentile >= 50) {
    badgeText = "Above Median";
    badgeVariant = "secondary";
    badgeColor = "bg-blue-500/10 text-blue-600 border-blue-500/20";
  }

  // Calculate positions for the "vs Market" line
  // We use the max of the record's total or p75 * 1.1 to scale the bar
  const maxCompValue = Math.max(record.totalCompensation, p75 * 1.1, p50 * 1.5 || 1);
  const userPosPct = (record.totalCompensation / maxCompValue) * 100;
  const p25PosPct = (p25 / maxCompValue) * 100;
  const p50PosPct = (p50 / maxCompValue) * 100;
  const p75PosPct = (p75 / maxCompValue) * 100;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Top Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">Total Compensation</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl text-muted-foreground/70 font-medium">
              {formatCurrency(0, record.currency, true).replace(/[\d.,]/g, "").trim()}
            </span>
            <span className="text-4xl font-bold tracking-tight">
              {formatCurrency(record.totalCompensation, record.currency, true).replace(/[^\d.,]/g, "")}
            </span>
          </div>
        </div>
        
        {p50 > 0 && (
          <Badge variant={badgeVariant} className={cn("px-2 py-0.5", badgeColor)}>
            {badgeText}
          </Badge>
        )}
      </div>

      {/* Stacked Bar Section */}
      <div className="space-y-3">
        <TooltipProvider>
          <div className="flex h-4 w-full overflow-hidden rounded-full bg-muted">
            <Tooltip>
              <TooltipTrigger render={
                <div
                  className="bg-blue-500 transition-all hover:brightness-110 h-full"
                  style={{ width: `${basePct}%` }}
                />
              } />
              <TooltipContent>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-blue-500">Base Salary</span>
                  <span>{formatCurrency(record.baseSalary, record.currency, true)} ({basePct.toFixed(1)}%)</span>
                </div>
              </TooltipContent>
            </Tooltip>

            {stockPct > 0 && (
              <Tooltip>
                <TooltipTrigger render={
                  <div
                    className="bg-purple-500 transition-all hover:brightness-110 h-full"
                    style={{ width: `${stockPct}%` }}
                  />
                } />
                <TooltipContent>
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-semibold text-purple-500">Stock / yr</span>
                    <span>{formatCurrency(record.stockPerYear, record.currency, true)} ({stockPct.toFixed(1)}%)</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}

            {bonusPct > 0 && (
              <Tooltip>
                <TooltipTrigger render={
                  <div
                    className="bg-emerald-500 transition-all hover:brightness-110 h-full"
                    style={{ width: `${bonusPct}%` }}
                  />
                } />
                <TooltipContent>
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="font-semibold text-emerald-500">Bonus</span>
                    <span>{formatCurrency(record.bonus, record.currency, true)} ({bonusPct.toFixed(1)}%)</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>

        {/* Stat Blocks */}
        <div className="grid grid-cols-3 gap-4 pt-1">
          <div className="flex flex-col gap-1 border-l-2 border-blue-500 pl-3">
            <span className="text-xs text-muted-foreground">Base</span>
            <span className="text-sm font-semibold">{formatCurrency(record.baseSalary, record.currency, true)}</span>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-purple-500 pl-3">
            <span className="text-xs text-muted-foreground">Stock/yr</span>
            <span className="text-sm font-semibold">{record.stockPerYear > 0 ? formatCurrency(record.stockPerYear, record.currency, true) : "-"}</span>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-emerald-500 pl-3">
            <span className="text-xs text-muted-foreground">Bonus</span>
            <span className="text-sm font-semibold">{record.bonus > 0 ? formatCurrency(record.bonus, record.currency, true) : "-"}</span>
          </div>
        </div>
      </div>

      {/* vs Market Line */}
      {p50 > 0 && (
        <div className="space-y-2 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">vs Market ({record.normalizedLevel} {record.role})</span>
          </div>
          
          <div className="relative h-6 w-full pt-2">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full bg-muted" />
            
            {/* Market Range (p25 to p75) */}
            <div 
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted-foreground/30"
              style={{ left: `${p25PosPct}%`, width: `${p75PosPct - p25PosPct}%` }}
            />
            
            {/* Median Marker */}
            <div 
              className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-muted-foreground"
              style={{ left: `${p50PosPct}%` }}
            />

            {/* User Position Dot */}
            <div 
              className="absolute top-1/2 size-3 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-background bg-foreground shadow-sm"
              style={{ left: `${Math.min(userPosPct, 100)}%` }}
            />
            
            {/* Labels */}
            <div className="absolute top-full mt-1 -translate-x-1/2 text-[10px] text-muted-foreground" style={{ left: `${p50PosPct}%` }}>
              Median
            </div>
            <div className="absolute top-full mt-1 -translate-x-1/2 text-[10px] font-medium" style={{ left: `${Math.min(userPosPct, 100)}%` }}>
              You
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CompensationBreakdown.Skeleton = CompensationBreakdownSkeleton;
