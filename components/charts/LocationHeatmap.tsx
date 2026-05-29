"use client";

import React, { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency } from "@/lib/formatters";
import { CompensationRecord } from "@/types";

interface LocationHeatmapProps {
  data: CompensationRecord[];
}

// Simplified map data (Abstract representation of key tech states in India)
// For a production app, this would be a proper SVG path derived from a simplified GeoJSON.
const INDIA_STATES = [
  { id: "DL", name: "Delhi", d: "M 150 80 Q 160 70 170 80 Q 160 90 150 80", cx: 160, cy: 80, cities: ["delhi", "gurgaon", "noida", "new delhi"] },
  { id: "MH", name: "Maharashtra", d: "M 80 180 L 130 160 L 160 210 L 110 240 Z", cx: 120, cy: 200, cities: ["mumbai", "pune", "nagpur"] },
  { id: "KA", name: "Karnataka", d: "M 110 240 L 150 230 L 170 290 L 130 310 Z", cx: 140, cy: 270, cities: ["bangalore", "bengaluru", "mysore"] },
  { id: "TS", name: "Telangana", d: "M 150 230 L 190 200 L 220 230 L 170 260 Z", cx: 180, cy: 230, cities: ["hyderabad"] },
  { id: "TN", name: "Tamil Nadu", d: "M 170 290 L 200 260 L 230 320 L 180 350 Z", cx: 195, cy: 305, cities: ["chennai", "coimbatore"] },
];

export function LocationHeatmap({ data }: LocationHeatmapProps) {
  // Calculate medians per state
  const stateMedians = useMemo(() => {
    const medians: Record<string, { median: number; count: number }> = {};

    INDIA_STATES.forEach(state => {
      // Find records that match any city in this state
      const stateRecords = data.filter(r => 
        state.cities.some(city => r.location.city.toLowerCase().includes(city))
      );

      if (stateRecords.length > 0) {
        const sorted = [...stateRecords].sort((a, b) => a.totalCompensation - b.totalCompensation);
        const mid = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 !== 0 
          ? sorted[mid].totalCompensation 
          : (sorted[mid - 1].totalCompensation + sorted[mid].totalCompensation) / 2;
        
        medians[state.id] = { median, count: stateRecords.length };
      }
    });

    return medians;
  }, [data]);

  // Find min/max median to calculate color scale
  const { min, max } = useMemo(() => {
    const vals = Object.values(stateMedians).map(v => v.median);
    if (vals.length === 0) return { min: 0, max: 0 };
    return { min: Math.min(...vals), max: Math.max(...vals) };
  }, [stateMedians]);

  const getColor = (stateId: string) => {
    const stats = stateMedians[stateId];
    if (!stats) return "var(--muted)"; // Grey for no data
    
    // Scale from 0 to 1
    const normalized = max > min ? (stats.median - min) / (max - min) : 0.5;
    
    // 210 100% 90% (light blue) -> 210 100% 30% (dark blue)
    return `hsl(var(--chart-1) / ${normalized * 0.8 + 0.2})`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-[400px] aspect-square bg-muted/20 rounded-2xl border border-border/50 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-sm">
          {/* Abstract India Background Outline (Very simplified) */}
          <path 
            d="M 120 20 L 160 10 L 200 40 L 220 90 L 280 150 L 260 220 L 240 300 L 180 380 L 160 390 L 120 350 L 70 250 L 50 180 L 90 100 Z" 
            fill="none" 
            stroke="var(--border)" 
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-30"
          />

          <TooltipProvider>
            {INDIA_STATES.map((state) => {
              const stats = stateMedians[state.id];
              return (
                <Tooltip key={state.id}>
                  <TooltipTrigger render={
                    <g className="transition-all duration-300 hover:brightness-110 cursor-pointer" />
                  }>
                      <path 
                        d={state.d} 
                        fill={getColor(state.id)} 
                        stroke="var(--background)" 
                        strokeWidth="2"
                        className="transition-colors duration-500"
                      />
                      {/* State Label */}
                      <text 
                        x={state.cx} 
                        y={state.cy} 
                        textAnchor="middle" 
                        alignmentBaseline="middle"
                        className="text-[10px] font-bold fill-background/90 pointer-events-none"
                      >
                        {state.id}
                      </text>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">{state.name}</p>
                      {stats ? (
                        <>
                          <p className="text-sm text-brand-primary">{formatCurrency(stats.median, "INR")} median</p>
                          <p className="text-xs text-muted-foreground">{stats.count} data points</p>
                        </>
                      ) : (
                        <p className="text-xs text-muted-foreground">No data available</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </svg>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span>Lower Comp</span>
        <div className="w-24 h-2 rounded-full bg-gradient-to-r from-[hsl(var(--chart-1)/0.2)] to-[hsl(var(--chart-1)/1)]" />
        <span>Higher Comp</span>
      </div>
    </div>
  );
}
