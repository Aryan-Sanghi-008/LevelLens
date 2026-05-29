"use client";

import React, { useMemo } from "react";
import { CompensationRecord } from "@/types";
import { formatCurrency } from "@/lib/formatters";

interface MarketPositionBarProps {
  record: CompensationRecord;
  cohort: CompensationRecord[];
  cohortLabel?: string;
}

export function MarketPositionBar({ record, cohort, cohortLabel = "this cohort" }: MarketPositionBarProps) {
  const stats = useMemo(() => {
    if (!cohort || cohort.length === 0) return null;

    const sorted = cohort.map(c => c.totalCompensation).sort((a, b) => a - b);
    
    const minVal = sorted[0];
    const maxVal = sorted[sorted.length - 1];
    
    const getP = (p: number) => sorted[Math.floor(sorted.length * p)];
    const p25Val = getP(0.25);
    const medVal = getP(0.50);
    const p75Val = getP(0.75);

    // Calculate exact percentile of record
    const idx = sorted.findIndex(v => v >= record.totalCompensation);
    const rawPct = idx >= 0 ? (idx / sorted.length) * 100 : 100;
    
    return {
      min: minVal,
      max: maxVal,
      p25: p25Val,
      median: medVal,
      p75: p75Val,
      topPct: 100 - Math.round(rawPct)
    };
  }, [cohort, record]);

  if (!stats || !stats.min || stats.max === stats.min) return null;

  const { min, max, p25, median, p75, topPct } = stats;

  const getPos = (val: number) => `${Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100))}%`;

  return (
    <div className="w-full flex flex-col gap-3 py-2">
      <div className="flex justify-between items-end">
        <span className="text-sm font-medium">
          You&apos;re in the <span className="font-bold text-brand-primary">top {topPct}%</span> for {cohortLabel}
        </span>
        <span className="text-lg font-bold">{formatCurrency(record.totalCompensation, record.currency, true)}</span>
      </div>

      <div className="relative w-full h-8 mt-2">
        {/* Main Bar Track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-muted rounded-full overflow-hidden flex">
          {/* p0 - p25 segment (Muted) */}
          <div 
            className="h-full bg-muted-foreground/30" 
            style={{ width: getPos(p25) }} 
          />
          {/* p25 - p75 segment (Brand Primary) */}
          <div 
            className="h-full bg-brand-primary/60" 
            style={{ width: `${parseFloat(getPos(p75)) - parseFloat(getPos(p25))}%` }} 
          />
          {/* p75 - p100 segment (Green / Accent) */}
          <div 
            className="h-full bg-emerald-500/60" 
            style={{ width: `${100 - parseFloat(getPos(p75))}%` }} 
          />
        </div>

        {/* Labels below the bar */}
        <div 
          className="absolute top-1/2 translate-y-3 -translate-x-1/2 flex flex-col items-center"
          style={{ left: getPos(p25) }}
        >
          <div className="w-0.5 h-1.5 bg-border -mt-1" />
          <span className="text-[10px] text-muted-foreground font-semibold mt-1">p25</span>
        </div>

        <div 
          className="absolute top-1/2 translate-y-3 -translate-x-1/2 flex flex-col items-center"
          style={{ left: getPos(median) }}
        >
          <div className="w-0.5 h-2 bg-border -mt-1.5" />
          <span className="text-[10px] font-bold mt-1">Median</span>
        </div>

        <div 
          className="absolute top-1/2 translate-y-3 -translate-x-1/2 flex flex-col items-center"
          style={{ left: getPos(p75) }}
        >
          <div className="w-0.5 h-1.5 bg-border -mt-1" />
          <span className="text-[10px] text-muted-foreground font-semibold mt-1">p75</span>
        </div>

        {/* Record Dot */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center group"
          style={{ left: getPos(record.totalCompensation) }}
        >
          <div className="w-3 h-3 rounded-full bg-foreground border-2 border-background shadow-sm ring-2 ring-transparent group-hover:ring-foreground/20 transition-all" />
        </div>
      </div>
    </div>
  );
}
