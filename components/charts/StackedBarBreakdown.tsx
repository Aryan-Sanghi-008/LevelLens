"use client";

import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";

interface StackedBarBreakdownProps {
  base: number;
  stock: number;
  bonus: number;
  total: number;
  currency: string;
  isLoading?: boolean;
}

export function StackedBarBreakdown({ 
  base, 
  stock, 
  bonus, 
  total, 
  currency,
  isLoading = false 
}: StackedBarBreakdownProps) {
  
  if (isLoading) return <StackedBarBreakdown.Skeleton />;
  if (!total || total === 0) return <div className="h-6 flex items-center text-xs text-muted-foreground">No breakdown available</div>;

  const basePct = Math.max(5, (base / total) * 100);
  const stockPct = stock > 0 ? Math.max(5, (stock / total) * 100) : 0;
  const bonusPct = bonus > 0 ? Math.max(5, (bonus / total) * 100) : 0;

  // Normalize to 100% just in case of rounding errors
  const sum = basePct + stockPct + bonusPct;
  const bPct = (basePct / sum) * 100;
  const sPct = (stockPct / sum) * 100;
  const boPct = (bonusPct / sum) * 100;

  return (
    <div className="w-full flex h-6 rounded-md overflow-hidden bg-muted">
      <TooltipProvider delay={100}>
        <Tooltip>
          <TooltipTrigger render={
            <div 
              className="h-full bg-brand-primary transition-all duration-500 cursor-pointer border-r border-background/20"
              style={{ width: `${bPct}%` }}
            />
          } />
          <TooltipContent className="text-xs">
            <p className="font-semibold text-brand-primary mb-1">Base Salary</p>
            <p>{formatCurrency(base, currency, true)} ({Math.round((base/total)*100)}%)</p>
          </TooltipContent>
        </Tooltip>

        {stock > 0 && (
          <Tooltip>
            <TooltipTrigger render={
              <div 
                className="h-full bg-chart-2 transition-all duration-500 cursor-pointer border-r border-background/20"
                style={{ width: `${sPct}%` }}
              />
            } />
            <TooltipContent className="text-xs">
              <p className="font-semibold text-chart-2 mb-1">Stock / yr</p>
              <p>{formatCurrency(stock, currency, true)} ({Math.round((stock/total)*100)}%)</p>
            </TooltipContent>
          </Tooltip>
        )}

        {bonus > 0 && (
          <Tooltip>
            <TooltipTrigger render={
              <div 
                className="h-full bg-chart-3 transition-all duration-500 cursor-pointer"
                style={{ width: `${boPct}%` }}
              />
            } />
            <TooltipContent className="text-xs">
              <p className="font-semibold text-chart-3 mb-1">Bonus</p>
              <p>{formatCurrency(bonus, currency, true)} ({Math.round((bonus/total)*100)}%)</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
}

StackedBarBreakdown.Skeleton = function StackedBarSkeleton() {
  return (
    <div className="w-full flex h-6 rounded-md overflow-hidden gap-1">
      <Skeleton className="h-full w-2/3 rounded-none" />
      <Skeleton className="h-full w-1/4 rounded-none opacity-50" />
      <Skeleton className="h-full flex-1 rounded-none opacity-30" />
    </div>
  );
};
