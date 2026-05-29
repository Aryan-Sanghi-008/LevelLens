"use client";

import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import { useChartTheme } from "@/lib/hooks/useChartTheme";

export interface BoxPlotData {
  level: string;
  p10: number;
  p25: number;
  median: number;
  p75: number;
  p90: number;
  count: number;
}

interface CompensationBoxPlotProps {
  data: BoxPlotData[];
  isLoading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomBoxPlot = (props: any) => {
  const { cy, xAxis, p10, p25, median, p75, p90, stroke } = props;
  const color = stroke || "#3b82f6";

  // Recharts passes payload inside the node or as separate props if we map them
  const p10X = xAxis.scale(p10);
  const p25X = xAxis.scale(p25);
  const medianX = xAxis.scale(median);
  const p75X = xAxis.scale(p75);
  const p90X = xAxis.scale(p90);
  
  const height = 24; // Box height
  const y = cy - height / 2;

  return (
    <g>
      {/* Whiskers */}
      <line x1={p10X} y1={cy} x2={p90X} y2={cy} stroke={color} strokeWidth={2} opacity={0.5} />
      <line x1={p10X} y1={cy - 6} x2={p10X} y2={cy + 6} stroke={color} strokeWidth={2} opacity={0.7} />
      <line x1={p90X} y1={cy - 6} x2={p90X} y2={cy + 6} stroke={color} strokeWidth={2} opacity={0.7} />

      {/* Box */}
      <rect
        x={p25X}
        y={y}
        width={p75X - p25X}
        height={height}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={2}
        rx={2}
      />

      {/* Median Line */}
      <line x1={medianX} y1={y} x2={medianX} y2={y + height} stroke={color} strokeWidth={3} />
    </g>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as BoxPlotData;
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-md text-sm">
        <p className="font-semibold mb-2">{data.level}</p>
        <div className="space-y-1">
          <p className="text-xs flex justify-between gap-4"><span className="text-muted-foreground">90th</span> <span>{formatCurrency(data.p90, "INR", true)}</span></p>
          <p className="text-xs flex justify-between gap-4"><span className="text-muted-foreground">75th</span> <span>{formatCurrency(data.p75, "INR", true)}</span></p>
          <p className="text-xs font-semibold flex justify-between gap-4"><span className="text-muted-foreground">Median</span> <span>{formatCurrency(data.median, "INR", true)}</span></p>
          <p className="text-xs flex justify-between gap-4"><span className="text-muted-foreground">25th</span> <span>{formatCurrency(data.p25, "INR", true)}</span></p>
          <p className="text-xs flex justify-between gap-4"><span className="text-muted-foreground">10th</span> <span>{formatCurrency(data.p10, "INR", true)}</span></p>
        </div>
        <div className="mt-2 pt-2 border-t border-border text-[10px] text-muted-foreground">
          {data.count} data points
        </div>
      </div>
    );
  }
  return null;
};

export function CompensationBoxPlot({ data, isLoading }: CompensationBoxPlotProps) {
  const theme = useChartTheme();

  if (isLoading) return <CompensationBoxPlot.Skeleton />;
  if (!data || data.length === 0) return <div className="h-[300px] flex items-center justify-center text-muted-foreground">No data available</div>;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={theme.border} opacity={0.2} />
          <XAxis 
            type="number" 
            tickFormatter={(value) => formatCurrency(value, "INR", true)}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: theme.mutedForeground }}
          />
          <YAxis 
            dataKey="level" 
            type="category" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: theme.foreground }}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: theme.mutedForeground, opacity: 0.08 }} />
          {/* We use Scatter because it allows passing arbitrary complex objects to custom shape easily */}
          <Scatter dataKey="median" fill={theme.chart1} stroke={theme.chart1} shape={<CustomBoxPlot />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

CompensationBoxPlot.Skeleton = function BoxPlotSkeleton() {
  return (
    <div className="w-full h-[400px] flex flex-col justify-between py-6 px-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 w-full">
          <Skeleton className="h-4 w-20 shrink-0" />
          <div className="flex-1 relative h-6">
            <Skeleton className="absolute top-1/2 -translate-y-1/2 h-1 w-full opacity-20" />
            <Skeleton className="absolute top-0 h-full w-1/3 left-1/4 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
};
