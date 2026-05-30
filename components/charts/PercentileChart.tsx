"use client";

import React, { useMemo } from "react";
import { 
  Area, 
  AreaChart, 
  ReferenceLine, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  CartesianGrid
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import { CompensationRecord } from "@/types";
import { useChartTheme } from "@/lib/hooks/useChartTheme";

interface PercentileChartProps {
  data: CompensationRecord[];
  highlightValue?: number;
  activeCurrency?: string;
}

export function PercentileChart({ data, highlightValue, activeCurrency = "USD" }: PercentileChartProps) {
  const theme = useChartTheme();

  const { chartData, percentiles, domain } = useMemo(() => {
    if (!data || data.length === 0) return { chartData: [], percentiles: null, domain: [0, 0] };

    const sorted = data.map(d => d.totalCompensation).sort((a, b) => a - b);
    
    // Calculate percentiles
    const getP = (p: number) => sorted[Math.floor(sorted.length * p)] || 0;
    const p25 = getP(0.25);
    const p50 = getP(0.50);
    const p75 = getP(0.75);
    const p90 = getP(0.90);

    // Compute bins
    const BINS = 40;
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    
    if (min === max) {
      return {
        chartData: [{ bin: min, count: sorted.length }],
        percentiles: { p25, p50, p75, p90 },
        domain: [min * 0.8, min * 1.2]
      };
    }

    // Add padding to domain so the curve doesn't clip
    const domainMin = Math.max(0, min - (max - min) * 0.1);
    const domainMax = max + (max - min) * 0.1;
    const binSize = (domainMax - domainMin) / BINS;

    const bins = Array.from({ length: BINS }, (_, i) => ({
      bin: domainMin + (i * binSize) + (binSize / 2),
      count: 0
    }));

    sorted.forEach(val => {
      const binIdx = Math.min(BINS - 1, Math.floor((val - domainMin) / binSize));
      if (binIdx >= 0) bins[binIdx].count += 1;
    });

    // Smooth data slightly using a moving average
    const smoothed = bins.map((b, i) => {
      if (i === 0 || i === BINS - 1) return b;
      const avg = (bins[i-1].count + b.count * 2 + bins[i+1].count) / 4;
      return { ...b, count: avg };
    });

    return { 
      chartData: smoothed, 
      percentiles: { p25, p50, p75, p90 },
      domain: [domainMin, domainMax] 
    };
  }, [data]);

  if (!percentiles || chartData.length === 0) {
    return <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">Not enough data to render distribution</div>;
  }

  // Calculate gradient offsets
  const getOffset = (val: number) => {
    if (domain[1] === domain[0]) return 0;
    return Math.max(0, Math.min(100, ((val - domain[0]) / (domain[1] - domain[0])) * 100));
  };

  const p25Off = getOffset(percentiles.p25);
  const p75Off = getOffset(percentiles.p75);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-[11px] text-muted-foreground px-1 pb-1 border-b border-border/40 select-none">
        <span>X-Axis: Total Compensation ({activeCurrency})</span>
        <span>Y-Axis: Relative Density of Reports</span>
      </div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={theme.mutedForeground} stopOpacity={0.2} />
                <stop offset={`${p25Off}%`} stopColor={theme.mutedForeground} stopOpacity={0.2} />
                <stop offset={`${p25Off}%`} stopColor={theme.chart1} stopOpacity={0.4} />
                <stop offset={`${p75Off}%`} stopColor={theme.chart1} stopOpacity={0.4} />
                <stop offset={`${p75Off}%`} stopColor={theme.chart2} stopOpacity={0.5} />
                <stop offset="100%" stopColor={theme.chart2} stopOpacity={0.5} />
              </linearGradient>
              <linearGradient id="strokeColor" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={theme.mutedForeground} />
                <stop offset={`${p25Off}%`} stopColor={theme.mutedForeground} />
                <stop offset={`${p25Off}%`} stopColor={theme.chart1} />
                <stop offset={`${p75Off}%`} stopColor={theme.chart1} />
                <stop offset={`${p75Off}%`} stopColor={theme.chart2} />
                <stop offset="100%" stopColor={theme.chart2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.border} opacity={0.5} />
            
            <XAxis 
              dataKey="bin" 
              type="number"
              domain={domain}
              tickFormatter={(val) => formatCurrency(val, activeCurrency, true)}
              stroke={theme.mutedForeground}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis hide />

            <Tooltip 
              cursor={{ stroke: theme.foreground, strokeWidth: 1, strokeDasharray: '4 4' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const val = payload[0].payload.bin;
                  return (
                    <div className="bg-background border border-border shadow-md rounded-lg p-3">
                      <p className="font-semibold">{formatCurrency(val, activeCurrency, true)}</p>
                      <p className="text-xs text-muted-foreground mt-1">Density: {Number(payload[0].value)?.toFixed(1)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />

          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="url(#strokeColor)" 
            fill="url(#splitColor)" 
            strokeWidth={3}
            isAnimationActive={false}
          />

          <ReferenceLine x={percentiles.p50} stroke={theme.chart1} strokeDasharray="3 3">
            <text x={0} y={0} dy={-5} fill={theme.chart1} fontSize={11} fontWeight="bold" textAnchor="middle">
              Median
            </text>
          </ReferenceLine>
          
          <ReferenceLine x={percentiles.p90} stroke={theme.chart2} strokeDasharray="3 3">
            <text x={0} y={0} dy={-5} fill={theme.chart2} fontSize={11} fontWeight="bold" textAnchor="middle">
              P90
            </text>
          </ReferenceLine>

          {highlightValue !== undefined && (
            <ReferenceLine x={highlightValue} stroke={theme.foreground} strokeWidth={2}>
              <text x={0} y={0} dy={-5} fill={theme.foreground} fontSize={12} fontWeight="bold" textAnchor="middle">
                You
              </text>
            </ReferenceLine>
          )}
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
